import firebase from "firebase/app";
import User from "./user_help";

export default {
  state: {
    user: localStorage.getItem("user-token")
      ? new User(localStorage.getItem("user-token"))
      : null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    async registerUser({ commit }, { email, password }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        firebase.auth().createUserWithEmailAndPassword(email, password);
        // commit("setUser", new User(user.user.uid));
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },
    async loginUser({ commit }, { email, password }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        localStorage.setItem("user-token", user.user.uid);
        commit("setUser", new User(user.user.uid));
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },

    loggedUser({ commit }, payload) {
      localStorage.setItem("user-token", payload.uid);
      commit("setUser", new User(payload.uid));
    },
    logoutUser({ commit }) {
      localStorage.removeItem("user-token");
      firebase.auth().signOut();
      commit("setUser", null);
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    checkUser(state) {
      return state.user !== null;
    }
  }
};
