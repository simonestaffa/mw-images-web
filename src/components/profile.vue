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
          return reader.result;
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      },
      uploadImage(event) {
        const axios = require('axios');
        const URL = 'http://0.0.0.0:5000';

        let file = event.target.files[0];
        const fileBase64 = this.getBase64(file);
        let config = {
          header: {
            'Content-Type': 'image/png'
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
