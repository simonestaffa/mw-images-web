<template>
    <div id="app">
        <div id="nav">
            <router-link v-if="authenticated" to="/signup" v-on:click.native="logout()" replace>Logout</router-link>
        </div>
        <router-view @authenticated="setAuthenticated" />
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                authenticated: false,
                mockAccount: {
                    username: "admin",
                    password: "password"
                }
            }
        },
        mounted() {
            if(!this.authenticated) {
                this.$router.replace({ name: "signup" });
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
