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
                <v-card class="kanban">
                    <v-card-title><h4>Какое то название</h4></v-card-title>
                    <v-divider></v-divider>
                    <v-expansion-panel>
                        <v-expansion-panel-content style=""
                                v-for="(item,i) in 5"
                                :key="i"
                        >
                            <div slot="header"><div>
                                Название задачи <p class="text--secondary accent-1 ma-0">Дата - 2019-01-20</p>
                            </div>

                            </div>
                            <v-card style="">

                                <v-card-text> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                                <div  class="flex justify-end">
                                    <v-icon class="myicon">border_color</v-icon><v-icon class="myicon">close</v-icon>
                                </div>
                            </v-card>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-card>
                <v-card class="kanban">
                    <v-card-title><h4>Какое то название</h4></v-card-title>
                    <v-divider></v-divider>
                    <v-list dense>
                        <v-list-tile>
                            <v-list-tile-content>Calories:</v-list-tile-content>
                            <v-list-tile-content class="align-end">11</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>Fat:</v-list-tile-content>
                            <v-list-tile-content class="align-end">22</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>Carbs:</v-list-tile-content>
                            <v-list-tile-content class="align-end">33</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>Protein:</v-list-tile-content>
                            <v-list-tile-content class="align-end">44</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>Sodium:</v-list-tile-content>
                            <v-list-tile-content class="align-end">55</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>Calcium:</v-list-tile-content>
                            <v-list-tile-content class="align-end">66</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>Iron:</v-list-tile-content>
                            <v-list-tile-content class="align-end">77</v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card>
                <v-card class="kanban">
                    <v-card-title><h4>Какое то название</h4></v-card-title>
                    <v-divider></v-divider>
                    <v-list dense>
                        <v-list-tile>
                            <v-list-tile-content>Calories:</v-list-tile-content>
                            <v-list-tile-content class="align-end">11</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>Fat:</v-list-tile-content>
                            <v-list-tile-content class="align-end">22</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>Carbs:</v-list-tile-content>
                            <v-list-tile-content class="align-end">33</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>Protein:</v-list-tile-content>
                            <v-list-tile-content class="align-end">44</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>Sodium:</v-list-tile-content>
                            <v-list-tile-content class="align-end">55</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>Calcium:</v-list-tile-content>
                            <v-list-tile-content class="align-end">66</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>Iron:</v-list-tile-content>
                            <v-list-tile-content class="align-end">77</v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card>
                <v-card class="kanban">
                    <v-card-title><h4>Какое то название</h4></v-card-title>
                    <v-divider></v-divider>
                    <v-list dense>
                        <v-list-tile>
                            <v-list-tile-content>Calories:</v-list-tile-content>
                            <v-list-tile-content class="align-end">11</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>Fat:</v-list-tile-content>
                            <v-list-tile-content class="align-end">22</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>Carbs:</v-list-tile-content>
                            <v-list-tile-content class="align-end">33</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>Protein:</v-list-tile-content>
                            <v-list-tile-content class="align-end">44</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>Sodium:</v-list-tile-content>
                            <v-list-tile-content class="align-end">55</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>Calcium:</v-list-tile-content>
                            <v-list-tile-content class="align-end">66</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>Iron:</v-list-tile-content>
                            <v-list-tile-content class="align-end">77</v-list-tile-content>
                        </v-list-tile>
                    </v-list>
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
</style>
