<template>
    <div>
        <v-container class="pb-0">
            <v-btn-toggle style="background: none">
                <v-btn  color="purple darken-4" flat dark @click.prevent="addTask" ><v-icon>add</v-icon> новая задача</v-btn>
                <v-btn  color="indigo darken-4" flat dark @click.prevent="addCategory" ><v-icon>add</v-icon> новая категория</v-btn>
            </v-btn-toggle>
        </v-container>

        <v-container fluid grid-list-md>
            <v-layout justify-center wrap align-start>
                <v-card class="kanban" v-for="(task, i) in tasks" :key="i">
                    <v-card-title class="justify-space-between flex"><h4>{{task.category}}</h4><v-icon class="myicon red--text" @click.prevent="delCategory(task.key)">close</v-icon></v-card-title>
                    <v-divider></v-divider>
                    <v-expansion-panel>

                        <template  v-for="(item,i) in task.child">
                            <task :taskitem="item" :key="i"></task>
                        </template>

                    </v-expansion-panel>
                </v-card>
            </v-layout>

        </v-container>
    </div>

</template>

<script>
export default {
  name: "Tasks",
  methods: {
    addTask() {
      this.$router.push("/addtask");
    },
    addCategory() {
      this.$router.push("/addcategory");
    },
    delCategory(key) {
      this.$store.dispatch("delCategory", key);
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    }
  },
  components: {
    task: () => import("@/components/TaskOnly.vue")
  },
  mounted() {
    this.$store.dispatch("uploadTask");
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
</style>
