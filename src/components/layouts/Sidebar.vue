<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        app
        permanent
        :expand-on-hover="!isMobile"
        :rail="!isMobile"
        temporary
      >
        <v-list class="mt-11" density="compact" nav>
          <v-list-item
            class="mt-11"
            prepend-icon="mdi-folder"
            title="My Files"
            value="myfiles"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-multiple"
            title="Shared with me"
            value="shared"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-star"
            title="Starred"
            value="starred"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 100vh"></v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";

// State for controlling the drawer visibility
const drawer = ref(true);

// Detect if the screen is mobile-sized
const isMobile = computed(() => window.innerWidth < 768);

// Add a resize event listener to update `isMobile` dynamically
window.addEventListener("resize", () => {
  isMobile.value = window.innerWidth < 768;
});
</script>

<style scoped>
/* Add custom styles if needed */
</style>
