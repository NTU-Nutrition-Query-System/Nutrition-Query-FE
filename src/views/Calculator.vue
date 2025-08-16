<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { onMounted, ref, computed } from "vue";
import Button from "primevue/button";
import OverlayBadge from "primevue/overlaybadge";
import { useToast } from "primevue/usetoast";

import { getTableData } from "@/apis/tableData";

import type { nutrient } from "@/interfaces/Calculator";
import { useProductStore } from "@/stores/productStore";
import DailyNeedsCalculator from "@/components/DailyNeedsCalculator.vue";
import FoodTable from "@/components/FoodTable.vue";
import CaloricResult from "@/components/CaloricResult.vue";

import { usePersonalInfoStore } from "@/stores/personInfoStore";
const personalInfoStore = usePersonalInfoStore();

import { library as faLibrary } from "@fortawesome/fontawesome-svg-core";
import {
  faSortDown,
  faCalendarDay,
  faBurger,
} from "@fortawesome/free-solid-svg-icons";
faLibrary.add(faSortDown, faCalendarDay, faBurger);

const { locale } = useI18n();
const toast = useToast();

const productStore = useProductStore();

const showCalculator = ref<boolean>(false);
const showResult = ref<boolean>(false);

const nutritionShow = () => {
  showCalculator.value = true;
};

const calculate = () => {
  showResult.value = true;
};

const foodTableLoaded = ref<boolean>(false);

const dailyNeeds = computed(() => {
  console.log("Daily needs:", productStore.dailyNeeds);
  if (productStore.dailyNeeds) {
    return productStore.dailyNeeds;
  }
  return {
    calories: 0,
    carbohydrate: 0,
    protein: 0,
    fat: 0,
  } as nutrient;
});

const loadTableData = async () => {
  foodTableLoaded.value = true;
  productStore.loadTableData(getTableData, locale.value);
};

const targetSection = ref<HTMLElement | null>(null);
const itemSelect = (e: any) => {
  console.log("Row clicked");
  console.log(e);
  const success = productStore.updateRow(e.data);
  if (success) {
    // Toast 提示
    toast.add({
      severity: "success",
      summary: "",
      detail: `${e?.data.item} is added`,
      life: 1000,
    });
  } else {
    toast.add({
      severity: "warn",
      summary: "",
      detail: `${e?.data.item} is removed`,
      life: 2000,
    });
  }
};

onMounted(() => {
  if (!personalInfoStore.checkCookieExists()) {
    showCalculator.value = true;
  } else {
    productStore.calculateDailyNeeds(personalInfoStore.personInfo);
  }
  loadTableData();
});
</script>

<template>
  <head>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>

  <!-- TODO: fix the margin  -->
  <Button
    class="nutrition-btn"
    icon="pi pi-calculator"
    style="
      position: fixed;
      bottom: 7rem;
      right: 1.2rem;
      z-index: 1000;
      margin-right: 1rem;
    "
    label="營養素"
    @click="nutritionShow"
  />
  <div ref="targetSection" v-if="foodTableLoaded">
    <!--
    A fixed positioned overlay badge component in the bottom-right corner of the screen
    with a circular shape.
    @property {string} value - Number displayed in the badge.
    -->
    <OverlayBadge
      v-if="productStore.selectedProducts.length > 0"
      class="overlaybadge-calc-btn"
      size="large"
      severity="danger"
      style="
        position: fixed;
        bottom: 1.2rem;
        right: 1.2rem;
        z-index: 1000;
        margin-right: 1rem;
      "
      :value="productStore.selectedProducts.length"
    >
      <Button
        class="calculator-btn"
        icon="pi pi-calculator"
        :label="$t('calculate')"
        @click="calculate"
      />
    </OverlayBadge>
    <section style="margin-top: 10rem">
      <!-- 計算機 -->
      <FoodTable />
    </section>
  </div>

  <DailyNeedsCalculator v-if="showCalculator" v-model:visible="showCalculator">
  </DailyNeedsCalculator>

  <CaloricResult
    v-if="showResult"
    v-model:visible="showResult"
    v-model:needData="dailyNeeds"
  ></CaloricResult>
</template>

<style>
.bg-yellow {
  background-image: url(../assets/images/bg-yellow.jpg);
  background-size: cover;
  background-repeat: no-repeat;
}

@media (max-width: 480px) {
  .bg-yellow {
    background-color: #f5c332;
    background-image: none;
  }
}

.text-yellow {
  background-color: #f5c332;
  padding: 2px 4px;
  margin: auto 2px;
  border-radius: 3px;
}

.calculator-description-title {
  text-align: center;
}

.calculator-description-content {
  text-align: center;
}

.calculator {
  max-width: 35rem;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: max-content;
  transition: background-color 0.3s ease;
  font-size: 18px;
}

.calculator.expanded {
  height: max-content;
}

.activity-radio-btn {
  flex: 1;
  display: flex;
  align-items: center;
  margin: 0 1rem;
}

.activity-tips {
  margin-left: 2.8rem;
  font-size: 16px;
}

.display-row {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.calculator .result {
  margin: 0 5rem;
  padding: 10px;
  color: black;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.calc-gender-select {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.calc-InputNum-label {
  min-width: 5rem;
  text-align: right;
}

.calc-InputNum-unit {
  min-width: 5rem;
  text-align: left;
}

.calc-InputNum {
  border-radius: 4px;
  border: 1px solid #ccc;
  transition: border-color 0.3s ease;
  margin: 0 0.5rem;
  height: 2.3rem;
  width: 7rem;
}

.calc-InputNum:focus {
  border-color: #3498db;
}

.calc-InputNum .p-inputtext {
  text-align: center;
  font-size: 20px;
  width: 5rem;
}

.nutrition-btn {
  display: flex;
  flex-direction: column;
  border-radius: 25px !important;
  height: 5rem;
  width: 5rem;
  border: none !important;
  color: #444444 !important;
  background-color: #f5c332 !important;
}

.nutrition-btn .p-button-icon {
  font-size: 2rem;
  margin-right: 0 !important;
  /* Remove default icon spacing */
  margin-bottom: -0.2rem;
  /* Space between icon and text */
}

.nutrition-btn:hover {
  transform: scale(1.05);
}

.overlaybadge-calc-btn:hover {
  transform: scale(1.05);
}

.calculator-btn {
  display: flex;
  flex-direction: column;
  border-radius: 25px !important;
  height: 5rem;
  width: 5rem;
  border: none !important;
  color: #444444 !important;
  background-color: #f5c332 !important;
}

.calculator-btn .p-button-icon {
  font-size: 2rem;
  margin-right: 0 !important;
  /* Remove default icon spacing */
  margin-bottom: -0.2rem;
  /* Space between icon and text */
}
</style>
