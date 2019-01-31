/* eslint-disable no-unused-vars */
import firebase from "firebase/app";

export default {
  state: {
    tasks: []
  },
  mutations: {
    delCategory(state, payload) {
      Object.keys(state.tasks).forEach((key, index) => {
        if (key === payload) {
          delete state.tasks[key];
        }
      });
    },
    delTask(state, { tsk, cat }) {
      for (let task in state.tasks[cat].child) {
        if (task === tsk) {
          delete state.tasks[cat].child[task];
        }
      }
    },
    setTask(state, payload) {
      state.tasks = payload;
    }
  },
  actions: {
    async addTask({ commit }, payload) {
      try {
        await firebase
          .database()
          .ref(this.getters.user.id)
          .child(payload.category)
          .child("child")
          .push({
            name: payload.name,
            description: payload.description,
            category: payload.category,
            date: payload.date,
            color: payload.color
          });
        commit("setLoading", false);
      } catch (e) {
        throw e;
      }
    },
    async addCategory({ commit }, payload) {
      try {
        await firebase
          .database()
          .ref(this.getters.user.id)
          .push({
            category: payload,
            child: []
          });
        commit("setLoading", false);
      } catch (error) {
        throw error;
      }
    },
    async delCategory({ commit }, payload) {
      try {
        await firebase
          .database()
          .ref(this.getters.user.id)
          .child(payload)
          .remove();
        commit("delCategory", payload);
      } catch (error) {
        throw error;
      }
    },
    async delTask({ dispatch, commit }, { tsk, cat }) {
      try {
        await firebase
          .database()
          .ref(this.getters.user.id)
          .child(cat)
          .child("child")
          .child(tsk)
          .remove();
        commit("delTask", { tsk, cat });
      } catch (error) {
        throw error;
      }
    },

    async updateTask({ commit }, payload) {
      try {
        await firebase
          .database()
          .ref(this.getters.user.id)
          .child(payload.task.category)
          .child("child")
          .child(payload.id)
          .update({
            name: payload.task.name,
            description: payload.task.description,
            category: payload.task.category,
            date: payload.task.date,
            color: payload.task.color
          });
        commit("setLoading", false);
      } catch (e) {
        throw e;
      }
    },

    async uploadTask({ commit }) {
      try {
        commit("setLoading", true);
        const tasks = await firebase
          .database()
          .ref(this.getters.user.id)
          .once("value");
        const tasksVal = tasks.val();
        commit("setTask", tasksVal);
        commit("setLoading", false);
      } catch (error) {
        throw error;
      }
    }
  },
  getters: {
    tasks(state) {
      return state.tasks;
    }
  }
};
