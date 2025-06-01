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
                  :src="meal.image || `https://placehold.co/400`"
                  alt="Meal Image"
                  height="200px"
                  cover
                ></v-img>
                <v-card-title>{{ meal.name }}</v-card-title>
                <v-card-text>
                  <p>{{ meal.description }}</p>
                  <p>
                    <strong>Price:</strong> ${{
                      parseFloat(meal.price).toFixed(2)
                    }}
                  </p>
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
import { useRouter } from "vue-router";
import Sidebar from "../components/layouts/Sidebar.vue";

const meals = ref([]);
const router = useRouter();

// Fetch meals from API
const fetchMeals = async () => {
  try {
    const response = await fetch("http://192.168.1.23/api/meals");
    const data = await response.json();
    meals.value = data.map((meal) => ({
      ...meal,
      price: parseFloat(meal.price) || 0,
      image: meal.image || "default-image-path.jpg",
    }));
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
};

// Navigate to Meal Plan page
const goToMealPlan = (meal) => {
  router.push({
    name: "MealPlan",
    params: { mealId: meal.id },
  });
};

// Add meal to cart with quantity = 1
const addToCart = async (meal) => {
  try {
    const response = await fetch("http://192.168.1.23/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
      body: JSON.stringify({
        meal_id: meal.id,
        quantity: 1,
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
  background-image: url("../assets/background.jpg");
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
