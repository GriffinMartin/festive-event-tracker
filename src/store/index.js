import Vue from "vue";
import Vuex from "vuex";
import eventsModule from "./modules/events";
import userModule from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    events: eventsModule,
    user: userModule
  }
});
