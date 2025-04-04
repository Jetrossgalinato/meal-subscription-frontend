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

          <!-- Plan Benefits -->
          <h2 class="mt-4">Benefits of the {{ plan }}</h2>
          <ul>
            <li v-for="benefit in benefits" :key="benefit">{{ benefit }}</li>
          </ul>

          <!-- Proceed to Payment Button -->
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

// Define benefits for each plan
const planBenefits = {
  "Basic Plan": [
    "5 meals per week",
    "Access to basic recipes",
    "Free delivery",
  ],
  "Premium Plan": [
    "10 meals per week",
    "Access to premium recipes",
    "Free delivery",
    "Priority delivery",
    "Exclusive discounts",
  ],
  "Family Plan": [
    "20 meals per week",
    "Family-sized portions",
    "Access to all recipes",
    "Free delivery",
    "Priority delivery",
    "Exclusive family discounts",
  ],
};

// Get the benefits for the selected plan
const benefits = planBenefits[plan] || ["No benefits available for this plan."];

// Handle payment
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

ul {
  list-style-type: disc;
  margin-left: 20px;
}

h2 {
  margin-top: 20px;
  color: #5d4037;
}
</style>
