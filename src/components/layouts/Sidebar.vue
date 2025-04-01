<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list>
          <v-list-item
            :prepend-avatar="user.avatar || 'https://via.placeholder.com/150'"
            :title="user.name"
            :subtitle="user.email"
          >
            <div v-if="!rail">
              <span
                style="cursor: pointer; color: #1976d2; font-size: 0.875rem"
                @click="editProfile"
              >
                Edit Profile
              </span>
            </div>
            <template v-slot:append>
              <v-btn
                v-if="!rail"
                icon="mdi-chevron-left"
                variant="text"
                @click.stop="rail = !rail"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <!-- My Profile Section -->
          <v-list-item
            prepend-icon="mdi-account-circle"
            title="My Profile"
            @click="goToProfile"
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
          <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            @click="logout"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 100vh"></v-main>
    </v-layout>
  </v-card>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  data() {
    return {
      drawer: true,
      rail: true,
    };
  },
  setup() {
    const router = useRouter();

    // User data
    const user = ref({
      avatar: "", // Initially blank
      name: "", // Will be fetched from the database
      email: "", // Will be fetched from the database
    });

    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("user_id") || 1;
        const response = await axios.get(
          `http://localhost:8000/api/user/${userId}`
        );
        const userData = response.data;

        console.log("User Data:", userData); // Debugging: Log the response

        user.value.name = userData.name;
        user.value.email = userData.email;
        user.value.avatar = userData.avatar || ""; // Set avatar
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Call fetchUserData when the component is mounted
    onMounted(() => {
      fetchUserData();
    });

    // Navigate to the Edit Profile page
    const editProfile = () => {
      router.push("/edit-profile");
    };

    // Navigate to the Profile page
    const goToProfile = () => {
      router.push("/profile");
    };

    const logout = () => {
      localStorage.removeItem("auth_token"); // Clear the token
      localStorage.removeItem("user_id"); // Clear the user ID
      router.push("/"); // Redirect to login
    };

    return {
      user,
      editProfile,
      goToProfile,
      logout,
    };
  },
};
</script>

<style></style>
