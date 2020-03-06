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
                        <h5>Upload new image</h5>
                        <br>

                        <form @submit.prevent="uploadImage"
                              action="http://0.0.0.0:5000/auth/login"
                              method="post"
                              id="upload-form">
                            <div class="row">
                                <div class="form-group col-4">
                                    <div class="custom-file">
                                        <label for="file-input">Title</label>
                                        <input type="file" class="custom-file-input" accept="image/*"
                                               id="file-input" @change="setImage" required>
                                        <label id="file-label" class="custom-file-label"
                                               for="file-input">{{fileLabel}}</label>
                                        <div class="invalid-feedback">Example invalid custom file feedback</div>
                                    </div>
                                </div>
                                <div class="form-group text-left col-4">
                                    <!--<label for="title">Title</label>-->
                                    <input type="text" class="form-control" id="title"
                                           name="title" v-model="image_title" placeholder="Image title" required/>
                                </div>
                                <div class="form-group col-4">
                                    <button type="submit" class="btn btn-action btn-round">Upload</button>
                                </div>
                            </div>
                        </form>
                        <hr>
                        <div class="row">
                            <div v-for="image in images" class="col-3 p-2">
                                <div class="card image-card">
                                    <button type="button" class="close text-right pr-2" aria-label="Close"
                                            v-on:click="deleteImage(image.id)">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <img class="img-card-container card-img-top w-50 mx-auto d-block"
                                         v-bind:src="image.image_base64"
                                         alt="Card image cap">
                                    <div class="card-body">
                                        <h5 class="card-title">{{image.title}}</h5>
                                        <button class="btn btn-primary btn-block" v-on:click="downloadImage(image.image_base64,image.title)">
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div id="users-tab" v-else-if="isActive === 'users'">
                        <div class="search-wrapper">
                          <img class="searchIcon" v-if="!search" src="../assets/images/glass_icon.svg">
                          <img class="resetIcon" v-else src="../assets/images/reset_icon.png"
                          v-on:click="resetFilter" >
                          <input type="text" v-model="search" placeholder="Search..."/>
                        </div>
                      <div id="searchResults">
                        <ul id="user-list">
                          <li v-for="user in users" :key="user.id" 
                          v-if="isFiltered(user.first_name)">
                            {{ user.first_name }}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div id="profile-tab" v-else-if="isActive === 'profile'">
                        Profile - call Retrieve User Profile
                    </div>
                </div>


            </div>
        </div>

    </div>
</template>

<script>
  import * as download from "downloadjs";
  export default {
    name: 'Home',
    data() {
      return {
        id: '',
        isActive: 'images',
        images: [],
        users: [],
        search: "",
        res: {},
        image_input: null,
        image_title: null,
        fileLabel: "Choose file..."
      };
    },
    mounted() {
      this.$api.token = localStorage.getItem('user-token');
      //console.log(this.$api.token)
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

      this.$api.get('/users/')
        .then(response => (
          this.users = response.data
        ))
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
            ['title', this.image_title ? this.image_title : file.name],
            ['image_base64', reader.result]
          ]);
          payload = Object.fromEntries(payload);
          this.$api.defaults.headers.common['Authorization'] = `Bearer ${this.$api.token}`;
          this.$api.post('/images', payload)
            .then(response => {
              this.images = response.data;
              this.fileLabel = "Choose file...";
              this.image_title = null;
            })
            .catch(function (error) {
              console.log(error)
            });
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        }
      },
      uploadImage() {
        this.getBase64(this.image_input)
      },
      setImage(event) {
        this.fileLabel = event.target.files[0].name;
        this.image_input = event.target.files[0];
      },
      deleteImage(images_id) {
        this.$api.defaults.headers.common['Authorization'] = `Bearer ${this.$api.token}`;
        this.$api.delete('/images/' + images_id)
          .then(response => {
            this.images = response.data;
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      resetFilter(){
        this.search = ''
      },
      isFiltered(name){
        if (name.includes(this.search))
          return true
        else
          return false
      },
      downloadImage(data, filename) {
        const mime_type = data.substring(5,data.indexOf(';'));
        download(data, filename, mime_type);
      }
  }
}
</script>

<style scoped>
    .profile {
        background-color: #FFFFFF;
        padding: 20px;
        margin-top: 10px;
    }

    .image-card {
        height: 270px;
        width: 220px;
    }

    .img-card-container {
        height: 132px;
    }
    .searchIcon {
    width: 28px;
    height: 28px;
    margin-right: 1%;
    }
    .resetIcon {
    width: 30px;
    height: 30px;
    margin-right: 1%;
    padding-bottom: .1%;
    }
</style>
