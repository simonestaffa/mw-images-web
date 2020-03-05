<template>
    <div id="profile" class="card">
        <div class="card-body">
            <h1>Hello {{ res.first_name }}!</h1>
            TODO: add user infos and functionalities
            <br><br>
            <input type="file" accept="image/*" @change="uploadImage" id="file-input"><br><br>
            <button type="button" class="btn btn-danger" v-on:click="logout">Logout</button>
        </div>

    </div>
</template>

<script>
  import * as axios from "axios";

  export default {
    name: 'Profile',
    data() {
      return {
        id: '',
        token: '',
        res: {}
      };
    },
    mounted() {
      this.token = localStorage.getItem('user-token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      axios
        .get('http://0.0.0.0:5000/users/me')
        .then(response => (
          this.res = response.data
        ))
        .catch(error => (console.log(error)));
    },
    methods: {
        logout() {
            this.token = localStorage.getItem('user-token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
            axios
            .post('http://0.0.0.0:5000/auth/logout')
            .then(response => {
                localStorage.removeItem("user-token");
                this.$router.replace({path: "/signup"});
                })
            .catch(error => (console.log(error)));
        },

        getBase64(file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function () {
                const axios = require('axios');
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
                let payload = new Map([
                    ['title', file.name], 
                    ['image_base64', reader.result.substring(reader.result.indexOf(",") + 5)] 
                    ]);
                payload = Object.fromEntries(payload)
                console.log(reader.result)
                axios
                .post('http://0.0.0.0:5000/images', payload)
                .then(response => {
                    this.res = response.data
                    console.log(JSON.stringify(response.data))
                })
                .catch(function (error) {
                console.log(error)
                });
            }

            reader.onerror = function (error) {
                console.log('Error: ', error);
            }
        },

        uploadImage(event) {
            let file = event.target.files[0];
            this.getBase64(file)
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
