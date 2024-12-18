import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config"; // PrimeIcons styles
import Aura from "@primevue/themes/aura";
import Material from "@primevue/themes/material";
import { definePreset } from "@primevue/themes";
import router from "./router";
import i18n from "../locales/i18n"; // Import i18n configuration
import "./assets/base.css";
import ToastService from "primevue/toastservice";
import "primeicons/primeicons.css";
// Create the Vue app
const app = createApp(App);
const MyPreset = definePreset(Material, {
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
      surface: "#ffffff", // 修改表格背景顏色（白色）
      "surface-ground": "#f5f5f5", // 修改表格底色
    },
    dark: {
      surface: "#1e1e1e", // 修改暗模式表格背景
      "surface-ground": "#252525",
    },
  },
});
// Use the PrimeVue plugin
app.use(ToastService); // 確保加載了 ToastService
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
