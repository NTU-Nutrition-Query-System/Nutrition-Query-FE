<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { onMounted, ref, watch, nextTick } from "vue";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import InputGroup from "primevue/inputgroup";
import FloatLabel from "primevue/floatlabel";
import RadioButton from "primevue/radiobutton";
import OverlayBadge from "primevue/overlaybadge";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import FoodTable from "@/components/FoodTable.vue";
import CaloricResult from "@/components/CaloricResult.vue";
import type { nutrient } from "@/interfaces/Calculator";
import type { foodItem } from "@/interfaces/Calculator";
import { getTableData } from "@/apis/tableData";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { useProductStore } from "@/stores/productStore";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
const productStore = useProductStore();
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
  carbohydrate: 0,
  protein: 0,
  fat: 0,
});
const toast = useToast();
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

const { locale } = useI18n();

const foodTableLoaded = ref<boolean>(false);
const foodTableDisplay = ref<boolean>(false);
const calculatorDisplay = ref<boolean>(false);
const loadTableData = async () => {
  foodTableLoaded.value = true;
  productStore.loadTableData(getTableData);
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
const scrollDown = () => {
  foodTableDisplay.value = true;
  calculatorDisplay.value = true;
  nextTick(() => {
    targetSection.value?.scrollIntoView({ behavior: "smooth" });
  });
};

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

  <div
    class="calculator"
    :class="{ expanded: isExpanded }"
    style="margin-top: 0.5rem"
  >
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        font-weight: bold;
        text-align: center;
      "
    >
      {{ $t("calculator_input.title") }}
    </div>
    <div class="calc-gender-select" style="margin-top: 1rem">
      <RadioButton v-model="gender" value="Male" style="margin-left: 1rem" />
      <label style="margin-left: 0.3rem">{{
        $t("calculator_input.gender.male")
      }}</label>
      <RadioButton v-model="gender" value="Female" style="margin-left: 1rem" />
      <label style="margin-left: 0.3rem">{{
        $t("calculator_input.gender.female")
      }}</label>
    </div>

    <div
      style="
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <label class="calc-InputNum-label"
        >{{ $t("calculator_input.age") }} :</label
      >
      <InputNumber v-model="age" class="calc-InputNum" />
      <label class="calc-InputNum-unit">{{
        $t("calculator_input.years_old")
      }}</label>
    </div>

    <div
      style="
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <label class="calc-InputNum-label"
        >{{ $t("calculator_input.height") }} :</label
      >
      <InputNumber v-model="height" class="calc-InputNum" />
      <label class="calc-InputNum-unit">{{
        $t("calculator_input.centimeter")
      }}</label>
    </div>

    <div
      style="
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <label class="calc-InputNum-label"
        >{{ $t("calculator_input.weight") }} :</label
      >
      <InputNumber v-model="weight" class="calc-InputNum" />
      <label class="calc-InputNum-unit">{{
        $t("calculator_input.kilogram")
      }}</label>
    </div>

    <div style="font-weight: bold; display: block; margin: 0.5 0.5rem">
      {{ $t("calculator_input.activity_factor.title") }}
    </div>
    <div class="activity-radio-btn" style="margin-top: 0.5rem">
      <RadioButton v-model="activityFactor" value="1.3" />
      <label style="margin-left: 0.5rem">
        {{ $t("calculator_input.activity_factor.mild") }}
      </label>
    </div>
    <div class="activity-tips">
      {{ $t("calculator_input.activity_factor.tips.mild") }}
    </div>
    <div class="activity-radio-btn" style="margin-top: 0.5rem">
      <RadioButton v-model="activityFactor" value="1.5" />
      <label style="margin-left: 0.5rem">
        {{ $t("calculator_input.activity_factor.moderate") }}
      </label>
    </div>
    <div class="activity-tips">
      {{ $t("calculator_input.activity_factor.tips.moderate") }}
    </div>
    <div class="activity-radio-btn" style="margin-top: 0.5rem">
      <RadioButton v-model="activityFactor" value="2" />
      <label style="margin-left: 0.5rem">
        {{ $t("calculator_input.activity_factor.severe") }}
      </label>
    </div>
    <div class="activity-tips">
      {{ $t("calculator_input.activity_factor.tips.severe") }}
    </div>

    <div
      style="
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;
      "
    >
      <Button
        class="tab"
        :label="$t('calculator_input.calculate')"
        @click="nextOnClicked"
      />
    </div>
  </div>
  <div class="calculator" style="margin-top: 0.5rem" v-if="isExpanded">
    <div class="result">
      <h3>{{ $t("calculator_result_daily_title") }}</h3>

      <div class="display-row" v-for="(value, key) in dailyNeeds" :key="key">
        <label>{{ $t(key) }}:</label>
        <!-- 熱量 -->
        <span
          >{{ value.toFixed(2) }} ({{
            key === "calories" ? "kcal" : "g"
          }})</span
        >
      </div>

      <h3 style="margin-top: 0.5rem">
        {{ $t("calculator_result_meal_title") }}
      </h3>

      <div class="display-row" v-for="(value, key) in dailyNeeds" :key="key">
        <label>{{ $t(key) }}:</label>
        <span
          >{{ (value / 3.0).toFixed(2) }} ({{
            key === "calories" ? "kcal" : "g"
          }})</span
        >
      </div>

      <Button
        class="tab"
        :label="$t('calculator_input.choosing')"
        @click="scrollDown"
      />
      <div style="font-size: 16px; margin-top: 0.3rem" v-if="foodTableDisplay">
        {{ $t("calculator_input.scroll_down") }}
      </div>
    </div>
  </div>

  <!-- foodTableDisplay.value = true; -->

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
    :value="productStore.selectedProducts.length"
    size="large"
    severity="danger"
    v-if="productStore.selectedProducts.length > 0"
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
  <Button
    v-else-if="calculatorDisplay"
    class="calculator-btn"
    icon="pi pi-calculator"
    :label="$t('calculate')"
    style="
      position: fixed;
      bottom: 1.2rem;
      right: 1.2rem;
      z-index: 1000;
      margin-right: 1rem;
      display: flex;
      flex-direction: column;
      border-radius: 25px;
      height: 4.5rem;
      width: 4.5rem;
    "
    @click="calculate"
  />
  <div></div>

  <div ref="targetSection" v-if="foodTableLoaded && foodTableDisplay">
    <Toast position="top-center" baseZIndex="12" style="width: 20rem" />
    <DataTable
      :selection="productStore.selectedProducts"
      :value="productStore.calculatorFilteredData"
      :globalFilterFields="['item', 'class']"
      :filters="productStore.calculatorFilters"
      dataKey="id"
      tableStyle="min-width: 50rem"
      paginator
      :rows="10"
      @row-click="itemSelect"
      rowHover
      highlightOnSelect
    >
      <template #header>
        <div style="display: flex align-items-center">
          <IconField>
            <InputIcon class="pi pi-search" style="margin-right: 1rem" />
            <InputText
              v-model="productStore.calculatorFilters['global'].value"
              placeholder="Keyword Search"
            />
          </IconField>
          <div class="tags-container">
            <span
              v-for="(option, index) in productStore.selectedOptions"
              :key="index"
              class="tag"
              @click="productStore.removeTag(index)"
            >
              <Button :label="option.name" icon="pi pi-times"></Button>
            </span>
          </div>
        </div>
        <div></div>
      </template>

      <Column selectionMode="multiple" style="width: 0.1%"></Column>
      <Column
        field="item"
        :header="$t('food_item')"
        style="min-width: 150px; width: 1%"
      ></Column>
      <Column
        field="subclass"
        :header="$t('food_class')"
        style="width: 1%"
        :showFilterMatchModes="false"
        :showApplyButton="false"
        :showClearButton="false"
      >
      </Column>
      <Column
        field="gram"
        :header="$t('food_gram')"
        style="width: 0.5%"
      ></Column>
      <Column
        sortable
        field="calories"
        :header="$t('calories')"
        :filter="true"
        filterField="calories"
        :showFilterMatchModes="false"
        :showApplyButton="false"
        :showClearButton="false"
        style="width: 0.5%"
      >
        <template #body="{ data }">
          <div
            :style="{
              backgroundColor: productStore.getColor(data.calories, 0, 550),
              color: 'black',
              padding: '10px',
              borderRadius: '5px',
              textAlign: 'center',
            }"
          >
            {{ data.calories }}
          </div>
        </template>
      </Column>
      <Column
        sortable
        field="carbohydrate"
        :header="$t('carbohydrate')"
        :filter="true"
        filterField="carbohydrate"
        :showFilterMatchModes="false"
        :showApplyButton="false"
        :showClearButton="false"
        style="width: 0.5%"
      >
        <template #body="{ data }">
          <div
            :style="{
              backgroundColor: productStore.getColor(data.carbohydrate, 0, 50),
              color: 'black',
              padding: '10px',
              borderRadius: '5px',
              textAlign: 'center',
            }"
          >
            {{ data.carbohydrate }}
          </div>
        </template>
      </Column>
      <Column
        sortable
        field="protein"
        :header="$t('protein')"
        :showApplyButton="false"
        :showClearButton="false"
        style="width: 0.5%"
      >
        <template #body="{ data }">
          <div
            :style="{
              backgroundColor: productStore.getColor(data.protein, 0, 25),
              color: 'black',
              padding: '10px',
              borderRadius: '5px',
              textAlign: 'center',
            }"
          >
            {{ data.protein }}
          </div>
        </template>
      </Column>
      <Column
        sortable
        field="fat"
        :header="$t('fat')"
        :filter="true"
        :showFilterMatchModes="false"
        filterField="fat"
        :showApplyButton="false"
        :showClearButton="false"
        style="width: 0.5%"
      >
        <template #body="{ data }">
          <div
            :style="{
              backgroundColor: productStore.getColor(data.fat, 0, 25),
              color: 'black',
              padding: '10px',
              borderRadius: '5px',
              textAlign: 'center',
            }"
          >
            {{ data.fat }}
          </div>
        </template>
      </Column>

      <Column
        sortable
        field="dietary_fibre"
        :header="$t('food_dt_fibre')"
        :filter="true"
        :showFilterMatchModes="false"
        filterField="dietary_fibre"
        :showApplyButton="false"
        :showClearButton="false"
        style="width: 0.5%"
      >
        <template #body="{ data }">
          <div
            :style="{
              backgroundColor: productStore.getColor(data.dietary_fibre, 0, 25),
              color: 'black',
              padding: '10px',
              borderRadius: '5px',
              textAlign: 'center',
            }"
          >
            {{ data.dietary_fibre }}
          </div>
        </template>
      </Column>
    </DataTable>
    <FoodTable />
  </div>

  <CaloricResult
    v-if="showResult"
    v-model:visible="showResult"
    v-model:needData="dailyNeeds"
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

.overlaybadge-calc-btn:hover {
  transform: scale(1.05);
}

.calculator-btn .p-button-icon {
  font-size: 2rem;
  margin-right: 0 !important; /* Remove default icon spacing */
  margin-bottom: -0.2rem; /* Space between icon and text */
}
</style>
