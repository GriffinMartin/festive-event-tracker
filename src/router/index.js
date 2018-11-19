import Vue from "vue";
import Router from "vue-router";
import AuthGuard from "./auth-guard";
import CreateEvent from "@/components/Events/CreateEvent";
import Event from "@/components/Events/Event";
import Signin from "@/components/User/Signin";
import Signup from "@/components/User/Signup";
import Home from "@/views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/event/new",
      name: "CreateEvent",
      component: CreateEvent,
      beforeEnter: AuthGuard
    },
    {
      path: "/events/:id",
      name: "Event",
      props: true,
      component: Event
    },
    // {
    //   path: '/profile',
    //   name: 'Profile',
    //   component: Profile,
    // beforeEnter: AuthGuard
    // },
    {
      path: "/signup",
      name: "Signup",
      component: Signup
    },
    {
      path: "/signin",
      name: "Signin",
      component: Signin
    }
  ]
});
