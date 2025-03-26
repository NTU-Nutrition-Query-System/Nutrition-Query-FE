<script setup lang="ts">
import { ref } from "vue";
import { onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { isMinusToken } from "typescript";
import Dropdown from "primevue/dropdown";
// import Menubar from "primevue/menubar";
import { useRouter } from "vue-router";

import Preloader from "@/components/common/Preloader.vue";
import NavBar from "@/components/common/NavBar.vue";
import Footer from "@/components/common/Footer.vue";
import vue3GoogleLogin from "vue3-google-login";

const router = useRouter();
// const { locale } = useI18n();
const calculationResult = ref(10);
// const currentLocale = ref(locale.value);

const handleCalculation = (result: number) => {
  calculationResult.value = result;
  console.log(result);
};
// const changeLocale = () => {
//   locale.value = currentLocale.value;
// };
const languages = [
  { label: "中文", value: "ch" },
  { label: "English", value: "en" },
];
const items = ref([
  {
    label: "home",
    icon: "pi pi-home",
    route: "/",
  },
  {
    label: "calculator",
    icon: "pi pi-calculator",
    route: "/Calculator",
  },
  {
    label: "about",
    icon: "pi pi-about",
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
    <!-- preloader -->
    <!-- <Preloader/> -->
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
