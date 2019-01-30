import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/auth",
      name: "auth",
      component: () => import("./views/Auth.vue")
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("./views/Signup.vue")
    },
    {
      path: "/addtask/:id",
      name: "addtask",
      component: () => import("./views/AddTask.vue")
    },
    {
      path: "/addcategory",
      name: "addcategory",
      component: () => import("./views/AddCategory.vue")
    },
    {
      path: "/tasks",
      name: "tasks",
      component: () => import("./views/Tasks.vue")
    }
  ]
});
