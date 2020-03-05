<template>
    <div id="profile">
        <h1>Hello {{ res.first_name }}!</h1>
        <body>
           TODO: add user infos and functionalities
           <input type="file" accept="image/*" @change="uploadImage" id="file-input">
           <router-link to="/signup" replace>Logout</router-link>
        </body>
    </div>
</template>

<script>
    export default {
        name: 'Profile',
        data() {
            return {
                id:'',
                token:'',
                res:{}
            };
        },
        mounted(){
            this.token = localStorage.getItem('user-token')
            this.id = this.$route.params.id
            const axios = require('axios');
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
            console.log(this.id);
            axios
                .get('http://0.0.0.0:5000/users/' + this.id)
                .then(response => (
                    this.res = response.data,
                    console.log(JSON.stringify(response))
                    ))
                .catch(error => (console.log(error)));
        },
        methods: {
            uploadImage(event) {
                const axios = require('axios');
                const URL = 'http://0.0.0.0:5000'; 

                let file = event.target.files[0]; 

                let config = {
                header : {
                    'Content-Type' : 'image/png'
                    }
                }

                //axios post here
                
            }
        }
    }
</script>

<style scoped>
    #profile {
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        padding: 20px;
        margin-top: 10px;
    }
</style>