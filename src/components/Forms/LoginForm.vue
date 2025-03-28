<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card class="pa-5 elevation-8" width="400">
      <template v-slot:title>
        <div class="text-center">
          <span class="font-weight-black">Welcome to MealMate</span>
          <div class="text-subtitle-1 mt-2">Login Form</div>
        </div>
      </template>

      <v-sheet class="mx-auto" width="300" style="background-color: white">
        <v-form @submit.prevent>
          <v-text-field
            v-model="Email"
            :rules="rules"
            label="E-mail"
          ></v-text-field>
          <v-text-field
            v-model="Password"
            :rules="rules"
            label="Password"
          ></v-text-field>
          <v-btn class="mt-2" type="submit" block>Login</v-btn>
        </v-form>
        <div class="text-center mt-2">
          <span
            >Don't have an account?
            <router-link to="/register">Register</router-link>
          </span>
        </div>
      </v-sheet>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");

const handleLogin = () => {
  if (email.value && password.value) {
    alert(`Logged in with Email: ${email.value}`);
  } else {
    alert("Please fill in all fields.");
  }
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
