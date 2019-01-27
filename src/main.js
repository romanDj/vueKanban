import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vuetify/dist/vuetify.min.css";
import Vuelidate from "vuelidate";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/messaging";
import "firebase/storage";

Vue.use(Vuetify);
Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    const config = {
      apiKey: "AIzaSyAtktYkHfIkt2J9W60BEIc9AKYDXhH4Wx8",
      authDomain: "hgfb-e9b1e.firebaseapp.com",
      databaseURL: "https://hgfb-e9b1e.firebaseio.com",
      projectId: "hgfb-e9b1e",
      storageBucket: "hgfb-e9b1e.appspot.com",
      messagingSenderId: "853063385796"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("loggedUser", user);
      }
    });
  }
}).$mount("#app");
