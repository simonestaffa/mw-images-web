<template>
    <div id="app" class="container">
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

    body {
        padding-bottom: 150px;
    }
</style>
