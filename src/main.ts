import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config"; // PrimeIcons styles
import Aura from "@primevue/themes/aura";
import { definePreset } from "@primevue/themes";
import router from "./router";
import i18n from "../locales/i18n"; // Import i18n configuration
import "./assets/base.css";
// Create the Vue app
const app = createApp(App);
const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{indigo.50}",
      100: "{indigo.100}",
      200: "{indigo.200}",
      300: "{indigo.300}",
      400: "{indigo.400}",
      500: "{indigo.500}",
      600: "{indigo.600}",
      700: "{indigo.700}",
      800: "{indigo.800}",
      900: "{indigo.900}",
      950: "{indigo.950}",
    },
  },
  colorScheme: {
    light: {
      formField: {
        hoverBorderColor: "{primary.color}",
      },
    },
    dark: {
      formField: {
        hoverBorderColor: "{primary.color}",
      },
    },
  },
});
// Use the PrimeVue plugin
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: ".my-app-dark",
    },
  },
});
app.use(router);
app.use(i18n);
// Mount the app to the #app element in the DOM
app.mount("#app");
