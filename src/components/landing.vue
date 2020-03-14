<template>
    <div class="container text-center">
        <div class="landing">
            <h1 class="mt-5" id="title">iMages</h1>
            <p class="mt-2" id="subtitle">Access your photos from everyhere</p>
            <div class="row">
                <div class="col-6"><img id="revert" class="w-50" src="../assets/images/22683020.jpg"></div>
                <div class="col-6"><img class="w-50" src="../assets/images/22691782.jpg"></div>
            </div>

            <button class="btn btn-primary btn-round" @click.prevent="scrollToLogin(`.access`, 500)">Start now</button>

        </div>
        <div class="access">
            <div class="row mt-5">
                <div class="col-3"></div>
                <div class="col-6">
                    <div class="card no-border">
                        <div v-if="showLogin" class="card-body">
                            <h1>Login</h1>
                            <form
                                    @submit="loginForm"
                                    @submit.prevent="login"
                                    action="http://0.0.0.0:5000/auth/login"
                                    method="post">
                                <div class="form-group text-left">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp"
                                           name="email" v-model="input.email" placeholder="Email" required/>
                                </div>
                                <div class="form-group text-left">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" id="exampleInputPassword1" class="form-control"
                                           name="password"
                                           v-model="input.password" placeholder="Password" required/>
                                    <small v-if="error" class="text-danger">
                                        {{ error }}
                                    </small>
                                </div>
                                <button type="submit" class="btn btn-action btn-round">Login</button>
                                <br><br>
                                <small class="form-text text-muted" v-on:click="toggleLogin(false)"
                                       style="cursor: pointer;">Not registered yet? <span class="text-primary">Create an account!</span></small>
                            </form>
                            <br>
                            or
                            <GoogleLogin class="GoogleLogin" :params="params" :onSuccess="onSignInSuccess" :onFailure="onSignInError">Sign in with Google</GoogleLogin>
                        </div>
                        <div v-else>
                            <h1>Create an account</h1>
                            <form
                                    @submit="signupForm"
                                    @submit.prevent="signUp"
                                    action="http://0.0.0.0:5000/auth/signup"
                                    method="post"
                            >
                                <div class="form-group text-left">
                                    <label for="exampleInputName1">First Name</label>
                                    <input type="text" class="form-control" id="exampleInputName1"
                                           name="first_name" v-model="input.first_name" placeholder="Mario" required/>
                                </div>

                                <div class="form-group text-left">
                                    <label for="exampleInputLastname1">Last Name</label>
                                    <input type="text" class="form-control" id="exampleInputLastname1"
                                           name="last_name" v-model="input.last_name" placeholder="Rossi" required/>
                                </div>

                                <div class="form-group text-left">
                                    <label for="exampleInputEmail2">Email address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail2"
                                           aria-describedby="emailHelp"
                                           name="email" v-model="input.email" placeholder="Email" required/>
                                </div>
                                <div class="form-group text-left">
                                    <label for="exampleInputPassword2">Password</label>
                                    <input type="password" id="exampleInputPassword2" class="form-control"
                                           name="password"
                                           v-model="input.password" placeholder="Password" minlength="8" required/>
                                    <small v-if="error" class="text-danger">
                                        {{ error }}
                                    </small>
                                </div>
                                <button type="submit" class="btn btn-action btn-round">Signup</button>
                                <br><br>
                                <small class="form-text text-muted" v-on:click="toggleLogin(true)"
                                       style="cursor: pointer;">Already registered? <span
                                        class="text-primary">Login!</span></small>
                            </form>
                            <br>
                            or
                            <GoogleLogin class="GoogleLogin" :params="params" :onSuccess="onSignInSuccess" :onFailure="onSignInError">Sign in with Google</GoogleLogin>

                        </div>
                    </div>
                </div>

                <div class="col-3"></div>
            </div>
        </div>
    </div>
</template>

<script>
  import GoogleLogin from 'vue-google-login';
  export default {
    name: "landing",
    data() {
      return {
        input: {
          first_name: null,
          last_name: null,
          email: null,
          password: null,
        },
        // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
        params: {
          client_id: '1032392426186-jr935ho2f6og31m0e2sshq2ej50kuh6q.apps.googleusercontent.com'
        },
        // only needed if you want to render the button with the google ui
        renderParams: {
          width: 250,
          height: 50,
          longtitle: true
        },
        error: null,
        res: {},
        showLogin: true
      }
    },
    components: {
      GoogleLogin
    },
    mounted() {
      if (localStorage.getItem('user-token')) {
        this.authenticated = true;
      }
      if (this.authenticated) {
        this.$router.replace({name: "home"});
      }
    },
    methods: {
      scrollToLogin: function (element, duration) {
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
        const cancelScroll = this.$scrollTo(element, duration, options)
      },
      // SIGNUP
      signupForm: function (e) {
        if (this.email && this.password && this.first_name && this.last_name) {
          return true;
        }
        if (!this.input.first_name) {
          this.error = 'First Name required';
        }
        if (!this.input.email) {
          this.error = 'Last Name required';
        }
        if (!this.input.email) {
          this.error = 'Email required';
        }
        if (!this.input.password) {
          this.error = 'Password required';
        }
        e.preventDefault();
      },
      signUp() {
        this.$api.post('/auth/signup', this.input)
          .then(
            response => {
              this.res = response.data;
              localStorage.setItem('user-token', response.data.authentication.access_token);
              this.$api.token = response.data.authentication.access_token;
              this.$router.replace({path: "home"})
            }
          )
          .catch((e) => {
            if (e.response.status !== 500) {
              this.error = e.response.data.message;
            }
          });
      },
      // LOGIN
      loginForm: function (e) {
        if (this.email && this.password) {
          return true;
        }
        if (!this.input.email) {
          this.error = 'Email required';
        }
        if (!this.input.password) {
          this.error = 'Password required';
        }
        e.preventDefault();
      },
      login() {
        let payload = new Map([
          ['email', this.input.email], ['password', this.input.password]
        ]);
        payload = Object.fromEntries(payload);
        this.$api.post('/auth/login', payload)
          .then(
            response => {
              this.res = response.data;
              localStorage.setItem('user-token', response.data.authentication.access_token);
              this.$api.token = response.data.authentication.access_token;
              this.$router.replace({path: "/home/"})
            }
          )
          .catch((e) => {
            if (e.response.status !== 500) {
              this.error = e.response.data.message;
            }
          });
      },
      toggleLogin(status) {
        this.error = null;
        this.showLogin = status;
      },
      onSignInSuccess (googleUser) {
        let payload = new Map([
          ['token', googleUser.uc.id_token]
        ]);
        payload = Object.fromEntries(payload);
        this.$api.post('/auth/google', payload)
          .then(
            response => {
              this.res = response.data;
              console.log(response.data.authentication.access_token);
              localStorage.setItem('user-token', response.data.authentication.access_token);
              this.$api.token = response.data.authentication.access_token;
              this.$router.replace({path: "/home/"})
            }
          )
          .catch((e) => {
            if (e.response.status !== 500) {
              this.error = e.response.data.message;
            }
          });
      },
      onSignInError (error) {
        this.error = error.message;
      }
    }
  }
</script>

<style scoped>
    img#revert {
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
    }

    #title {
        font-size: 80px;
    }

    #subtitle {
        font-weight: lighter;
        font-size: 34px;
    }

    .landing {
        padding-bottom: 170px;
    }

    .GoogleLogin {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #3c82f7;
        color: #fff;
        box-shadow: 0 3px 0 #0f69ff;
    }
</style>
