<template>
    <v-container>
        <v-layout justify-center>
            <v-flex sm8 md6>
                <form>
                    <v-text-field
                            v-model="email"
                            label="Логин"
                            :error-messages="emailErrors"
                            @change="$v.email.$touch()"
                    ></v-text-field>

                    <v-text-field
                            v-model="password"
                            :type="'password'"
                            label="Пароль"
                            :error-messages="passwordErrors"
                            @change="$v.password.$touch()"
                    ></v-text-field>

                    <v-layout align-center justify-end row>
                        <v-btn color="success" @click.prevent="onSubmit"  class="mr-0">Авторизоваться</v-btn>
                    </v-layout>

                    <p class="red--text">{{submitStatus}}</p>

                    <v-alert
                            class="mt-3"
                            :value="true"
                            icon="info"
                            color="info"
                            outline>
                         Для добавления акаунта перейдите к <router-link class="blue--text" to="/signup">регистрации</router-link>
                    </v-alert>


                </form>
            </v-flex>
        </v-layout>


    </v-container>

</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Auth",
  data: function() {
    return {
      email: "",
      password: "",
      submitStatus: ""
    };
  },
  validations: {
    email: {
      required
    },
    password: {
      required
    }
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push("Заполните логин");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Заполните пароль");
      return errors;
    }
  },
  methods: {
    onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return null;
      } else {
        const user = {
          email: this.email,
          password: this.password
        };
        this.$store
          .dispatch("loginUser", user)
          .then(() => {
            this.submitStatus = "OK";
            this.$router.push("/tasks");
          })
          .catch(err => {
            this.submitStatus = err.message;
          });
      }
    }
  }
};
</script>

<style scoped>
</style>
