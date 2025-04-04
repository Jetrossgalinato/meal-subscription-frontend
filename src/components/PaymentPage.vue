<template>
  <v-layout>
    <!-- Sidebar Component (Separate) -->
    <Sidebar />

    <!-- Main Content Centered in a Card -->
    <v-container class="d-flex justify-center align-center fill-height">
      <v-card class="pa-6" max-width="600" elevation="8">
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
      </v-card>
    </v-container>
  </v-layout>
</template>

<script setup>
import { useRoute } from "vue-router";
import Sidebar from "../components/layouts/Sidebar.vue";

const route = useRoute();
const plan = route.query.plan;
const price = route.query.price;

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

const benefits = planBenefits[plan] || ["No benefits available for this plan."];

const handlePayment = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/pay-by-stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plan_name: plan,
        price: price,
        success_url: "http://localhost:5173/payment-success",
        cancel_url: "http://localhost:5173/payment-cancel",
      }),
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
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
.v-container {
  height: 60vh;
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
