import { reactive } from "vue";

export const cartStore = reactive({
  items: [],

  // Add a meal to the cart
  addToCart(meal) {
    const existingItem = this.items.find((item) => item.id === meal.id);
    if (existingItem) {
      alert(`${meal.name} is already in your cart!`);
    } else {
      this.items.push(meal);
      alert(`${meal.name} has been added to your cart!`);
    }
  },

  // Get all cart items
  getCartItems() {
    return this.items;
  },
});
