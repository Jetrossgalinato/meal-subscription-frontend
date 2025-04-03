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

// Fetch admin stats from the backend
const fetchAdminStats = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/admin/dashboard"
    );
    stats.value = response.data.data;
  } catch (error) {
    console.error("Error fetching admin stats:", error);
  }
};

onMounted(() => {
  fetchAdminStats();
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
