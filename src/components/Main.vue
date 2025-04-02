<template>
  <v-card>
    <v-layout>
      <!-- Sidebar Component -->
      <Sidebar />

      <!-- Main Content -->
      <v-main>
        <v-container>
          <v-row>
            <v-col cols="12">
              <h1 class="text-center font-weight-bold my-4">
                Meals You Might Like
              </h1>
            </v-col>
          </v-row>

          <!-- List of Meals -->
          <v-row>
            <v-col
              v-for="meal in meals"
              :key="meal.id"
              cols="12"
              md="4"
              class="d-flex"
            >
              <v-card class="flex-grow-1">
                <v-img
                  :src="meal.image"
                  alt="Meal Image"
                  height="200px"
                  cover
                ></v-img>
                <v-card-title>{{ meal.name }}</v-card-title>
                <v-card-text>
                  <p>{{ meal.description }}</p>
                  <p><strong>Price:</strong> ${{ meal.price }}</p>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="subscribeToMeal(meal)">
                    Subscribe
                  </v-btn>
                  <v-btn color="secondary" @click="addToCart(meal)">
                    Add to Cart
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Sidebar from "../components/layouts/Sidebar.vue"; // Import Sidebar component

// List of meals
const meals = ref([]);

// Fetch meals from the backend
const fetchMeals = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/meals");
    meals.value = await response.json();
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
};

// Subscribe to a meal
const subscribeToMeal = (meal) => {
  alert(`You have subscribed to ${meal.name}!`);
  // Add logic to handle subscription (e.g., API call)
};

// Add meal to cart
const addToCart = (meal) => {
  alert(`${meal.name} has been added to your cart!`);
  // Add logic to handle adding to cart (e.g., API call)
};

onMounted(() => {
  fetchMeals();
});
</script>

<style scoped>
h1 {
  color: #1976d2;
}

.v-card {
  margin-bottom: 20px;
}
</style>
