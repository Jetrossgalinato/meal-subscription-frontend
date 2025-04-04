<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  document.title = "Meal Mate";
});
</script>

<style></style>
