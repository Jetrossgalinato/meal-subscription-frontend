import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Forms/LoginForm.vue";
import Register from "../components/Forms/RegisterForm.vue";
import EditProfile from "../components/EditProfile.vue";
import Profile from "../components/Profile.vue";
import Main from "../components/Main.vue";
import AdminDashboard from "../components/AdminView/AdminDashboard.vue";
import MealPlan from "../components/MealPlan.vue";

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
    path: "/profile",
    name: "Profile",
    component: Profile,
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
    path: "/main",
    name: "Main",
    component: Main,
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
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("auth_token");
      const isAdmin = localStorage.getItem("is_admin") === "1"; // Check if the user is an admin
      if (token && isAdmin) {
        next(); // Allow access if authenticated and admin
      } else {
        next("/"); // Redirect non-admin users to the login page
      }
    },
  },
  {
    path: "/meal-plan",
    name: "MealPlan",
    component: MealPlan,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        next("/"); // Redirect to login if not authenticated
      } else {
        next(); // Allow access if authenticated
      }
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
