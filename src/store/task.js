import firebase from "firebase/app";

export default {
  state: {
    tasks: []
  },
  mutations: {
    newTask(state, payload) {
      state.tasks.find(el => {
        try {
          if (el.key === payload.category) {
            el.child.push(payload);
          }
        } catch (err) {
          return;
        }
      });
    },
    newCategory(state, payload) {
      state.tasks.push(payload);
    },
    delCategory(state, payload) {
      state.tasks.find((el, index) => {
        try {
          if (el.key === payload) {
            state.tasks.splice(index, 1);
          }
        } catch (err) {
          throw err;
        }
      });
    },
    delTask(state, payload) {
      for (let cat of state.tasks) {
        for (let task in cat.child) {
          if (cat.child[task].id === payload) {
            cat.child.splice(task, 1);
          }
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
    async delCategory({ dispatch }, payload) {
      try {
        await firebase
          .database()
          .ref(this.getters.user.id)
          .child(payload)
          .remove();
        dispatch("uploadTask");
      } catch (error) {
        throw error;
      }
    },
    async delTask({ dispatch }, { tsk, cat }) {
      try {
        await firebase
          .database()
          .ref(this.getters.user.id)
          .child(cat)
          .child("child")
          .child(tsk)
          .remove();
        dispatch("uploadTask");
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
