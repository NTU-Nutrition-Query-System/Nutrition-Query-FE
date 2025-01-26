<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { isMinusToken } from "typescript";
import Dropdown from "primevue/dropdown";
// import Menubar from "primevue/menubar";
import { useRouter } from "vue-router";

import Preloader from "@/components/common/Preloader.vue";
import NavBar from "@/components/common/NavBar.vue";

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
    label: "Home",
    icon: "pi pi-home",
    route: "/",
  },
  {
    label: "Calculator",
    icon: "pi pi-calculator",
    route: "/Calculator",
  },
]);
</script>
<template>
  <div class="sb-app">
    <!-- preloader -->
    <!-- <Preloader/> -->
    <!-- click effect -->
    <div class="sb-click-effect"></div>
    <!-- loader -->
    <div class="sb-load"></div>
    <NavBar :items="items" :languages="languages"/>

    <div class="MainPage">
      <!-- Sidebar Navigation -->
      <div class="content-area">
        <router-view />
      </div>
    </div>
  </div>
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
  padding: 20px;
  background-color: #ecf0f1;
  padding-top: 150px;
}
.MainPage {
  /* font-size: 2em; */
  font-weight: 400;
  display: flex;
}
</style>
