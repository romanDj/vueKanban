<template>
    <div>
        <v-container class="pb-0">
            <v-btn-toggle style="background: none">
                <v-btn  color="indigo darken-4" flat dark @click.prevent="addCategory" ><v-icon>add</v-icon> новая категория</v-btn>
            </v-btn-toggle>
        </v-container>

        <v-container fluid grid-list-md>

                <v-layout v-if="loading" justify-center wrap align-start>
                    <v-progress-circular
                            indeterminate
                            color="primary"
                    ></v-progress-circular>
                </v-layout>
                <v-layout v-else justify-center wrap align-start>

                    <template v-if="tasks != null">
                        <v-card class="kanban" v-for="(task, i) in tasks" :key="i">

                            <v-card-title class="justify-space-between flex"><h4>{{task.category}}
                            </h4>
                                <div>
                                    <v-icon class="myicon primary--text" @click.prevent="addTask(i)">add</v-icon>
                                    <v-icon class="myicon red--text" @click.prevent="delCategory(i)">close</v-icon>
                                </div>

                            </v-card-title>
                            <v-divider></v-divider>
                            <v-expansion-panel>

                                <template  v-for="(item,it) in task.child">
                                    <task :taskitem="item" :key="it" :index="it" :category="i" v-on:delTask="delTask"></task>
                                </template>

                            </v-expansion-panel>

                        </v-card>
                    </template>
                    <template v-else>
                        <h4 class="text--secondary">У вас еще нет планов, добавьте новую категорию</h4>
                    </template>
                </v-layout>



        </v-container>
    </div>

</template>

<script>
export default {
  name: "Tasks",
  data() {
    return {
      load: true,
      tasks: null
    };
  },
  methods: {
    addTask(key) {
      this.$router.push("/addtask/" + key);
    },
    addCategory() {
      this.$router.push("/addcategory");
    },
    delCategory(key) {
      this.$store.dispatch("delCategory", key).then(() => {
        this.tasks = null;
        this.tasks = this.$store.getters.tasks;
      });
    },
    loadTask() {
      this.$store.dispatch("uploadTask").then(() => {
        this.tasks = this.$store.getters.tasks;
      });
    },
    delTask(payload) {
      const tsk = payload.index;
      const cat = payload.category;
      this.$store.dispatch("delTask", { tsk, cat }).then(() => {
        this.tasks = null;
        this.tasks = this.$store.getters.tasks;
      });
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    user() {
      return this.$store.getters.checkUser;
    }
  },
  components: {
    task: () => import("@/components/TaskOnly.vue")
  },
  mounted() {
    if (this.user) {
      this.loadTask();
    }
  },
  watch: {
    user() {
      this.loadTask();
    }
  }
};
</script>

<style scoped>
.kanban {
  width: 100%;
  max-width: 450px;
  margin: 10px;
}
.myicon {
  cursor: pointer;
  font-size: 18px;
  margin-right: 10px;
}
.myflex {
  display: flex;
  justify-content: flex-end;
  margin: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
