<script setup lang="ts">
import { ref } from "vue";
import Calculator from "./components/Calculator.vue";
import Result from "./components/CaloricResult.vue";
import Table from "./components/FoodTable.vue";
import Home from "./components/HelloWorld.vue";
import { useI18n } from "vue-i18n";
import { isMinusToken } from "typescript";
import Dropdown from "primevue/dropdown";
import Menubar from "primevue/menubar";
import { useRouter } from "vue-router";

const router = useRouter();
const { locale } = useI18n();
const calculationResult = ref(10);
const currentLocale = ref(locale.value);

const handleCalculation = (result: number) => {
  calculationResult.value = result;
  console.log(result);
};
const changeLocale = () => {
  locale.value = currentLocale.value;
};
const languages = [
  { label: "中文", value: "ch" },
  { label: "English", value: "en" },
];
const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
    route: "/Home",
  },
  {
    label: "Calculator",
    icon: "pi pi-calculator",
    route: "/Calculator",
  },
]);
</script>
<template>
  <head>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <div>
    <Menubar :model="items">
      <template #item="{ item, props, hasSubmenu }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon"></span>
            <span>{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple v-bind="props.action">
          <span :class="item.icon"></span>
          <span>{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
        </a>
      </template>
    </Menubar>

    <div class="MainPage">
      <div class="language-selector">
        <label for="language-select">{{ $t("select_language") }}</label>
        <Dropdown
          id="language-select"
          :options="languages"
          optionLabel="label"
          optionValue="value"
          v-model="currentLocale"
          @change="changeLocale"
          placeholder="Select Language"
          class="p-dropdown-sm"
        />
      </div>
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
}
.MainPage {
  /* font-size: 2em; */
  font-weight: 400;
  display: flex;
}

.language-selector {
  position: absolute;
  top: 10px;
  right: 20px; /* 距离右边的距离 */
  display: flex;
  align-items: center;
}
</style>
