<template>
  <v-card>
    <v-card-title>Inicio de sesión</v-card-title>
    <v-card-text>
      <v-text-field
        label="Email"
        :rules="rulesEmail"
        prepend-icon="mdi-at"
        v-model="email"
      ></v-text-field>

      <v-text-field
        label="Contraseña"
        :rules="rulesPassword"
        :type="showPassword ? 'text' : 'password'"
        prepend-icon="mdi-lock"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        v-model="password"
        @click:append="showPassword = !showPassword"
      ></v-text-field>

      <v-alert border="left" color="red lighten-2" dark v-model="showError">
        {{ error }}
      </v-alert>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn id="boton" color="primary" v-on:click="loginFunction()"
        >Login</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { validateUser } from "../services/Login.service";

export default {
  data() {
    return {
      email: "",
      password: "",
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      rulesEmail: [
        (value) => !!value || "Requerido.",
        (value) => value && value.length <= 50,
      ],
      rulesPassword: [
        (value) => !!value || "Requerido.",
        (value) => value && value.length <= 50,
      ],
      showError: false,
      error: "",
    };
  },
  methods: {
    loginFunction() {
      validateUser(this.email, this.password)
        .then((response) => {
          const user = response.data;
          sessionStorage.setItem("username", user.username);
          sessionStorage.setItem("role", user.role);
          this.$emit("logged", undefined);
          window.location.reload();
        })
        .catch((err) => {
          this.showError = true;
          this.error = err.response.data.message;
          setInterval(() => {
            this.showError = false;
          }, 3000);
        });
    },
  },
};
</script>

<style scoped>
</style>
