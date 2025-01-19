<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { onMounted, ref, watch } from "vue";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import InputGroup from "primevue/inputgroup";
import FloatLabel from "primevue/floatlabel";
import RadioButton from "primevue/radiobutton";
import OverlayBadge from "primevue/overlaybadge";
import FoodTable from "./FoodTable.vue";
import CaloricResult from "./CaloricResult.vue";
import type { nutrient } from "../interfaces/Calculator";
import type { foodItem } from "@/interfaces/Calculator";
import { getTableData } from "@/apis/tableData";
// Declare reactive variables using `ref`
const content = ref<HTMLElement | null>(null);
const age = ref<number>(0);
const height = ref<number>(0);
const weight = ref<number>(0);
const activityFactor = ref<string>("1.3");
const gender = ref("Male");
const isExpanded = ref<boolean>(false);
const showResult = ref<boolean>(false);
const dailyNeeds = ref<nutrient>({
  calories: 0,
  protein: 0,
  carbohydrate: 0,
  fat: 0,
});

const calculateDailyNeed = () => {
  if (gender.value === "Male") {
    dailyNeeds.value.calories =
      (66 + 13.7 * weight.value + 5 * height.value - 6.8 * age.value) *
      parseFloat(activityFactor.value);
  } else {
    dailyNeeds.value.calories =
      (665 + 9.6 * weight.value + 1.8 * height.value - 4.7 * age.value) *
      parseFloat(activityFactor.value);
  }

  dailyNeeds.value.protein = weight.value * 1;

  dailyNeeds.value.carbohydrate = (dailyNeeds.value.calories * 0.5) / 4;

  dailyNeeds.value.fat = (dailyNeeds.value.calories * 0.3) / 9;
};

const calculate = () => {
  showResult.value = true;
  console.log(selectedProduct.value);
};

