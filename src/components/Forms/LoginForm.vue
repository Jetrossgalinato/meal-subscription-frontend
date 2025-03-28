<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card class="pa-6" max-width="400">
      <v-card-title class="text-h5">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            required
            outlined
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
            outlined
          ></v-text-field>
          <v-btn type="submit" color="primary" block class="mt-4">
            Login
          </v-btn>
        </v-form>
      </v-card-text>
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
