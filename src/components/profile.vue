<template>
    <div id="profile">
        <h1>Hello {{ res.first_name }}</h1>
        <body>
           TODO: add user infos and functionalities
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
            this.id = this.$route.params.id
            for (var i = 0; i < this.$router.options.routes.length; i++) {
                if (this.$router.options.routes[i]['name'] === 'profile')
                    break
            }
            this.token = this.$router.options.routes[i].meta.access_token
            
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