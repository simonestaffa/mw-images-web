import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from "../components/home.vue"
import LandingComponent from "../components/landing.vue"

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            redirect: {
                name: "landing"
            }
        },
        {
            path: "/landing",
            name: "landing",
            component: LandingComponent
        },
        {
            path: "/home",
            name: "home",
            component: HomeComponent,
        }
    ]
}) 