const nextOnClicked = () => {
  isExpanded.value = true;
  calculateDailyNeed();
};
const selectedProduct = ref([]);
const targetSection = ref<HTMLElement | null>(null);
const titleIconURL = new URL(
  "@/assets/imgs/user-interface-1-5.svg",
  import.meta.url
).href;
const { locale } = useI18n();
const cartUpdate = (newValue: []) => {
  console.log("Cart Update");

  selectedProduct.value = newValue;
  console.log(newValue);
  console.log(selectedProduct.value);
};
const products = ref<foodItem[]>([]);
const foodTableLoaded = ref<boolean>(false);
const foodTableDisplay = ref<boolean>(false);
const calculatorDisplay = ref<boolean>(false);
const loadTableData = async () => {
  const res = await getTableData();
  products.value = res;
  foodTableLoaded.value = true;
};
const scrollDown = () => {
  foodTableDisplay.value = true;
  calculatorDisplay.value = true;
  targetSection.value?.scrollIntoView({ behavior: "smooth" });
};
watch(selectedProduct, (newValue) => {
  console.log("selected product updated!");
  console.log(newValue);
});
onMounted(() => {
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
  <div class="calculator" :class="{ expanded: isExpanded }" style="margin-top: 0.5rem">
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; text-align: center;">
        {{ $t("calculator_input.title") }}
    </div>
    <div class="gender-selection" style="margin-top: 1rem; display: flex; align-items: center; justify-content: center;">
      <RadioButton v-model="gender" value="Male" style="margin-left: 1rem" />
      <label style="margin-left: 0.3rem">{{ $t("calculator_input.gender.male") }}</label>
      <RadioButton v-model="gender" value="Female" style="margin-left: 1rem" />
      <label style="margin-left: 0.3rem">{{ $t("calculator_input.gender.female") }}</label>
    </div>
    
    <InputGroup style="margin-top: 0.5rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <label style="text-align: right; width: 6rem;">{{ $t("calculator_input.age") }} :</label>
        <InputNumber v-model="age" class="input-field" style="width: 5rem; margin: 0 0.5rem;"/>
        <label style="text-align: left; width: 6rem;">{{ $t("calculator_input.years_old") }}</label>
      </div>
    </InputGroup>

    <InputGroup style="margin-top: 0.5rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <label style="text-align: right; width: 6rem;">{{ $t("calculator_input.height") }} :</label>
        <InputNumber v-model="height" class="input-field" style="width: 5rem; margin: 0 0.5rem;"/>
        <label style="text-align: left; width: 6rem;">{{ $t("calculator_input.centimeter") }}</label>
      </div>
    </InputGroup>

    <InputGroup style="margin-top: 0.5rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <label style="text-align: right; width: 6rem;">{{ $t("calculator_input.weight") }} :</label>
        <InputNumber v-model="weight" class="input-field" style="width: 5rem; margin: 0 0.5rem;"/>
        <label style="text-align: left; width: 6rem;">{{ $t("calculator_input.kilogram") }}</label>
      </div>
    </InputGroup>

    <div style="margin-top: 0.5rem">
      <label style="font-weight: bold; display: block; margin-bottom: 0.5rem">{{
        $t("calculator_input_activity_factor.title")
      }}</label>
      <div style="margin-top: 0.5rem; justify-content: space-between; align-items: center;">
        <div class="RadioButton" style="display: flex; align-items: flex-start">
          <RadioButton v-model="activityFactor" value="1.3" />
          <label style="margin-left: 0.3rem">
            {{ $t("calculator_input_activity_factor.mild") }}
            <div style="font-size: 14px">
              {{ $t("calculator_input_activity_factor.tips.mild") }}
            </div>
          </label>
        </div>
        <div class="RadioButton" style="margin-top: 0.5rem; display: flex; align-items: flex-start">
          <RadioButton v-model="activityFactor" value="1.5" />
          <label style="margin-left: 0.3rem">
            {{ $t("calculator_input_activity_factor.moderate") }}
            <div style="font-size: 14px">
              {{ $t("calculator_input_activity_factor.tips.moderate") }}
            </div>
          </label>
        </div>
        <div class="RadioButton" style="margin-top: 0.5rem; display: flex; align-items: flex-start">
          <RadioButton v-model="activityFactor" value="2" />
          <label style="margin-left: 0.3rem">
            {{ $t("calculator_input_activity_factor.severe") }}
            <div style="font-size: 14px">
              {{ $t("calculator_input_activity_factor.tips.severe") }}
            </div>
          </label>
        </div>
      </div>

      <div style=" display: flex; justify-content: center; gap: 1rem; margin-top: 1rem;">
        <Button class="tab" :label="$t('計算我的營養需求！')" @click="nextOnClicked" />
      </div>
    </div>

    <div class="calculator_result" v-if="isExpanded">
      <h3>{{ $t("calculator_result_daily_title") }}</h3>

      <div class="display-row" v-for="(value, key) in dailyNeeds" :key="key">
        <label>{{ $t(key) }}:</label>
        <span
          >{{ value.toFixed(2) }} ({{
            key === "calories" ? "kcal" : "g"
          }})</span
        >
      </div>
      <h3>{{ $t("calculator_result_meal_title") }}</h3>

      <div class="display-row" v-for="(value, key) in dailyNeeds" :key="key">
        <label>{{ $t(key) }}:</label>
        <span
          >{{ (value / 3.0).toFixed(2) }} ({{
            key === "calories" ? "kcal" : "g"
          }})</span
        >
      </div>
      <Button class="tab" :label="$t('開始選取食物！')" @click="scrollDown" />
      <div style="font-size: 14px; margin-top: 0.3rem">
        請往下滑
      </div>
    </div>
  </div>
  <!--
  A fixed positioned overlay badge component in the bottom-right corner of the screen
  with a circular shape.
  @property {string} value - Number displayed in the badge.
  -->
  <OverlayBadge
    class="overlaybadge-calc-btn"
    style="
      position: fixed;
      bottom: 1.2rem;
      right: 1.2rem;
      z-index: 1000;
      margin-right: 1rem;
    "
    :value="selectedProduct.length"
    size="large"
    severity="danger"
    v-if="selectedProduct.length > 0"
  >
    <Button
      icon="pi pi-calculator"
      :label="$t('calculate')"
      class="calculator-btn"
      style="
        display: flex;
        flex-direction: column;
        border-radius: 25px;
        height: 4.5rem;
        width: 4.5rem;
      "
      @click="calculate"
    />
  </OverlayBadge>
  <div ref="targetSection">
    <FoodTable
      v-if="foodTableLoaded && foodTableDisplay"
      v-model:selectedProduct="selectedProduct"
      @updateSelectedData="cartUpdate"
      :products="products"
    />
  </div>

  <CaloricResult
    v-if="showResult"
    v-model:visible="showResult"
    v-model:selectedData="selectedProduct"
    v-model:needData="dailyNeeds"
    @updateSelectedData="cartUpdate"
  ></CaloricResult>
</template>

<style>
.calculator-description-title {
  text-align: center;
}
.calculator-description-content {
  text-align: center;
}
.calculator {
  max-width: 450px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: max-content;
  transition: background-color 0.3s ease;
}
.radio-group {
  display: flex;
  justify-content: space-between; /* 將兩組 radio 均勻分佈 */
  width: 100%; /* 使容器占滿整個寬度 */
}

.radio-group label {
  margin-left: 5px; /* 使 label 與 radio 之間有一些間距 */
  display: flex;
  align-items: center; /* 垂直置中 label */
}

.radio-group .RadioButton {
  flex: 1; /* 每個 radio 和 label 占據相同的空間 */
  display: flex; /* 將 radio 和 label 置於同一行 */
  align-items: center;
}
.calculator.expanded {
  height: max-content;
}

.display-row {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.calculator_result {
  margin-top: 2rem;
  margin: 5;
  padding: 10px;
  color: black;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.input-field {
  border-radius: 4px;
  border: 1px solid #ccc;
  transition: border-color 0.3s ease;
  
}

.input-field:focus {
  border-color: #3498db;
}

.input-field .p-inputtext {
  text-align: center;
  font-size: 20px;
}

.overlaybadge-calc-btn:hover {
  transform: scale(1.05);
}

.calculator-btn .p-button-icon {
  font-size: 2rem;
  margin-right: 0 !important; /* Remove default icon spacing */
  margin-bottom: -0.2rem; /* Space between icon and text */
}
</style>
