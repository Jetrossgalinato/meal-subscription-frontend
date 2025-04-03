<template>
  <v-card class="bg-custom">
    <v-layout>
      <!-- Sidebar Component -->
      <Sidebar />

      <!-- Main Content -->
      <v-main>
        <v-container>
          <h1 class="text-center font-weight-bold my-4 title-text">
            Choose Your Meal Plan
          </h1>

          <!-- Meal Plan Cards -->
          <v-row>
            <!-- Basic Plan -->
            <v-col cols="12" md="4">
              <v-card
                class="pa-4 text-center plan-card card-border text-custom"
              >
                <h2>Basic Plan</h2>
                <p class="font-weight-bold">$19.99 / month</p>
                <v-divider></v-divider>
                <ul class="text-left">
                  <li>5 meals per week</li>
                  <li>Access to basic recipes</li>
                  <li>Free delivery</li>
                </ul>
                <v-btn color="#D84315" class="mt-auto">Subscribe</v-btn>
              </v-card>
            </v-col>

            <!-- Premium Plan -->
            <v-col cols="12" md="4">
              <v-card
                class="pa-4 text-center plan-card card-border text-custom"
              >
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
                <v-btn color="#D84315" class="mt-auto">Subscribe</v-btn>
              </v-card>
            </v-col>

            <!-- Family Plan -->
            <v-col cols="12" md="4">
              <v-card
                class="pa-4 text-center plan-card card-border text-custom"
              >
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
                <v-btn color="#D84315" class="mt-auto">Subscribe</v-btn>
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
.bg-custom {
  background-color: #fff8e1;
}

.title-text {
  color: #d84315;
}

.text-custom {
  color: #5d4037;
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

/* Add border color to cards */
.card-border {
  border: 2px solid #8d6e63; /* Add border with the specified color */
  border-radius: 8px; /* Optional: Add rounded corners */
}
</style>
