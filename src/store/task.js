/* eslint-disable no-unused-vars */
import firebase from "firebase/app";

export default {
  state: {
    tasks: []
  },
  mutations: {
    delCategory(state, payload) {
      state.tasks.splice(
        state.tasks.indexOf(
          state.tasks.find(x => {
            return x.id === payload;
          })
        ),
        1
      );
    },
    delTask(state, { tsk, cat }) {
      let indCat = state.tasks.indexOf(state.tasks.find(x => x.id === cat));
      let indTsk = state.tasks[indCat].child.indexOf(
        state.tasks[indCat].child.find(x => x.id === tsk)
      );
      state.tasks[indCat].child.splice(indTsk, 1);
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
        let myarr = [];
        Object.keys(tasksVal).forEach(key => {
          let cat = { id: key, name: tasksVal[key].category, child: [] };
          if (tasksVal[key].child != null) {
            Object.keys(tasksVal[key].child).forEach(k => {
              let task = {
                id: k,
                date: tasksVal[key].child[k].date,
                color: tasksVal[key].child[k].color,
                description: tasksVal[key].child[k].description,
                name: tasksVal[key].child[k].name,
                category: tasksVal[key].child[k].category
              };
              cat.child.push(task);
            });
          }

          myarr.push(cat);
        });
        commit("setTask", myarr);
        commit("setLoading", false);
      } catch (error) {
        throw error;
      }
    },
    async updateTaskList({ commit }, payload) {
      try {
        for (let item of payload) {
          await firebase
            .database()
            .ref(this.getters.user.id)
            .child(item.id)
            .child("child")
            .remove();
          if (item.child) {
            for (let ch of item.child) {
              await firebase
                .database()
                .ref(this.getters.user.id)
                .child(item.id)
                .child("child")
                .child(ch.id)
                .update({
                  name: ch.name,
                  description: ch.description,
                  category: item.id,
                  date: ch.date,
                  color: ch.color
                });
            }
          }
        }
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
