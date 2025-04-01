<template>
  <v-container>
    <v-card>
      <v-card-title>Edit Profile</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="user.name"
            label="Full Name"
            :rules="[rules.required]"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.email"
            label="Email"
            :rules="[rules.required, rules.email]"
            required
          ></v-text-field>
          <v-file-input
            v-model="user.avatar"
            label="Upload Avatar"
            accept="image/*"
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
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const valid = ref(false);
const form = ref(null);

// User data
const user = reactive({
  name: "",
  email: "",
  avatar: null, // File input for avatar
});

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
