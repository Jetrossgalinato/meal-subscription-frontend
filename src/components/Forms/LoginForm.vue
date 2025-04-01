<template>
  <v-card
    class="d-flex justify-center align-center login-background"
    style="height: 100vh; width: 100vw"
  >
    <v-card class="pa-5 elevation-8" width="400">
      <template v-slot:title>
        <div class="text-center">
          <span class="font-weight-black">Welcome to MealMate</span>
          <div class="text-subtitle-1 mt-2">Login Form</div>
        </div>
      </template>

      <v-sheet class="mx-auto" width="300" style="background-color: white">
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="email"
            :rules="rules"
            label="E-mail"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="rules"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
          >
            <template v-slot:append-inner>
              <v-icon
                @click.stop="togglePasswordVisibility"
                class="cursor-pointer"
              >
                {{ showPassword ? "mdi-eye-off" : "mdi-eye" }}
              </v-icon>
            </template>
          </v-text-field>
          <v-btn class="mt-2" type="submit" block>Login</v-btn>
        </v-form>
        <div class="text-center mt-2">
          <span>
            Don't have an account?
            <router-link to="/register">Register</router-link>
          </span>
        </div>
      </v-sheet>
    </v-card>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const router = useRouter();

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  if (email.value && password.value) {
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email: email.value,
        password: password.value,
      });

      localStorage.setItem("auth_token", response.data.token);
      alert("Login successful!");
      localStorage.setItem("user_id", response.data.user.id);
      router.push("/home");
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
/* Add a background image to the login page */
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
