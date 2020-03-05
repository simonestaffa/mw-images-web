<template>
    <div id="app" class="container">
        <!--<div id="nav">
                <router-link v-if="!authenticated" to="/signup">Signup</router-link>
            </div>-->
        <router-view @authenticated="setAuthenticated"/>
    </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        authenticated: false
      }
    },
    mounted() {
      if (localStorage.getItem('user-token')) {
        this.authenticated = true;
      }
      if (this.authenticated) {
        this.$router.replace({name: "profile"});
      }
    },
    methods: {
      setAuthenticated(status) {
        this.authenticated = status;
      },
      logout() {
        this.authenticated = false;
      }
    }
  }
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Ubuntu&display=swap');

    div {
        font-family: 'Ubuntu', serif;
    }

    h1 {
        padding: 0;
        margin-top: 0;
    }

    #app {
        width: 1024px;
        margin: auto;
    }
</style>
