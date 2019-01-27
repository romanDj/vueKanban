<template>
    <v-container>
        <v-layout justify-center>
            <v-flex sm8 md6>
                <form>
                    <v-text-field
                            v-model="email"
                            label="E-mail"
                            :error-messages="emailErrors"
                            @change="$v.email.$touch()"
                    ></v-text-field>

                    <v-text-field
                            v-model="password"
                            :type="'password'"
                            :error-messages="passwordErrors"
                            label="Пароль"
                            @change="$v.password.$touch()"
                    ></v-text-field>

                    <v-text-field
                            v-model="repeatPassword"
                            :type="'password'"
                            :error-messages="passwordRepeatErrors"
                            label="Повторите пароль"
                            @change="$v.repeatPassword.$touch()"
                    ></v-text-field>

                    <v-layout align-center justify-end row>
                            <v-btn color="success" @click.prevent="submit" class="mr-0">Зарегистрировать</v-btn>
                    </v-layout>

                    <p class="red--text m-3">{{submitStatus}}</p>

                    <v-alert
                            class="mt-3"
                            :value="true"
                            icon="info"
                            color="info"
                            outline>
                        Если есть аккаунт перейдите к <router-link class="blue--text" to="/auth">авторизации</router-link>
                    </v-alert>

                </form>
            </v-flex>
        </v-layout>


    </v-container>
</template>

<script>
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";

export default {
  name: "Signup",
  data() {
    return {
      email: "",
      password: "",
      repeatPassword: "",
      submitStatus: null
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      sameAsPassword: sameAs("password")
    }
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Неправильный формат email");
      !this.$v.email.required && errors.push("Заполните email");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Заполните пароль");
      !this.$v.password.minLength &&
        errors.push("Минимальная длина пароля 6 символов");
      return errors;
    },
    passwordRepeatErrors() {
      const errors = [];
      if (!this.$v.repeatPassword.$dirty) return errors;
      !this.$v.repeatPassword.sameAsPassword &&
        errors.push("Не совпадает с полем пароль");
      return errors;
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return null;
      } else {
        const user = {
          email: this.email,
          password: this.password
        };
        this.$store
          .dispatch("registerUser", user)
          .then(() => {
            this.submitStatus = "OK";
            this.$router.push("/auth");
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
