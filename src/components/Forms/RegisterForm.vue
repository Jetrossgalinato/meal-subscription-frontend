<template>
  <v-card
    class="d-flex justify-center align-center login-background"
    style="height: 100vh"
  >
    <v-card class="pa-5 elevation-8" width="400">
      <template v-slot:title>
        <div class="text-center">
          <span class="font-weight-black" style="color: #d84315"
            >Welcome to MealMate</span
          >
          <div class="text-subtitle-1 mt-2" style="color: #5d4037">
            Registration Form
          </div>
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
          <v-btn class="mt-2" style="color: #d84315" type="submit" block
            >Register</v-btn
          >
        </v-form>
        <div class="text-center mt-2" style="color: #5d4037">
          <span>
            Already have an account?
            <router-link to="/">Login</router-link>
          </span>
        </div>
      </v-sheet>
    </v-card>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

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

const handleRegister = async () => {
  if (
    fullname.value &&
    email.value &&
    password.value &&
    confirmPassword.value
  ) {
    try {
      const response = await axios.post("https://192.168.1.23:8000/api/register", {
        fullname: fullname.value,
        email: email.value,
        password: password.value,
        password_confirmation: confirmPassword.value,
      });

      alert(response.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message || "Registration failed.");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  } else {
    alert("Please fill in all fields.");
  }
};
</script>

<style scoped>
/* Add a background image to the registration page */
.login-background {
  background-image: url("https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg?t=st=1743517535~exp=1743521135~hmac=81b153c993a81dfba0107f7fb1da252febcbc788a57200339af7c5f8da6dd715&w=1380");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden; /* Prevent scrolling */
}
</style>
