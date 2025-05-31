import Home from "@/views/HomePage.vue";
import Calculator from "@/views/Calculator.vue";
import About from "@/views/About.vue";
import NutritionNote from "@/views/NutritionNote.vue";
import NotFound from "../views/NotFound.vue";
import MealHistory from "@/views/MealHistory.vue";

export const staticRoutes = [
    { path: "/", name: "Home", component: Home },
    { path: "/Calculator", name: "Calculator", component: Calculator },
    { path: "/About", name: "About", component: About },
    { path: "/NutritionNote", name: "NutritionNote", component: NutritionNote },
    { path: "/MealHistory", name: "MealHistory", component: MealHistory },
    { path: '/:pathMatch(.*)*', name: "NotFound", component: NotFound},
]
