import { createApp } from "vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

//mdi
import "@mdi/font/css/materialdesignicons.css";

import App from "./App.vue";
import router from "./router";
import { loadFonts } from "./plugins/webfontloader";

loadFonts();

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(router).use(vuetify).mount("#app");
