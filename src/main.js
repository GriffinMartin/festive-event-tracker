import Vue from "vue";
import VueFire from "vuefire";

import router from "./router";
import store from "./store";
import "./plugins/vuetify";
import "./firebase";

import App from "./App";
import DateFilter from "./filters/date";

Vue.config.productionTip = false;
Vue.use(VueFire);
Vue.filter("date", DateFilter);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
