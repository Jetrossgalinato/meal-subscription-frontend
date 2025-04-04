<template>
  <v-card>
    <v-layout>
      <!-- Sidebar Component -->
      <Sidebar />

      <!-- Main Content -->
      <v-main class="main-background">
        <v-container>
          <v-row>
            <v-col cols="12">
              <h1 class="text-center font-weight-bold my-4">
                Meals You Might Like
              </h1>
            </v-col>
          </v-row>

          <!-- Carousel of Meals -->
          <v-carousel>
            <v-carousel-item v-for="meal in meals" :key="meal.id">
              <v-card class="mx-auto" max-width="400" elevation="10">
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
                  <v-btn color="#D84315" @click="goToMealPlan(meal)">
                    Subscribe
                  </v-btn>
                  <v-btn color="#8D6E63" @click="addToCart(meal)">
                    Add to Cart
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-carousel-item>
          </v-carousel>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"; // Import Vue Router
import Sidebar from "../components/layouts/Sidebar.vue"; // Import Sidebar component

// List of meals
const meals = ref([]);
const router = useRouter(); // Initialize Vue Router

// Fetch meals from the backend
const fetchMeals = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/meals");
    meals.value = await response.json();
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
};

// Navigate to MealPlan.vue
const goToMealPlan = (meal) => {
  router.push({
    name: "MealPlan", // The route name for MealPlan.vue
    params: { mealId: meal.id }, // Pass the meal ID as a route parameter
  });
};

// Add meal to cart
const addToCart = async (meal) => {
  try {
    const response = await fetch("http://localhost:8000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`, // Include auth token
      },
      body: JSON.stringify({
        meal_id: meal.id,
        quantity: 1, // Default quantity is 1
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(`${meal.name} has been added to your cart!`);
    } else {
      alert(data.message || "Failed to add meal to cart.");
    }
  } catch (error) {
    console.error("Error adding meal to cart:", error);
    alert("An error occurred while adding the meal to the cart.");
  }
};

onMounted(() => {
  fetchMeals();
});
</script>

<style scoped>
.main-background {
  background-image: url("../assets/background.jpg"); /* Replace with your background image path */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  padding: 20px;
}
h1 {
  color: #d84315;
}

.v-card {
  margin-bottom: 20px;
}
</style>
