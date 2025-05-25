import Home from "@/views/HomePage.vue";
import Calculator from "@/views/Calculator.vue";
import About from "@/views/About.vue";
import NutritionNote from "@/views/NutritionNote.vue";
import NotFound from "../views/NotFound.vue";

export const staticRoutes = [
    { path: "/", name: "Home", component: Home },
    { path: "/Calculator", name: "Calculator", component: Calculator },
    { path: "/About", name: "About", component: About },
    { path: "/NutritionNote", name: "NutritionNote", component: NutritionNote },
    { path: '/:pathMatch(.*)*', name: "NotFound", component: NotFound},
]
