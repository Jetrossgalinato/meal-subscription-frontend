<template>
  <v-card>
    <v-layout>
      <!-- Sidebar Component -->
      <Sidebar />

      <!-- Main Content -->
      <v-main>
        <v-card>
          <v-card-title>Edit Profile</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <!-- Full Name -->
              <v-text-field
                v-model="user.name"
                label="Full Name"
                :rules="[rules.required]"
                required
              ></v-text-field>

              <!-- Email -->
              <v-text-field
                v-model="user.email"
                label="Email"
                :rules="[rules.required, rules.email]"
                required
              ></v-text-field>

              <!-- Dietary Preferences -->
              <v-textarea
                v-model="user.dietary_preferences"
                label="Dietary Preferences"
                :rules="[rules.required]"
                rows="3"
                outlined
              ></v-textarea>

              <!-- Allergies -->
              <v-textarea
                v-model="user.allergies"
                label="Allergies"
                :rules="[rules.required]"
                rows="3"
                outlined
              ></v-textarea>

              <!-- Delivery Address -->
              <v-text-field
                v-model="user.delivery_address"
                label="Delivery Address"
                :rules="[rules.required]"
                required
              ></v-text-field>

              <!-- Avatar Preview -->
              <v-img
                v-if="preview"
                :src="preview"
                max-height="150"
                max-width="150"
                class="mb-4"
              ></v-img>

              <!-- File Input for Avatar -->
              <v-file-input
                v-model="user.avatar"
                label="Upload Avatar"
                accept="image/*"
                @change="previewAvatar"
              ></v-file-input>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="updateProfile" :disabled="!valid">
              Save Changes
            </v-btn>
            <v-btn color="secondary" @click="cancelEdit">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Sidebar from "../components/layouts/Sidebar.vue"; // Import Sidebar component

const router = useRouter();
const valid = ref(false);
const form = ref(null);

// User data
const user = reactive({
  name: "",
  email: "",
  dietary_preferences: "",
  allergies: "",
  delivery_address: "",
  avatar: null, // File input for avatar
});

// Preview for the avatar
const preview = ref("");

// Validation rules
const rules = {
  required: (value) => !!value || "This field is required.",
  email: (value) => /.+@.+\..+/.test(value) || "E-mail must be valid.",
};

// Fetch user data when the component is mounted
const fetchUserData = async () => {
  try {
    const userId = localStorage.getItem("user_id");
    const response = await axios.get(
      `http://localhost:8000/api/user/${userId}`
    );
    const userData = response.data;
    user.name = userData.name;
    user.email = userData.email;
    user.dietary_preferences = userData.dietary_preferences || "";
    user.allergies = userData.allergies || "";
    user.delivery_address = userData.delivery_address || "";
    preview.value = userData.avatar; // Set the initial avatar preview
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

// Update user profile
const updateProfile = async () => {
  try {
    const userId = localStorage.getItem("user_id");
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("dietary_preferences", user.dietary_preferences);
    formData.append("allergies", user.allergies);
    formData.append("delivery_address", user.delivery_address);
    if (user.avatar) {
      formData.append("avatar", user.avatar);
    }

    await axios.post(
      `http://localhost:8000/api/user/${userId}/update`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Profile updated successfully!");
    router.push("/home"); // Redirect to home after saving
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Failed to update profile.");
  }
};

// Cancel editing and go back
const cancelEdit = () => {
  router.push("/home");
};

// Preview the selected avatar
const previewAvatar = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.value = e.target.result; // Set the preview to the file's data URL
    };
    reader.readAsDataURL(file);
  }
};

onMounted(() => {
  fetchUserData();
});
</script>

<style scoped>
.v-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
