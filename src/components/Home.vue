<template>
  <v-card>
    <v-layout>
      <Sidebar />
      <!-- Use the Sidebar component -->
      <v-main style="height: 100vh"></v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import Sidebar from "../components/layouts/Sidebar.vue"; // Import the Sidebar component
</script>

<style></style>
