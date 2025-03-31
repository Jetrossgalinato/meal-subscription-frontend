<template>
  <div>
    <h1>Welcome to the Home Page</h1>
    <v-btn color="primary" @click="logout">Logout</v-btn>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  // Remove the authentication token from localStorage
  localStorage.removeItem("auth_token");

  // Redirect the user to the login page
  router.push("/");
}; //added a commit to the main branch
</script>

<style></style>
