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
            v-model="email"
            :rules="rules"
            label="E-mail"
          ></v-text-field>
          <v-text-field
            v-model="password"
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
import axios from "axios";

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  if (email.value && password.value) {
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email: email.value,
        password: password.value,
      });

      // Save the token (you can use localStorage or Vuex/Pinia)
      localStorage.setItem("auth_token", response.data.token);

      alert("Login successful!");
      router.push("/home"); // Redirect to the dashboard
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials. Please try again.");
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  } else {
    alert("Please fill in all fields.");
  }
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
