<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card class="pa-5 elevation-8" width="400">
      <template v-slot:title>
        <div class="text-center">
          <span class="font-weight-black">Welcome to MealMate</span>
          <div class="text-subtitle-1 mt-2">Registration Form</div>
        </div>
      </template>

      <v-sheet class="mx-auto" width="300" style="background-color: white">
        <v-form @submit.prevent="handleRegister">
          <v-text-field
            v-model="fullname"
            :rules="[rules.required]"
            label="Fullname"
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="E-mail"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="[rules.required, rules.minLength(6)]"
            label="Password"
            type="password"
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            :rules="[rules.required, rules.matchPassword]"
            label="Confirm Password"
            type="password"
          ></v-text-field>
          <v-btn class="mt-2" type="submit" block>Register</v-btn>
        </v-form>
        <div class="text-center mt-2">
          <span
            >Already have an account?
            <router-link to="/">Login</router-link></span
          >
        </div>
      </v-sheet>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const fullname = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const rules = {
  required: (value) => !!value || "This field is required.",
  email: (value) => /.+@.+\..+/.test(value) || "E-mail must be valid.",
  minLength: (min) => (value) =>
    value.length >= min || `Minimum ${min} characters required.`,
  matchPassword: (value) => value === password.value || "Passwords must match.",
};

const handleRegister = () => {
  if (
    fullname.value &&
    email.value &&
    password.value &&
    confirmPassword.value
  ) {
    alert(`Registered successfully with Email: ${email.value}`);
  } else {
    alert("Please fill in all fields.");
  }
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
