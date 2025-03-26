import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/layouts/Header.vue";
const router = new createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
  ],
});

export default router;
