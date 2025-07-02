<script setup lang="ts">
import { ref } from "vue";
import { onMounted, onUnmounted } from "vue";

import NavBar from "@/components/common/NavBar.vue";
import Footer from "@/components/common/Footer.vue";

const languages = [
  { label: "中文", value: "zh" },
  { label: "English", value: "en" },
];
const items = ref([
  {
    label: "home",
    route: "/",
  },
  {
    label: "calculator",
    route: "/Calculator",
  },
  {
    label: "nutrition_note",
    route: "/NutritionNote",
  },
  {
    label: "about",
    route: "/About",
  },
]);

const cursor = ref<HTMLDivElement | null>(null);

const handleMouseMove = (e: MouseEvent) => {
  if (cursor.value) {
    cursor.value.style.top = `${e.pageY - 15}px`;
    cursor.value.style.left = `${e.pageX - 15}px`;
  }
};

const handleClick = () => {
  if (cursor.value) {
    cursor.value.classList.add("sb-click");
    setTimeout(() => {
      cursor.value?.classList.remove("sb-click");
    }, 600);
  }
};

onMounted(() => {
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("click", handleClick);
});

onUnmounted(() => {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("click", handleClick);
});
</script>

<template>
  <div class="sb-app">
    <!-- click effect -->
    <div class="sb-click-effect" ref="cursor"></div>
    <!-- loader -->
    <div class="sb-load"></div>
    <NavBar :items="items" :languages="languages" />

    <div class="MainPage">
      <!-- Sidebar Navigation -->
      <div class="content-area">
        <router-view />
      </div>
    </div>
  </div>
  <!-- footer -->
  <Footer />
    <!-- footer end -->
</template>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
}

.content-area {
  flex-grow: 1;
  /* padding: 20px; */
  /* background-color: #ecf0f1; */
  /* padding-top: 150px; */
}
.MainPage {
  /* font-size: 2em; */
  font-weight: 400;
  display: flex;
}
</style>
