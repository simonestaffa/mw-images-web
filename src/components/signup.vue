<template>
  <div id="signup">
        <h1>Signup</h1>
        <input type="text" name="fisrt_name" v-model="input.first_name" placeholder="Name" />
        <input type="text" name="last_name" v-model="input.last_name" placeholder="Surname" />
        <input type="email" name="email" v-model="input.email" placeholder="Email" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <button type="button" v-on:click="signup()">Signup</button>
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
                res:{}
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
    }
</style>