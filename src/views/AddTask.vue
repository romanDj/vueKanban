<template>
    <v-layout justify-center>
        <v-flex xs12 sm8 md6 class="ma-2 mt-3">
            <v-card>

                <v-card-title primary-title>
                    <div style="width: 100%">
                        <h5 class="headline mb-0">Новая задача</h5>
                        <div><form >
                            <v-text-field
                                    v-model="name"
                                    label="Название"
                                    :error-messages="nameErrors"
                                    @change="$v.name.$touch()"
                            ></v-text-field>
                            <v-menu
                                    ref="menu"
                                    :close-on-content-click="false"
                                    v-model="menu"
                                    :nudge-right="40"
                                    :return-value.sync="date"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    min-width="290px"
                            >
                                <v-text-field
                                        slot="activator"
                                        v-model="date"
                                        label="Дата плана"
                                        :error-messages="dateErrors"
                                        @change="$v.date.$touch()"
                                        readonly
                                ></v-text-field>
                                <v-date-picker locale v-model="date" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="menu = false">Отмена</v-btn>
                                    <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>

                            <v-select
                                    :items="category_item"
                                    item-text="label"
                                    item-value="key"
                                    label="Категория"
                                    v-model="category"
                                    :error-messages="categoryErrors"
                                    @change="$v.category.$touch()"
                            ></v-select>
                            <v-textarea
                                    v-model="description"
                                    label="Описание"
                                    :error-messages="descriptionErrors"
                                    @change="$v.description.$touch()"
                            ></v-textarea>

                            <p>Цвет подчеркивания</p>

                            <div style="display: flex">
                                <v-card  v-for="(item, index) in palette"
                                         @click.prevent="color = item" class="color-block"
                                         :style="{background: item, borderColor: (color === item ? 'black': 'rgba(255, 255, 255, 0)')}" :key="index">
                                </v-card>
                            </div>

                        </form></div>
                    </div>
                </v-card-title>

                <v-card-actions>
                    <v-btn flat color="orange" @click.prevent="goBack">Отмена</v-btn>
                    <v-btn flat color="green" @click.prevent="add">Добавить</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "AddTask",
  data() {
    return {
      name: "",
      description: "",
      category: "",
      category_key: "",
      date: "",
      menu: false,
      color: "",
      palette: ["#DD2C00", "#F9A825", "#FF3D00", "#42A5F5", "#FFF8E1"]
    };
  },
  computed: {
    category_item() {
      const cat = [];
      const allTasks = this.$store.getters.tasks;
      Object.keys(allTasks).forEach(key => {
        cat.push({ key: key, label: allTasks[key].category });
      });
      return cat;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Заполните название");
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.required && errors.push("Заполните описание");
      return errors;
    },
    categoryErrors() {
      const errors = [];
      if (!this.$v.category.$dirty) return errors;
      !this.$v.category.required && errors.push("Выберите категорию");
      return errors;
    },
    dateErrors() {
      const errors = [];
      if (!this.$v.date.$dirty) return errors;
      !this.$v.date.required && errors.push("Выберите дату");
      return errors;
    }
  },
  mounted() {
    this.color = this.palette[0];
  },
  validations: {
    name: {
      required
    },
    description: {
      required
    },
    category: {
      required
    },
    date: {
      required
    }
  },
  methods: {
    add() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        //console.log("Не все поля заполнены.");
      } else {
        this.$store
          .dispatch("addTask", {
            name: this.name,
            description: this.description,
            category: this.category,
            date: this.date,
            color: this.color
          })
          .then(() => {
            this.$router.push("/tasks");
          });
      }
    },
    goBack() {
      this.$router.push("/tasks");
    }
  }
};
</script>

<style scoped>
.color-block {
  margin-right: 8px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0);
}
</style>
