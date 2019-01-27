<template>
 <v-app>
   <v-navigation-drawer dark  absolute temporary v-model="drawer" class="hidden-md-and-up">
      <v-list>
        <v-list-tile v-for="(item, i) in menu" flat :key="`navdrawer${i}`"  :to="item.route">
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
          <v-list-tile flat @click.prevent="logout" v-if="checkUser">
              <v-list-tile-action>
                  <v-icon v-html="'exit_to_app'"></v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                  <v-list-tile-title v-text="'Выйти'"></v-list-tile-title>
              </v-list-tile-content>
          </v-list-tile>
      </v-list>
   </v-navigation-drawer>
   <v-toolbar app dark class="secondary">
     <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
     <v-toolbar-title v-text="'Kanban board'"></v-toolbar-title>
     <v-spacer></v-spacer>
     <v-toolbar-items class="hidden-sm-and-down">
       <v-btn v-for="(item, i) in menu" flat :key="`menuitem${i}`"  :to="item.route">
          <v-icon left v-html="item.icon" ></v-icon>
          {{item.title}}
       </v-btn>
         <v-btn @click.prevent="logout" v-if="checkUser" flat><v-icon left v-html="'exit_to_app'" ></v-icon>Выйти</v-btn>
     </v-toolbar-items>
   </v-toolbar>

   <v-content transition="slide-x-transition">
     <router-view></router-view>
   </v-content>

 </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/auth");
    }
  },
  computed: {
    checkUser() {
      return this.$store.getters.checkUser;
    },
    menu() {
      if (this.$store.getters.checkUser) {
        return [
          {
            icon: "extension",
            title: "Задачи",
            route: "/tasks"
          }
        ];
      } else {
        return [
          {
            icon: "account_circle",
            title: "Регистрация",
            route: "/signup"
          },

          {
            icon: "input",
            title: "Войти",
            route: "/auth"
          }
        ];
      }
    }
  }
};
</script>

<style>
</style>
