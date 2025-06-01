<template>
  <v-card>
    <v-layout
      style="
        background-image: url('https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg?t=st=1743529551~exp=1743533151~hmac=26ac14b577d3e31f19a7835c4ad5c7c5d58447c75bafb2ea7c42c2f7f06e9c54&w=1380');
        background-size: cover;
        background-position: center;
        min-height: 100vh;
      "
    >
      <!-- Sidebar Component -->
      <Sidebar />

      <!-- Main Content -->
      <v-main>
        <v-card>
          <v-card-title>User Profile</v-card-title>
          <v-card-text>
            <v-row>
              <!-- Avatar -->
              <v-col cols="12" md="4" class="text-center">
                <v-img
                  :src="user.avatar"
                  max-height="150"
                  max-width="150"
                  class="mb-4"
                ></v-img>
              </v-col>

              <!-- User Details -->
              <v-col cols="12" md="8">
                <v-list dense>
                  <v-list-item>
                    <v-list-item-title class="list-title"
                      ><strong>Full Name:</strong></v-list-item-title
                    >
                    <v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title class="list-title"
                      ><strong>Email:</strong></v-list-item-title
                    >
                    <v-list-item-subtitle>{{
                      user.email
                    }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title class="list-title"
                      ><strong>Dietary Preferences:</strong></v-list-item-title
                    >
                    <v-list-item-subtitle>{{
                      user.dietary_preferences || "N/A"
                    }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title class="list-title"
                      ><strong>Allergies:</strong></v-list-item-title
                    >
                    <v-list-item-subtitle>{{
                      user.allergies || "N/A"
                    }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title class="list-title"
                      ><strong>Delivery Address:</strong></v-list-item-title
                    >
                    <v-list-item-subtitle>{{
                      user.delivery_address || "N/A"
                    }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Sidebar from "../components/layouts/Sidebar.vue"; // Import Sidebar component

const user = ref({
  name: "",
  email: "",
  dietary_preferences: "",
  allergies: "",
  delivery_address: "",
  avatar: "",
});

// Fetch user data from the backend
const fetchUserData = async () => {
  try {
    const userId = localStorage.getItem("user_id");
    const response = await axios.get(
      `http://192.168.1.23/api/user/${userId}`
    );
    const userData = response.data;

    user.value.name = userData.name;
    user.value.email = userData.email;
    user.value.dietary_preferences = userData.dietary_preferences || "N/A";
    user.value.allergies = userData.allergies || "N/A";
    user.value.delivery_address = userData.delivery_address || "N/A";
    user.value.avatar = userData.avatar || "";
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

onMounted(() => {
  fetchUserData();
});
</script>

<style scoped>
.v-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/* Apply color to list item titles */
.list-title {
  color: #5d4037; /* Deep Brown */
}
</style>
