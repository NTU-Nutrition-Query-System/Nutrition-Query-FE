import { createRouter, createWebHistory } from "vue-router";
import FoodTable from "../components/FoodTable.vue";
import Calculator from "../components/Calculator.vue";
import ContactPage from "../components/CaloricResult.vue";
import Home from "../components/HomePage.vue";

const routes = [
  // { path: '/', name: 'Home', component: HomePage },
  { path: "/Calculator", name: "Calculator", component: Calculator },
  { path: "/Home", name: "Home", component: Home },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
