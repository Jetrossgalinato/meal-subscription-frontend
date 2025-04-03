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

          <!-- Home Section -->
          <v-list-item
            prepend-icon="mdi-home"
            title="Home"
            @click="goToHome"
          ></v-list-item>

          <!-- Admin Dashboard Section (Visible only for admins) -->
          <v-list-item
            v-if="isAdmin"
            prepend-icon="mdi-view-dashboard"
            title="Dashboard"
            @click="goToDashboard"
          ></v-list-item>

          <!-- Logout Section -->
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
      isAdmin: false, // Track if the user is an admin
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

    // Check if the user is an admin
    const isAdmin = ref(localStorage.getItem("is_admin") === "1");

    // Navigate to the Edit Profile page
    const editProfile = () => {
      router.push("/edit-profile");
    };

    // Navigate to the Profile page
    const goToProfile = () => {
      router.push("/profile");
    };

    // Navigate to the Home page
    const goToHome = () => {
      router.push("/home");
    };

    // Navigate to the Admin Dashboard
    const goToDashboard = () => {
      router.push("/admin/dashboard");
    };

    const logout = () => {
      localStorage.removeItem("auth_token"); // Clear the token
      localStorage.removeItem("user_id"); // Clear the user ID
      localStorage.removeItem("is_admin"); // Clear the admin status
      router.push("/"); // Redirect to login
    };

    // Call fetchUserData when the component is mounted
    onMounted(() => {
      fetchUserData();
    });

    return {
      user,
      isAdmin,
      editProfile,
      goToProfile,
      goToHome,
      goToDashboard,
      logout,
    };
  },
};
</script>

<style></style>
