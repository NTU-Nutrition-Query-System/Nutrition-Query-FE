import Home from "@/views/HomePage.vue";
import Calculator from "@/views/Calculator.vue";
import About from "@/views/About.vue";
import NotFound from "../views/NotFound.vue";

export const staticRoutes = [
    { path: "/", name: "Home", component: Home },
    { path: "/Calculator", name: "Calculator", component: Calculator },
    { path: "/About", name: "About", component: About },
    { path: '/:pathMatch(.*)*', name: "NotFound", component: NotFound},
]
