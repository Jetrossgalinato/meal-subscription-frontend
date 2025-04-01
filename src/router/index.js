import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Forms/LoginForm.vue";
import Register from "../components/Forms/RegisterForm.vue";
import EditProfile from "../components/EditProfile.vue";
import Profile from "../components/Profile.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        next("/home"); // Redirect to home if the user is already logged in
      } else {
        next(); // Allow access to the login page
      }
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        next("/"); // Redirect to login if not authenticated
      } else {
        next(); // Allow access if authenticated
      }
    },
  },
  {
    path: "/edit-profile",
    name: "EditProfile",
    component: EditProfile,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
