/* eslint-disable no-unused-vars */
import Vue from "vue";
import Router from "vue-router";
import store from "./store";

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.checkUser) {
    next();
    return;
  }
  next("/tasks");
};

const ifAuthenticated = (to, from, next) => {
  // localStorage.removeItem('user-token')
  if (store.getters.checkUser) {
    next();
    return;
  }
  next("/");
};

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/auth",
      name: "auth",
      component: () => import("./views/Auth.vue"),
      beforeEnter: ifNotAuthenticated
    },
    {
      path: "/",
      redirect: to => {
        if (store.getters.checkUser) {
          return "/tasks";
        } else {
          return "/auth";
        }
      }
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("./views/Signup.vue")
    },
    {
      path: "/addtask/:id",
      name: "addtask",
      component: () => import("./views/AddTask.vue"),
      beforeEnter: ifAuthenticated
    },
    {
      path: "/addcategory",
      name: "addcategory",
      component: () => import("./views/AddCategory.vue"),
      beforeEnter: ifAuthenticated
    },
    {
      path: "/tasks",
      name: "tasks",
      component: () => import("./views/Tasks.vue"),
      beforeEnter: ifAuthenticated
    },
    {
      path: "*",
      component: () => import("./views/Error.vue")
    }
  ]
});
