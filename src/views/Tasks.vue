<template>
    <div>
        <v-container class="pb-0">
            <v-btn-toggle style="background: none">
                <v-btn color="indigo darken-4" flat dark @click.prevent="addCategory">
                    <v-icon>add</v-icon>
                    новая категория
                </v-btn>
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
                    <transition-group name="company" tag="div" class="layout justify-center wrap align-start" appear>
                        <v-card class="kanban" v-for="task in tasks" :key="task.id">

                            <v-card-title class="justify-space-between flex"><h4>{{task.name }}
                            </h4>
                                <div>
                                    <v-icon class="myicon primary--text" @click.prevent="addTask(task.id)">add</v-icon>
                                    <v-icon class="myicon red--text" @click.prevent="delCategory(task.id)">close
                                    </v-icon>
                                </div>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-expansion-panel>

                                <draggable v-model="task.child" :options="{group:'category'}" style="width: 100%" @end="endDrag">
                                        <template v-for="item in task.child">
                                            <task :taskitem="item" :key="item.id" :index="item.id" :category="task.id"
                                                  v-on:delTask="delTask"></task>
                                        </template>
                                </draggable>

                            </v-expansion-panel>
                        </v-card>
                    </transition-group>
                </template>
                <template v-else>

                    <h4 class="text--secondary">У вас еще нет планов, добавьте новую категорию</h4>

                </template>
            </v-layout>


        </v-container>
    </div>

</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "Tasks",
  data() {
    return {
      load: true
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
        let countKey = 0;
        Object.keys(this.tasks).forEach(() => {
          countKey++;
        });
        if (countKey === 0) {
          this.tasks = null;
        }
      });
    },
    loadTask() {
      this.$store.dispatch("uploadTask");
    },
    delTask(payload) {
      const tsk = payload.index;
      const cat = payload.category;
      this.$store.dispatch("delTask", { tsk, cat });
    },
    endDrag() {
      this.$store.dispatch("updateTaskList", this.tasks);
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },

    tasks() {
      return this.$store.getters.tasks;
    }
  },
  components: {
    task: () => import("@/components/TaskOnly.vue"),
    draggable
  },
  mounted() {
    this.loadTask();
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

.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
 {
  opacity: 0;
}

.list-complete-item {
  transition: all 1s;
  display: inline-block;
}

.list-complete-enter, .list-complete-leave-to
        /* .list-complete-leave-active до версии 2.1.8 */
 {
  opacity: 0;
  transform: translateX(30px);
}

.list-complete-leave-active {
  position: absolute;
}

/* base */
.company {
  backface-visibility: hidden;
  z-index: 1;
}

/* moving */
.company-move {
  transition: all 600ms ease-in-out 50ms;
}

/* appearing */
.company-enter-active {
  transition: all 400ms ease-out;
}

/* disappearing */
.company-leave-active {
  transition: all 200ms ease-in;
  position: absolute;
  z-index: 0;
}

/* appear at / disappear to */
.company-enter,
.company-leave-to {
  opacity: 0;
}
</style>
