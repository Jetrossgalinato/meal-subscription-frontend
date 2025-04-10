<template>
  <v-card>
    <v-layout>
      <!-- Sidebar Component -->
      <Sidebar />

      <!-- Main Content -->
      <v-main>
        <v-container>
          <h1>Your Cart</h1>

          <v-row dense>
            <v-col
              cols="12"
              sm="6"
              md="4"
              lg="3"
              v-for="item in cartItems"
              :key="item.id"
            >
              <v-card class="mb-2" elevation="2" dense>
                <v-img
                  :src="item.meal.image_url"
                  alt="Meal Image"
                  height="140px"
                  cover
                ></v-img>

                <v-card-title class="text-subtitle-1 py-2">{{
                  item.meal.name
                }}</v-card-title>
                <v-card-text class="py-1">
                  <p class="text-body-2">{{ item.meal.description }}</p>
                  <p class="text-body-2 mb-1">
                    <strong>Price:</strong> ${{ item.meal.price.toFixed(2) }}
                  </p>

                  <!-- Quantity Management - Compact Version -->
                  <div class="quantity-controls-compact">
                    <v-btn
                      density="compact"
                      icon
                      size="small"
                      @click="decreaseQuantity(item)"
                      :disabled="item.quantity <= 1"
                    >
                      <v-icon size="small">mdi-minus</v-icon>
                    </v-btn>
                    <span class="quantity-compact">{{ item.quantity }}</span>
                    <v-btn
                      density="compact"
                      icon
                      size="small"
                      @click="increaseQuantity(item)"
                    >
                      <v-icon size="small">mdi-plus</v-icon>
                    </v-btn>
                  </div>

                  <!-- Total Price for the Item -->
                  <p class="text-body-2 mt-1">
                    <strong>Total:</strong> ${{
                      (item.meal.price * item.quantity).toFixed(2)
                    }}
                  </p>
                </v-card-text>

                <!-- Delete Button -->
                <v-card-actions class="py-1">
                  <v-btn
                    color="red"
                    size="small"
                    density="compact"
                    variant="text"
                    @click="removeFromCart(item)"
                  >
                    Remove
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <v-divider></v-divider>
          <row>
            <v-col cols="12" sm="6" md="4" lg="3" class="mt-2">
              <h2 style="padding-bottom: 5px">
                <v-icon left size="25">mdi-map-marker-outline</v-icon>
                Delivery address
              </h2>
              <div id="map" style="height: 300px; width: 100%"></div>
              <p style="font-weight: 350; padding-top: 5%; padding-bottom: 5%">
                {{ deliveryAddress }}
              </p>
              <v-text-field
                v-model="firstName"
                :rules="rules"
                label="Delivery instructions"
                placeholder="Note to rider - e.g. landmark"
              ></v-text-field>
            </v-col>
          </row>
          <v-divider></v-divider>
          <!-- Order Summary -->
          <v-row>
            <v-col cols="12" class="mt-2">
              <h2 style="padding-bottom: 5px">
                <v-icon left size="25">mdi-list-box-outline</v-icon>
                Order Summary
              </h2>
              <div v-for="item in cartItems" :key="item.id">
                <p style="font-weight: 300">
                  {{ item.quantity }}x {{ item.meal.name }}
                  <span style="font-weight: 400; margin-left: 10px">
                    ${{ item.meal.price.toFixed(2) }}
                  </span>
                </p>
              </div>
              <br />
              <p>
                <strong>Subtotal:</strong>
                ${{ subtotal.toFixed(2) }}
              </p>
              <p>
                <strong>Delivery Fee:</strong> ${{ deliveryFee.toFixed(2) }}
              </p>
            </v-col>
          </v-row>

          <!-- Display Total Price for All Items - Moved to the left -->
          <div v-if="cartItems.length" class="cart-total cart-total-left">
            <h2>Total Price: ${{ totalPrice.toFixed(2) }}</h2>
            <!-- Display total price -->
          </div>
          <div v-else>
            <p>Your cart is empty.</p>
          </div>

          <!-- Checkout Button -->
          <v-btn
            color="green"
            class="mt-2"
            @click="checkout"
            :disabled="!cartItems.length"
          >
            Proceed to Checkout
          </v-btn>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import Sidebar from "../components/layouts/Sidebar.vue";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const cartItems = ref([]);
const router = useRouter();

// Total price of all cart items
const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + item.meal.price * item.quantity;
  }, 0);
});

const deliveryFee = 5.0; // Define the delivery fee

const totalPrice = computed(() => {
  return subtotal.value + deliveryFee; // Add delivery fee to subtotal
});
// Fetch cart items from the backend
const fetchCartItems = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/cart", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });

    const data = await response.json();

    // Ensure all items have a quantity of 1 and price is a valid number
    cartItems.value = data.map((item) => ({
      ...item,
      meal: {
        ...item.meal,
        image_url: item.meal.image_url || "default-image-path.jpg",
        price: parseFloat(item.meal.price) || 0,
      },
      quantity: 1,
    }));
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
};

// Increase quantity
const increaseQuantity = (item) => {
  item.quantity += 1;
};

// Decrease quantity
const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity -= 1;
  }
};

// Remove a meal from the cart
const removeFromCart = async (item) => {
  try {
    const response = await fetch(`http://localhost:8000/api/cart/${item.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
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

// Checkout Handler (no location)
const checkout = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
      body: JSON.stringify({
        items: cartItems.value.map((item) => ({
          meal_id: item.meal.id,
          quantity: item.quantity,
        })),
        location: deliveryAddress.value, // Include the delivery address
        delivery_fee: deliveryFee, // Include the delivery fee
      }),
    });

    const data = await response.json();

    if (data.checkout_url) {
      window.location.href = data.checkout_url;
    } else {
      alert("Failed to redirect to payment.");
    }
  } catch (error) {
    console.error("Checkout error:", error);
    alert("Checkout failed.");
  }
};

// move this up to top-level scope
const deliveryAddress = ref("Locating...");

onMounted(() => {
  fetchCartItems();

  const map = L.map("map").setView([8.955316, 125.597942], 13);

  const fetchAddress = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await response.json();
      deliveryAddress.value = data.display_name || "Address not found";
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
      deliveryAddress.value = "Failed to get address.";
    }
  };

  // Create the marker
  const marker = L.marker([8.955316, 125.597942]).addTo(map);
  marker.bindPopup("Your Delivery Location").openPopup();

  // Add tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  // Fetch address initially
  fetchAddress(8.955316, 125.597942);

  // Update marker + address on click
  map.on("click", function (e) {
    const { lat, lng } = e.latlng;
    marker.setLatLng([lat, lng]);
    marker.bindPopup("New delivery location").openPopup();
    fetchAddress(lat, lng);
  });
});
</script>

<style scoped>
h1 {
  color: #d84315;
  margin-bottom: 20px;
}

.quantity-controls-compact {
  display: flex;
  align-items: center;
  margin: 5px 0;
}

.quantity-compact {
  margin: 0 8px;
  font-size: 14px;
}

.cart-total {
  margin: 15px 0;
}

.cart-total-left {
  text-align: left;
}
</style>
