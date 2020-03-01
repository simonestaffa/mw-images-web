<template>
  <div id="signup">
    <div v-if="showLogin">
        <h1>Welcome back!</h1>
        <input type="email" name="email" v-model="input.email" placeholder="Email" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <button type="button" v-on:click="login()">Login</button>
        <button type="button" v-on:click="toggleLogin(false)"> Go to Signup </button>
    </div>
    <div v-else>
        <h4>Signup</h4>
        <input type="text" name="fisrt_name" v-model="input.first_name" placeholder="Name" />
        <input type="text" name="last_name" v-model="input.last_name" placeholder="Surname" />
        <input type="email" name="email" v-model="input.email" placeholder="Email" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <button type="button" v-on:click="signup()">Signup</button>
        <button type="button" v-on:click="toggleLogin(true)"> Go to Login </button>
    </div>
    <router-link to="/login">Home</router-link>
  </div>
</template>

<script>

export default {
    name: 'Signup',
    data() {
            return {
                input: {
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: ""
                },
                res:{},
                showLogin: true
            }
        },
    methods: {
        signup(){
            const axios = require('axios');
            axios
            .post('http://0.0.0.0:5000/auth/signup', this.input)
            .then(
                response => {
                    this.res = response.data
                    console.log(JSON.stringify(response.data))

                    for (var i = 0; i < this.$router.options.routes.length; i++) {
                        if (this.$router.options.routes[i]['name'] === 'profile')
                            break
                    }
                    this.$router.options.routes[i].meta = response.data.authentication
                    this.$router.replace({path:"/profile/" + response.data.user.id})
                }
            )
            .catch(function (error) {
                console.log(error);
            });
        },

        login(){
            let payload = new Map([
                ['email', this.input.email], ['password', this.input.password] 
                ])
            payload = Object.fromEntries(payload)
            const axios = require('axios');
            axios
            .post('http://0.0.0.0:5000/auth/login', payload)
            .then(
                response => {
                    this.res = response.data
                    console.log(JSON.stringify(response.data))

                    for (var i = 0; i < this.$router.options.routes.length; i++) {
                        if (this.$router.options.routes[i]['name'] === 'profile')
                            break
                    }
                    this.$router.options.routes[i].meta = response.data.authentication
                    this.$router.replace({path:"/profile/" + response.data.user.id})
                }
            )
            .catch(function (error) {
                console.log(error);
            });
        },
        
        toggleLogin(status) {
            this.showLogin= status;
        }
    }
}
</script>

<style scoped>
 #signup {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    };
#login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>