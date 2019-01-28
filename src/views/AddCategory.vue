<template>
    <v-layout justify-center>
        <v-flex xs12 sm8 md6 class="ma-2 mt-3">
            <v-card>

                <v-card-title primary-title>
                    <div style="width: 100%">
                        <h5 class="headline mb-0">Новая категория</h5>
                        <div><form >
                            <v-text-field
                                    v-model="name"
                                    label="Название"
                                    :error-messages="nameErrors"
                                    @change="$v.name.$touch()"
                            ></v-text-field>

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
  name: "AddCategory",
  data() {
    return {
      name: ""
    };
  },
  validations: {
    name: {
      required
    }
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Заполните название");
      return errors;
    }
  },
  methods: {
    add() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        //console.log("Не все поля заполнены.");
      } else {
        this.$store.dispatch("addCategory", this.name).then(() => {
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
</style>
