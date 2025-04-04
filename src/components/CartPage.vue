<template>
  <v-layout>
    <!-- Sidebar Component -->
    <Sidebar />

    <!-- Main Content -->
    <v-main>
      <v-container>
        <h1>Your Cart</h1>
        <v-row>
          <v-col cols="12" md="6" v-for="item in cartItems" :key="item.id">
            <v-card class="mb-4" elevation="3">
              <v-img
                :src="item.image"
                alt="Meal Image"
                height="200px"
                cover
              ></v-img>
              <v-card-title>{{ item.name }}</v-card-title>
              <v-card-text>
                <p>{{ item.description }}</p>
                <p><strong>Price:</strong> ${{ item.price }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
import Sidebar from "../components/layouts/Sidebar.vue"; // Import the Sidebar component
import { cartStore } from "../cartStore.js"; // Import the cart store

// Get cart items from the store
const cartItems = cartStore.getCartItems();
</script>

<style scoped>
h1 {
  color: #d84315;
  margin-bottom: 20px;
}
</style>
