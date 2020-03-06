<template>
    <div id="profile">
        <nav class="navbar navbar-expand-lg navbar-light bg-transparent justify-content-between">
            <router-link class="navbar-brand"
                         to="home"
                         v-slot="{ href, route, navigate, isActive, isExactActive }">
                <span><img src="../assets/images/22691782.jpg" width="25" height="25" class="d-inline-block align-top"
                           alt="">
                <a :href="href" @click="navigate">iMages</a></span>
            </router-link>
            <div id="navbarSupportedContent">
                <div class="form-inline my-2 my-lg-0">
                    <button type="button" class="btn btn-danger nav-item nav-right" v-on:click="logout">Logout</button>
                </div>
            </div>

        </nav>
        <div class="card no-border">
            <div class="card-body">
                <h1>Hello {{ res.first_name }}!</h1>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a v-bind:class="{ active: isActive === 'images', 'nav-link': true }" data-toggle="tab"
                           role="tab" aria-controls="images" aria-selected="true" v-on:click="selectTab('images')">Images</a>
                    </li>
                    <li class="nav-item">
                        <a v-bind:class="{ active: isActive === 'users', 'nav-link': true }" data-toggle="tab"
                           role="tab" aria-controls="contact" aria-selected="false" v-on:click="selectTab('users')">Users</a>
                    </li>
                    <li class="nav-item">
                        <a v-bind:class="{ active: isActive === 'profile', 'nav-link': true }" data-toggle="tab"
                           role="tab" aria-controls="profile" aria-selected="false" v-on:click="selectTab('profile')">Profile</a>
                    </li>
                </ul>
                <div class="content mt-5">
                    <div id="images-tab" v-if="isActive === 'images'">
                        <div class="row">
                            <div v-for="image in images" class="col-3 p-1">
                                <div class="card image-card">
                                    <button type="button" class="close text-right pr-2" aria-label="Close" v-on:click="deleteImage(image.id)">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <img class="img-card-container card-img-top w-50 mx-auto d-block" v-bind:src="image.image_base64"
                                         alt="Card image cap">
                                    <div class="card-body">
                                        <h5 class="card-title">{{image.title}}</h5>
                                        <button class="btn btn-primary btn-block">Download</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div id="users-tab" v-else-if="isActive === 'users'">
                        Users - call Retrieve Users
                    </div>
                    <div id="profile-tab" v-else-if="isActive === 'profile'">
                        Profile - call Retrieve User Profile
                    </div>
                </div>
                <br>
                <input type="file" accept="image/*" @change="uploadImage" id="file-input"><br><br>

            </div>
        </div>

    </div>
</template>

<script>

  export default {
    name: 'Profile',
    data() {
      return {
        id: '',
        token: '',
        isActive: 'images',
        images: [],
        res: {}
      };
    },
    mounted() {
      this.$api.token = localStorage.getItem('user-token');
      if (!this.$api.token) {
        this.$router.replace({path: "/landing"});
      }
      this.$api.defaults.headers.common['Authorization'] = `Bearer ${this.$api.token}`;
      this.$api.get('/users/me')
        .then(response => (
          this.res = response.data
        ))
        .catch(error => (console.log(error)));

      this.$api.get('/images')
        .then(response => {
          console.log(response.data);
          this.images = response.data
        })
        .catch(error => (console.log(error)));
    },
    methods: {
      logout() {
        this.$api.defaults.headers.common['Authorization'] = `Bearer ${this.$api.token}`;
        this.$api.post('/auth/logout')
          .then(response => {
            localStorage.removeItem("user-token");
            this.$api.token = "";
            this.$router.replace({path: "/landing"});
          })
          .catch(error => (console.log(error)));
      },
      selectTab(tab) {
        this.isActive = tab;
      },
      getBase64(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          let payload = new Map([
            ['title', file.name],
            ['image_base64', reader.result]
          ]);
          payload = Object.fromEntries(payload);
          this.$api.defaults.headers.common['Authorization'] = `Bearer ${this.$api.token}`;
          this.$api.post('/images', payload)
            .then(response => {
              this.images = response.data;
            })
            .catch(function (error) {
              console.log(error)
            });
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        }
      },
      uploadImage(event) {
        let file = event.target.files[0];
        this.getBase64(file)
      },
      deleteImage(images_id) {
        console.log(images_id);
        this.$api.defaults.headers.common['Authorization'] = `Bearer ${this.$api.token}`;
        this.$api.delete('/images/' + images_id)
          .then(response => {
            this.images = response.data;
          })
          .catch(function (error) {
            console.log(error)
          });
      }
    }
  }
</script>

<style scoped>
    #profile {
        background-color: #FFFFFF;
        padding: 20px;
        margin-top: 10px;
    }

    .image-card {
        height: 270px;
        width: 220px;
    }
    .img-card-container {
        height:132px;
    }
</style>
