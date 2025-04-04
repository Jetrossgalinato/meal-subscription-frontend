<template>
  <v-container>
    <h1>Payment for {{ plan }}</h1>
    <p>Price: ${{ price }}</p>
    <!-- Add your payment form or logic here -->
  </v-container>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const plan = route.query.plan; // Get the plan name from query parameters
const price = route.query.price; // Get the price from query parameters
</script>
