import firebase from "firebase/app";
import Task from "./task_help";

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
          return;
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
      const task = new Task(
        payload.name,
        payload.description,
        payload.category,
        payload.date,
        payload.color,
        Math.random()
      );
      commit("newTask", task);
    },
    async addCategory({ commit }, payload) {
      const category = {
        key: Math.random() + "qwer",
        category: payload,
        child: []
      };
      commit("newCategory", category);
    },
    async delCategory({ commit }, payload) {
      commit("delCategory", payload);
    },
    async delTask({ commit }, payload) {
      //console.log( this.getters.user);
      commit("delTask", payload);
    },
    async updateTask() {},

    async uploadTask({ commit }) {
      const tasks = await firebase
        .database()
        .ref(this.getters.user.id)
        .once("value")
        .val();
      commit("setTask", tasks);
    }
  },
  getters: {
    tasks(state) {
      return state.tasks;
    }
  }
};
