<template>
  <v-card>
    <v-layout>
      <!-- Sidebar Component -->
      <Sidebar />

      <!-- Main Content -->
      <v-main>
        <v-container>
          <h1 class="text-center font-weight-bold my-4">
            Choose Your Meal Plan
          </h1>

          <!-- Meal Plan Cards -->
          <v-row>
            <!-- Basic Plan -->
            <v-col cols="12" md="4">
              <v-card class="pa-4 text-center plan-card">
                <h2>Basic Plan</h2>
                <p class="font-weight-bold">$19.99 / month</p>
                <v-divider></v-divider>
                <ul class="text-left">
                  <li>5 meals per week</li>
                  <li>Access to basic recipes</li>
                  <li>Free delivery</li>
                </ul>
                <v-btn color="primary" class="mt-auto">Subscribe</v-btn>
              </v-card>
            </v-col>

            <!-- Premium Plan -->
            <v-col cols="12" md="4">
              <v-card class="pa-4 text-center plan-card">
                <h2>Premium Plan</h2>
                <p class="font-weight-bold">$39.99 / month</p>
                <v-divider></v-divider>
                <ul class="text-left">
                  <li>10 meals per week</li>
                  <li>Access to premium recipes</li>
                  <li>Free delivery</li>
                  <li>Priority delivery</li>
                  <li>Exclusive discounts</li>
                </ul>
                <v-btn color="primary" class="mt-auto">Subscribe</v-btn>
              </v-card>
            </v-col>

            <!-- Family Plan -->
            <v-col cols="12" md="4">
              <v-card class="pa-4 text-center plan-card">
                <h2>Family Plan</h2>
                <p class="font-weight-bold">$59.99 / month</p>
                <v-divider></v-divider>
                <ul class="text-left">
                  <li>20 meals per week</li>
                  <li>Family-sized portions</li>
                  <li>Access to all recipes</li>
                  <li>Free delivery</li>
                  <li>Priority delivery</li>
                  <li>Exclusive family discounts</li>
                </ul>
                <v-btn color="primary" class="mt-auto">Subscribe</v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import Sidebar from "../components/layouts/Sidebar.vue"; // Import Sidebar component
</script>

<style scoped>
h1 {
  color: #1976d2;
}

.v-card {
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin: 5px 0;
}

/* Ensure all cards are the same size */
.plan-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 350px; /* Set a fixed height for all cards */
}
</style>
