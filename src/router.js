import Vue from "vue";
import Router from "vue-router";
import CreateEvent from "@/components/Events/CreateEvent";
import Event from "@/components/Events/Event";
import Signup from "@/components/User/Singup";
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
      component: CreateEvent
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
    //   component: Profile
    // },
    {
      path: "/signup",
      name: "Signup",
      component: Signup
    }
    // {
    //   path: '/signin',
    //   name: 'Signin',
    //   component: Signin
    // }
  ]
});
