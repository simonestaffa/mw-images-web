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
                           role="tab" aria-controls="images" aria-selected="true" v-on:click="selectTab('images')">Your
                            images</a>
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
                        <div v-if="uploadOk === true" class="text-success">
                            <font-awesome-icon icon="check-circle"/>
                            Image uploaded successfully!
                        </div>
                        <div v-else-if="uploadOk === false" class="text-danger">
                            <font-awesome-icon icon="times-circle"/>
                            There was an error uploading the image :(
                        </div>
                        <br>

                        <form @submit.prevent="uploadImage"
                              action="https://cors-anywhere.herokuapp.com/http://ec2-52-90-106-146.compute-1.amazonaws.com:5000/auth/login"
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
                                    <input type="text" class="form-control" id="title"
                                           name="title" v-model="image_title" placeholder="Image title" required/>
                                </div>
                                <div class="form-group col-4">
                                    <button type="submit" class="btn btn-action btn-round">
                                        <font-awesome-icon icon="upload"/>
                                        Upload
                                    </button>
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
                                        <button class="btn btn-primary btn-block"
                                                v-on:click="downloadServerSide(image.id, image.title)">
                                            <font-awesome-icon icon="download"/>
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div id="users-tab" v-else-if="isActive === 'users'">
                        <h5>Click on a user to see his/her images</h5>
                        <div class="input-group col-4 pb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <div v-if="!search">
                                        <font-awesome-icon icon="search"/>
                                    </div>
                                    <div v-else style="cursor: pointer;">
                                        <font-awesome-icon icon="times-circle" v-on:click="resetFilter"/>
                                    </div>
                                </div>
                            </div>
                            <input type="text" class="searchbar form-control" v-model="search"
                                   placeholder="Search...">
                        </div>
                        <div id="searchResults">
                            <table class="table table-condensed table-hover">
                                <thead class="table-secondary">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Images Uploaded</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="user in users" :key="user.id"
                                    v-if="isFiltered(user.first_name + user.last_name)"
                                    v-on:click="showUser(user.id, user.first_name, user.last_name)"
                                    style="cursor:pointer;">
                                    <td>{{user.id}}</td>
                                    <td><strong>{{user.first_name + " " + user.last_name}}</strong></td>
                                    <td>{{user.email}}</td>
                                    <td><span class="pull-right">{{user.count_images}}</span></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr>
                        <div id="user-images">
                            <div v-if="userImages == undefined"></div> 
                            <div v-else-if="userImages.length > 0">
                                <h5>Images uploaded by {{userFirstName + " " + userLastName}}</h5>
                                <div class="row">
                                    <div v-for="image in userImages" class="col-3 p-2">
                                        <div class="card image-card">
                                            <img class="img-card-container card-img-top w-50 mx-auto d-block"
                                                 v-bind:src="image.image_base64"
                                                 alt="Card image cap">
                                            <div class="card-body">
                                                <h5 class="card-title">{{image.title}}</h5>
                                                <button class="btn btn-primary btn-block"
                                                        v-on:click="downloadImage(image.image_base64,image.title)">
                                                    <font-awesome-icon icon="download"/>
                                                    Download
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else-if="userFirstName != '' && userLastName !== ''">
                                <h5>{{userFirstName + " " + userLastName}} has't uploaded any image yet.</h5>
                            </div>
                        </div>
                    </div>
                    <div id="profile-tab" v-else-if="isActive === 'profile'">
                         <div class="row">
                          <div class="col-xs-12 col-sm-6 col-md-6">
                              <div class="well well-sm">
                                  <div class="row">
                                      <div class="col-sm-6 col-md-4">
                                          <img src="http://placehold.it/200x120" alt="" class="img-rounded img-responsive" />
                                      </div>
                                      <div id="profileinfo" class="col-sm-6 col-md-8">
                                          <h4 style="padding-left: 25px;"> {{res.first_name}} 
                                          {{res.last_name}}</h4>
                                            <h5 >{{res.email}}</h5>
                                            <br />
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
  import * as download from "downloadjs";
  const FileDownload = require('js-file-download');
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
        fileLabel: "Choose file...",
        uploadOk: null,
        userImages: undefined,
        userFirstName: "",
        userLastName: ""
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
              this.uploadOk = true;
            })
            .catch((error) => {
              this.uploadOk = false;
              console.log(error)
            });
        };
        reader.onerror = function (error) {
          this.uploadOk = false;
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
      resetFilter() {
        this.search = ''
      },
      isFiltered(name) {
        return name.toLowerCase().includes(this.search.toLowerCase());
      },
      downloadImage(data, filename) {
        const mime_type = data.substring(5, data.indexOf(';'));
        download(data, filename, mime_type);
      },
      downloadServerSide(id, title) {
        this.$api.defaults.headers.common['Authorization'] = `Bearer ${this.$api.token}`;
        this.$api.get('/download/' + id, {responseType: 'blob'})
          .then(response => {
            FileDownload(response.data, title + '.png');
          });
      },
      showUser(id,name,surname) {
        this.$api.defaults.headers.common['Authorization'] = `Bearer ${this.$api.token}`;
        this.$api.get('/images/' + id)
          .then(response => {
            this.userImages = response.data;
            this.userFirstName = name;
            this.userLastName = surname;
            const options = {
              easing: 'ease-in',
              offset: -60,
              force: true,
              cancelable: true,
              onStart: function (element) {
                // scrolling started
              },
              onDone: function (element) {
                // scrolling is done
              },
              onCancel: function () {
                // scrolling has been interrupted
              },
              x: false,
              y: true
            };
            const cancelScroll = this.$scrollTo('#user-images', 500, options)
          })
          .catch(function (error) {
            console.log(error)
          });
      }
    }
  }
</script>

<style scoped>
    .image-card {
        height: 270px;
        width: 220px;
    }

    .img-card-container {
        height: 132px;
    }
    body{padding-top:30px;}

    .glyphicon {  margin-bottom: 10px;margin-right: 10px;}

    #profileinfo{
      padding-left: 100px;
      padding-top: 20px;
    }
</style>
