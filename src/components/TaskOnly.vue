<template>

        <v-expansion-panel-content>
            <template v-if="!edit">
                <div slot="header" >
                    <div>
                        <h4 :style="{borderBottom: 'solid 2px'+ task.color, display: 'inline-block'}" class="pr-2"> {{task.name}}</h4>
                        <p class="text--secondary accent-1 ma-0">Дата - {{task.date}}</p>
                    </div>
                </div>
                <v-card>
                    <v-card-text>{{task.description}}</v-card-text>
                    <div class="myflex">
                        <v-icon class="myicon" @click.prevent="edit = true">border_color</v-icon><v-icon class="myicon" @click.prevent="delTask">close</v-icon>
                    </div>
                </v-card>
            </template>
            <template v-else>
                <div class="pa-2">
                    <div>
                        <v-text-field
                                v-model="task.name"
                                label="Название"
                        ></v-text-field>
                        <v-menu
                                ref="menu"
                                :close-on-content-click="false"
                                v-model="menu"
                                :nudge-right="40"
                                :return-value.sync="task.date"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px"
                        >
                            <v-text-field
                                    slot="activator"
                                    v-model="task.date"
                                    label="Дата"
                                    readonly
                            ></v-text-field>
                            <v-date-picker locale v-model="task.date" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="menu = false">Отмена</v-btn>
                                <v-btn flat color="primary" @click="$refs.menu.save(task.date)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                        <v-textarea
                            v-model="task.description"
                            label="Описание"
                    ></v-textarea>
                        <p>Цвет подчеркивания</p>

                        <div style="display: flex">
                            <v-card  v-for="(item, index) in palette"
                                     @click.prevent="task.color = item" class="color-block"
                                     :style="{background: item, borderColor: (task.color === item ? 'black': 'rgba(255, 255, 255, 0)')}" :key="index">
                            </v-card>
                        </div>
                        <div class="myflex">
                            <v-icon class="myicon" @click.prevent="save">check</v-icon>
                        </div>
                    </div>
                </div>
            </template>

        </v-expansion-panel-content>

</template>

<script>
export default {
  name: "TaskOnly",
  props: ["taskitem", "index", "category"],
  data() {
    return {
      edit: false,
      task: null,
      menu: false,
      palette: ["#DD2C00", "#F9A825", "#FF3D00", "#42A5F5", "#FFF8E1"]
    };
  },
  created() {
    this.task = this.taskitem;
  },
  methods: {
    delTask() {
      const tsk = this.index;
      const cat = this.category;
      this.$store.dispatch("delTask", { tsk, cat });
    },
    save() {
      this.edit = false;
      this.$store.dispatch("updateTask", { task: this.task, id: this.index });
    }
  }
};
</script>

<style scoped>
.myicon {
  cursor: pointer;
  font-size: 18px;
  margin-right: 10px;
}
.myflex {
  display: flex;
  justify-content: flex-end;
  margin: 10px;
  margin-top: 0;
}
.color-block {
  margin-right: 8px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0);
}
</style>
