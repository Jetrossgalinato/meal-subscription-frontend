<template>
  <v-layout>
    <!-- Sidebar Component -->
    <Sidebar />

    <!-- Main Content -->
    <v-main>
      <v-container>
        <h1>Your Cart</h1>
        <v-row>
          <v-col cols="12" md="6" v-for="item in cartItems" :key="item.id">
            <v-card class="mb-4" elevation="3">
              <v-img
                :src="item.image"
                alt="Meal Image"
                height="200px"
                cover
              ></v-img>
              <v-card-title>{{ item.name }}</v-card-title>
              <v-card-text>
                <p>{{ item.description }}</p>
                <p><strong>Price:</strong> ${{ item.price }}</p>

                <!-- Quantity Management -->
                <div class="quantity-controls">
                  <v-btn
                    icon
                    @click="decreaseQuantity(item)"
                    :disabled="item.quantity <= 1"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <span class="quantity">{{ item.quantity }}</span>
                  <v-btn icon @click="increaseQuantity(item)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>

                <!-- Total Price for the Item -->
                <p>
                  <strong>Total:</strong> ${{
                    (item.price * item.quantity).toFixed(2)
                  }}
                </p>
              </v-card-text>

              <!-- Delete Button -->
              <v-card-actions>
                <v-btn color="red" @click="removeFromCart(item)">
                  Remove
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Display Total Price for All Items -->
        <div v-if="cartItems.length" class="cart-total">
          <h2>Total Price: ${{ totalPrice.toFixed(2) }}</h2>
        </div>
        <div v-else>
          <p>Your cart is empty.</p>
        </div>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
import Sidebar from "../components/layouts/Sidebar.vue"; // Import the Sidebar component
import { ref, onMounted } from "vue";

const cartItems = ref([]);

// Fetch cart items from the backend
const fetchCartItems = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/cart", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`, // Include auth token
      },
    });

    cartItems.value = await response.json();
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
};

// Remove a meal from the cart
const removeFromCart = async (item) => {
  try {
    const response = await fetch(`http://localhost:8000/api/cart/${item.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`, // Include auth token
      },
    });

    if (response.ok) {
      cartItems.value = cartItems.value.filter(
        (cartItem) => cartItem.id !== item.id
      );
      alert(`${item.meal.name} has been removed from your cart.`);
    } else {
      alert("Failed to remove the meal from the cart.");
    }
  } catch (error) {
    console.error("Error removing meal from cart:", error);
  }
};

onMounted(() => {
  fetchCartItems();
});
</script>

<style scoped>
h1 {
  color: #d84315;
  margin-bottom: 20px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.quantity {
  font-weight: bold;
  font-size: 1.2rem;
}

.cart-total {
  margin-top: 20px;
  text-align: right;
  font-size: 1.5rem;
  font-weight: bold;
  color: #5d4037;
}
</style>
