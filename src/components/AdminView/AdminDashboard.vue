<template>
  <v-card>
    <v-layout>
      <!-- Sidebar Component -->
      <Sidebar />

      <!-- Main Content -->
      <v-main>
        <v-container>
          <h1 class="text-center font-weight-bold my-4">Admin Dashboard</h1>

          <!-- Admin Stats -->
          <v-row>
            <v-col cols="12" md="4">
              <v-card class="pa-4 text-center">
                <h2>Total Users</h2>
                <p class="display-1 font-weight-bold">
                  {{ stats.total_users }}
                </p>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card class="pa-4 text-center">
                <h2>Total Meals</h2>
                <p class="display-1 font-weight-bold">
                  {{ stats.total_meals }}
                </p>
              </v-card>
            </v-col>
          </v-row>

          <!-- Upload Meals -->
          <h2 class="my-4">Upload a New Meal</h2>
          <v-row>
            <v-col cols="12" md="6">
              <v-card class="pa-4">
                <v-form @submit.prevent="uploadMeal">
                  <v-text-field
                    v-model="meal.name"
                    label="Meal Name"
                    required
                  ></v-text-field>
                  <v-textarea
                    v-model="meal.description"
                    label="Meal Description"
                    required
                  ></v-textarea>
                  <v-text-field
                    v-model="meal.price"
                    label="Meal Price"
                    type="number"
                    required
                  ></v-text-field>
                  <v-file-input
                    v-model="meal.image"
                    label="Meal Image"
                    accept="image/*"
                    required
                  ></v-file-input>
                  <v-btn type="submit" color="#d84315" class="mt-4">
                    Upload Meal
                  </v-btn>
                </v-form>
              </v-card>
            </v-col>
          </v-row>

          <!-- Recent Users -->
          <h2 class="my-4">Recent Users</h2>
          <v-row>
            <v-col cols="12" v-for="user in stats.recent_users" :key="user.id">
              <v-card class="pa-3 mb-3">
                <h3>{{ user.name }}</h3>
                <p>Email: {{ user.email }}</p>
                <p>
                  Joined: {{ new Date(user.created_at).toLocaleDateString() }}
                </p>
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
import Sidebar from "../layouts/Sidebar.vue";
import axios from "axios";

// Admin stats
const stats = ref({
  total_users: 0,
  total_meals: 0,
  recent_users: [],
});

// Meal upload form data
const meal = ref({
  name: "",
  description: "",
  price: "",
  image: null,
});

// Fetch admin stats from the backend
const fetchAdminStats = async () => {
  try {
    const response = await axios.get(
      "http://192.168.1.23/api/admin/dashboard"
    );
    stats.value = response.data.data; // Update stats with backend data
  } catch (error) {
    console.error("Error fetching admin stats:", error);
  }
};

// Upload meal to the backend
const uploadMeal = async () => {
  try {
    const formData = new FormData();
    formData.append("name", meal.value.name);
    formData.append("description", meal.value.description);
    formData.append("price", meal.value.price);
    formData.append("image", meal.value.image);

    const response = await axios.post(
      "http://192.168.1.23/api/meals",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Meal uploaded successfully!");
    meal.value = { name: "", description: "", price: "", image: null }; // Reset form
    fetchAdminStats(); // Refresh stats
  } catch (error) {
    console.error("Error uploading meal:", error);
    alert("Failed to upload meal. Please try again.");
  }
};

onMounted(() => {
  fetchAdminStats();
});
</script>

<style scoped>
h1 {
  color: #d84315;
}

.v-card {
  margin-bottom: 20px;
}
</style>
