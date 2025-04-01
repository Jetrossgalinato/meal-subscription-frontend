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
            :prepend-avatar="user.avatar || ''"
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
          <v-list-item
            prepend-icon="mdi-folder"
            title="My Files"
            value="myfiles"
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
      fullName: "", // Will be fetched from the database
      email: "", // Will be fetched from the database
    });

    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        // Replace '1' with the actual user ID (e.g., from localStorage or a global state)
        const userId = localStorage.getItem("user_id") || 1;
        const response = await axios.get(
          `http://localhost:8000/api/user/${userId}`
        );
        const userData = response.data;

        user.value.name = userData.name;
        user.value.email = userData.email;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Call fetchUserData when the component is mounted
    onMounted(() => {
      fetchUserData();
    });

    const logout = () => {
      // Remove the authentication token from localStorage
      localStorage.removeItem("auth_token");

      // Redirect the user to the login page
      router.push("/");
    };

    return {
      user,
      logout,
    };
  },
};
</script>

<style></style>
