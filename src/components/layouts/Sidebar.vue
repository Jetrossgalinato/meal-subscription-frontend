<template>
  <v-card class="sidebar-background">
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list>
          <v-list-item
            :prepend-avatar="user.avatar || 'https://placehold.co/400'"
            :title="user.name"
            :subtitle="user.email"
            class="sidebar-text"
          >
            <div v-if="!rail">
              <span
                style="cursor: pointer; font-size: 0.875rem"
                class="edit-profile-link"
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
            class="sidebar-text"
            @click="goToProfile"
          ></v-list-item>

          <!-- Home Section -->
          <v-list-item
            prepend-icon="mdi-home"
            title="Home"
            class="sidebar-text"
            @click="goToHome"
          ></v-list-item>

          <!-- Cart Section -->
          <v-list-item
            prepend-icon="mdi-cart"
            title="Cart"
            class="sidebar-text"
            @click="goToCart"
          ></v-list-item>

          <!-- Admin Dashboard Section (Visible only for admins) -->
          <v-list-item
            v-if="isAdmin"
            prepend-icon="mdi-view-dashboard"
            title="Dashboard"
            class="sidebar-text"
            @click="goToDashboard"
          ></v-list-item>

          <!-- Logout Section -->
          <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            class="sidebar-text"
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
    const isAdmin = ref(localStorage.getItem("is_admin"));

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

    // Navigate to the Cart page
    const goToCart = () => {
      router.push("/cart");
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
      goToCart,
      goToDashboard,
      logout,
    };
  },
};
</script>

<style scoped>
/* Sidebar Text and Icons */
.sidebar-text {
  color: #5d4037 !important; /* Deep Brown */
}

/* Edit Profile Link */
.edit-profile-link {
  color: #5d4037; /* Deep Brown */
}

/* Active Menu Item */
.v-list-item--active {
  background-color: #d84315 !important; /* Burnt Orange */
  color: #fff !important; /* White text for active item */
}
</style>
