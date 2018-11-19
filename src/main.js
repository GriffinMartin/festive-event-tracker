import Vue from "vue";
import VueFire from "vuefire";
import firebase from "firebase";

import router from "@/router";
import store from "./store";
import "./plugins/vuetify";
import "./firebase";

import AlertCmp from "@/components/Shared/Alert";
import EditEventDetailsDialog from "@/components/Events/Edit/EditEventDetailsDialog";
import App from "./App";
import DateFilter from "./filters/date";

Vue.config.productionTip = false;
Vue.use(VueFire);
Vue.filter("date", DateFilter);
Vue.component("app-alert", AlertCmp);
Vue.component("app-edit-event-details-dialog", EditEventDetailsDialog);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("user/autoSignIn", user);
      }
    });
    this.$store.dispatch("events/loadEvents");
  }
}).$mount("#app");
