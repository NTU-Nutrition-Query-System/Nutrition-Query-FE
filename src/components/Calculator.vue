<script setup lang="ts">
import Button from "primevue/button";
import { onMounted, ref, watch } from "vue";
import InputNumber from "primevue/inputnumber";
import RadioButton from "primevue/radiobutton";
import FoodTable from "./FoodTable.vue";
import { useI18n } from "vue-i18n";
import CaloricResult from "./CaloricResult.vue";
import type { nutrient } from "../interfaces/Calculator";
import type { foodItem } from "@/interfaces/Calculator";
import { getTableData } from "@/apis/tableData";
// Declare reactive variables using `ref`

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
  foodTableDisplay.value = true;
  calculateDailyNeed();
};
const selectedProduct = ref([]);
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
const loadTableData = async () => {
  const res = await getTableData();
  products.value = res;
  foodTableLoaded.value = true;
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
  <div>
    <div class="calculator-description-title">
      <div style="align-items: center">
        <div style="justify-content: center">
          <h1 style="justify-content: center">{{ $t("calculator") }}</h1>
        </div>
      </div>
    </div>
  </div>
  <div class="calculator" :class="{ expanded: isExpanded }">
    <div class="gender-selection flex justify-between items-center">
      <label class="font-bold block mb-2">{{
        $t("calculator_input_gender")
      }}</label>
      <div class="flex items-center">
        <div class="radio-group">
          <div class="RadioButton">
            <RadioButton v-model="gender" value="Male" />
            <label>{{ $t("male") }}</label>
          </div>
          <div class="RadioButton">
            <RadioButton v-model="gender" value="Female" />
            <label>{{ $t("female") }}</label>
          </div>
        </div>
      </div>
    </div>

    <div style="margin-top: 0.5rem">
      <div class="flex-auto">
        <label for="age" class="font-bold block mb-2">{{ $t("age") }}</label>
        <InputNumber v-model="age" fluid class="input-field" />
      </div>
      <div class="flex-auto">
        <label for="height" class="font-bold block mb-2"
          >{{ $t("height") }}(cm)</label
        >
        <InputNumber v-model="height" fluid class="input-field" />
      </div>
      <div class="flex-auto">
        <label for="weight" class="font-bold block mb-2"
          >{{ $t("weight") }}(kg)</label
        >
        <InputNumber v-model="weight" fluid class="input-field" />
      </div>
      <div style="margin-top: 0.5rem">
        <label class="font-bold block mb-2">{{
          $t("calculator_input_activity_factor.title")
        }}</label>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div class="RadioButton">
            <RadioButton v-model="activityFactor" value="1.3" />
            <label style="margin-left: 0.3rem" :title="$t('calculator_input_activity_factor.tips.mild')">{{
              $t("calculator_input_activity_factor.mild")
            }}</label>
          </div>
          <div class="RadioButton">
            <RadioButton v-model="activityFactor" value="1.5" />
            <label style="margin-left: 0.3rem" :title="$t('calculator_input_activity_factor.tips.moderate')">{{
              $t("calculator_input_activity_factor.moderate")
            }}</label>
          </div>
          <div class="RadioButton">
            <RadioButton v-model="activityFactor" value="2" />
            <label style="margin-left: 0.3rem" :title="$t('calculator_input_activity_factor.tips.severe')">{{
              $t("calculator_input_activity_factor.severe")
            }}</label>
          </div>
          <!-- <span>{{ activityFactor }}</span> -->
        </div>
      </div>
      <div
        style="
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
        "
      >
        <Button class="tab" label="Next" @click="nextOnClicked" />
        <Button class="tab" label="Collapse" @click="isExpanded = false" />
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
      <Button class="tab" :label="$t('calculate')" @click="calculate" />
    </div>
  </div>

  <FoodTable
    v-if="foodTableLoaded && foodTableDisplay"
    v-model:selectedProduct="selectedProduct"
    @updateSelectedData="cartUpdate"
    :products="products"
  />
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
  max-width: 400px;
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
.input-field .p-inputtext {
  text-align: center; /* 文字居中对齐 */
  font-size: 24px; /* 放大字体 */
  font-weight: bold; /* 可选：加粗字体 */
  padding: 10px; /* 增加内边距，让输入框显得更大气 */
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
</style>
