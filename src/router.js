import Vue from "vue";
import Router from "vue-router";
import CreateEvent from "@/components/Events/CreateEvent";
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
    }
  ]
});
