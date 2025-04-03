<template>
  <v-card>
    <v-layout>
      <Sidebar />
      <!-- Use the Sidebar component -->
      <v-main style="height: 100vh">
        <!-- Hero Section -->
        <v-container class="hero-section" fluid>
          <v-img
            src="https://i.pinimg.com/736x/8a/b2/6c/8ab26cfedf41496ebbbf444f54fa4002.jpg"
            alt="Delicious ready-made meals"
            class="hero-image"
            height="600px"
            cover
          >
            <v-container class="hero-content" fill-height>
              <v-row align="center" justify="center" class="text-center">
                <v-col cols="12">
                  <h1 class="display-1 font-weight-bold text-white">
                    Welcome to MealMate! <br />
                    Healthy, Ready-to-Eat Meals Delivered to Your Door!
                  </h1>
                  <v-btn
                    color="#D84315"
                    large
                    elevation="10"
                    class="mt-4"
                    @click="navigateToMain"
                  >
                    Get Started
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-img>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import Sidebar from "../components/layouts/Sidebar.vue"; // Import the Sidebar component
import { useRouter } from "vue-router"; // Import Vue Router

const router = useRouter();

function navigateToMain() {
  router.push("/main"); // Navigate to the main page
}
</script>

<style>
.hero-section {
  position: relative;
}

.hero-image {
  position: relative;
}

.hero-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(
    0,
    0,
    0,
    0.5
  ); /* Add a dark overlay for better text visibility */
}

.text-white {
  color: white;
}
</style>
