<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card class="pa-5" width="400">
      <template v-slot:title>
        <div class="text-center">
          <span class="font-weight-black">Welcome to MealMate</span>
        </div>
      </template>

      <v-card-text class="bg-surface-light pt-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
        ratione debitis quis est labore voluptatibus! Eaque cupiditate minima,
        at placeat totam, magni doloremque veniam neque porro libero rerum unde
        voluptatem!
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
