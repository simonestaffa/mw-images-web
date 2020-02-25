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
                }
            }
        },
    methods: {
        signup(){
            var xhr = new XMLHttpRequest();
            var url = "http://0.0.0.0:5000/auth/signup";
            xhr.open("POST", url );
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
                console.log(json.id);
                }
            }
            xhr.send(JSON.stringify(this.input))
            console.log(json.id);
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