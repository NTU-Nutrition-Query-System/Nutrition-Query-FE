import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomePage.vue";
import Calculator from "@/views/Calculator.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/Calculator", name: "Calculator", component: Calculator },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0, left: 0 };
  }
});

export default router;
