import Vue from 'vue'
import Router from 'vue-router'
import ProfileComponent from "../components/profile.vue"
import SignupComponent from "../components/signup.vue"

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: {
                name: "signup"
            }
        },
        {
            path: "/signup",
            name: "signup",
            component: SignupComponent
        },
        {
            path: "/profile/:id",
            name: "profile",
            component: ProfileComponent,
        }
    ]
}) 
