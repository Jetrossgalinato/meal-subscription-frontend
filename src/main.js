import { createApp } from "vue";
import { createVuetify } from "vuetify";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@mdi/font/css/materialdesignicons.css";
import "./style.css";
import "vuetify/styles";
import App from "./App.vue";

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi", // Use MDI as the default icon set
  },
});

const App = createApp(App);
App.use(vuetify);
App.mount("#app");
