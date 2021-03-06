import Vue from "vue";
import Vuex from "vuex";
import user from "./store/user";
import common from "./store/common";
import category from "./store/category";
import task from "./store/task";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    user,
    category,
    task
  }
});
