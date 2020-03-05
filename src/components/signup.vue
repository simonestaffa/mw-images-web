<template>
    <div id="signup" class="card">
        <div v-if="showLogin" class="card-body">
            <h1>Login</h1>
            <form
                    @submit="loginForm"
                    @submit.prevent="login"
                    action="http://0.0.0.0:5000/auth/login"
                    method="post"
            >
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                           name="email" v-model="input.email" placeholder="Email" required/>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" id="exampleInputPassword1" class="form-control" name="password"
                           v-model="input.password" placeholder="Password" required/>
                    <small v-if="error" class="text-danger">
                        {{ error }}
                    </small>
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
                <br><br>
                <!--<button type="button" v-on:click="toggleLogin(false)"> Go to Signup </button>-->
                <small class="form-text text-muted" v-on:click="toggleLogin(false)"
                       style="cursor: pointer;">Not registered yet? <span class="text-primary">Create an account!</span></small>
            </form>
        </div>
        <div v-else>
            <h1>Signup</h1>
            <form
                    @submit="signupForm"
                    @submit.prevent="signUp"
                    action="http://0.0.0.0:5000/auth/signup"
                    method="post"
            >
                <div class="form-group">
                    <label for="exampleInputName1">First Name</label>
                    <input type="text" class="form-control" id="exampleInputName1"
                           name="first_name" v-model="input.first_name" placeholder="Mario" required/>
                </div>

                <div class="form-group">
                    <label for="exampleInputLastname1">Last Name</label>
                    <input type="text" class="form-control" id="exampleInputLastname1"
                           name="last_name" v-model="input.last_name" placeholder="Rossi" required/>
                </div>

                <div class="form-group">
                    <label for="exampleInputEmail2">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp"
                           name="email" v-model="input.email" placeholder="Email" required/>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword2">Password</label>
                    <input type="password" id="exampleInputPassword2" class="form-control" name="password"
                           v-model="input.password" placeholder="Password" minlength="8" required/>
                    <small v-if="error" class="text-danger">
                        {{ error }}
                    </small>
                </div>
                <button type="submit" class="btn btn-primary">Signup</button>
                <br><br>
                <small  class="form-text text-muted" v-on:click="toggleLogin(true)"
                       style="cursor: pointer;">Already registered? <span class="text-primary">Login!</span></small>
            </form>
        </div>
    </div>

</template>

<script>
  import * as axios from 'axios';

  export default {
    name: 'Signup',
    data() {
      return {
        input: {
          first_name: null,
          last_name: null,
          email: null,
          password: null,
        },
        error: null,
        res: {},
        showLogin: true
      }
    },
    methods: {
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
        axios
          .post('http://0.0.0.0:5000/auth/signup', this.input)
          .then(
            response => {
              this.res = response.data;
              console.log(JSON.stringify(response.data));

              localStorage.setItem('user-token', response.data.authentication.access_token);
              this.$router.replace({path: "/profile/" + response.data.user.id})
            }
          )
          .catch((e) => {
            console.log(JSON.stringify(e.response.data))
            if (e.response.status === 422){

            }
            else if(e.response.status !== 500) {
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
        axios
          .post('http://0.0.0.0:5000/auth/login', payload)
          .then(
            response => {
              this.res = response.data;
              console.log(JSON.stringify(response));

              localStorage.setItem('user-token', response.data.authentication.access_token);

              this.$router.replace({path: "/profile/" + response.data.user.id})
            }
          )
          .catch((e) => {
            if(e.response.status !== 500) {
              this.error = e.response.data.message;
            }
          });
      },

      toggleLogin(status) {
        this.error = null;
        this.showLogin = status;
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
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>
