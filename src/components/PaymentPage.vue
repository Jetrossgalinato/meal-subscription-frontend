<template>
  <v-card>
    <v-layout>
      <!-- Sidebar Component -->
      <Sidebar />

      <!-- Main Content -->
      <v-main>
        <v-container>
          <h1>Payment for {{ plan }}</h1>
          <p>Price: ${{ price }}</p>
          <v-btn color="#D84315" class="mt-4" @click="handlePayment">
            Proceed to Payment
          </v-btn>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { useRoute } from "vue-router";
import Sidebar from "../components/layouts/Sidebar.vue"; // Import Sidebar component

const route = useRoute();
const plan = route.query.plan; // Get the plan name from query parameters
const price = route.query.price; // Get the price from query parameters

const handlePayment = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/pay-by-stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plan_name: plan, // Plan name (e.g., "Basic Plan")
        price: price, // Price in dollars (e.g., 19.99)
        success_url: "http://localhost:5173/payment-success", // Success redirect URL
        cancel_url: "http://localhost:5173/payment-cancel", // Cancel redirect URL
      }),
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url; // Redirect to Stripe Checkout
    } else {
      alert("Error creating payment session.");
    }
  } catch (error) {
    console.error("Payment error:", error);
    alert("Failed to process payment.");
  }
};
</script>

<style scoped>
/* Add some spacing for the main content */
v-main {
  padding: 20px;
}
</style>
