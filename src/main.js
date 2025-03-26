import { createApp } from "vue";
import { createVuetify } from "vuetify";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@mdi/font/css/materialdesignicons.css";
import "vue-toastification/dist/index.css";
import { Toast } from "vue-toastification";
import "./style.css";
import "vuetify/styles";
import App from "./App.vue";
import router from "./router";

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi", // Use MDI as the default icon set
  },
});

createApp(App).use(router).use(Toast).use(vuetify).mount("#app");
