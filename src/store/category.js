//import firebase from "firebase/app";

export default {
  state: {
    categories: ["В плане", "В работе", "Завершено"]
  },
  mutations: {},
  actions: {},
  getters: {
    category(state) {
      return state.categories;
    }
  }
};
