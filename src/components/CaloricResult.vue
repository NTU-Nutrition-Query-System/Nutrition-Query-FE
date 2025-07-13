<script setup lang="ts">
import InputNumber from "primevue/inputnumber";
import { ref, watch, computed, onMounted } from "vue";
import { defineAsyncComponent } from "vue";
import Dialog from "primevue/dialog";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import ProgressBar from "primevue/progressbar";
import Button from "primevue/button";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import type {
  nutrient,
  foodItem,
  weightedFoodItem,
  CalculatedNutrition,
} from "@/interfaces/Calculator";
import { useProductStore } from "@/stores/productStore";
import RecommendMealWindow from "@/components/RecommendMealWindow.vue";
import CustomFoodWindow from "@/components/CustomFoodWindow.vue";
import { useAuthStore } from "@/stores/authStore";
import { caloricResultConfig, caloricResultSeries } from "@/components/common/resultGaugeConfig";
import { VueUiGauge } from "vue-data-ui";
import saveRecord from "./saveRecord.vue";
const ResultExport = defineAsyncComponent(() => import("./ResultExport.vue"));
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const productStore = useProductStore();
const { locale } = useI18n();

const toast = useToast();
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  needData: {
    type: Object as () => nutrient,
    required: true,
  },
});
const selectedValue = computed<nutrient>(() => {
  if (!productStore.selectedProducts) {
    return {
      calories: 0,
      carbohydrate: 0,
      protein: 0,
      fat: 0,
    };
  }
  // console.log("Selected Value");

  return productStore.selectedProducts.reduce<nutrient>(
    (acc, item) => {
      acc.calories += item.calories * item.weight;
      acc.protein += item.protein * item.weight;
      acc.carbohydrate += item.carbohydrate * item.weight;
      acc.fat += item.fat * item.weight;
      return acc;
    },
    {
      calories: 0,
      protein: 0,
      carbohydrate: 0,
      fat: 0,
    }
  );
});

const selectedIntake = computed<CalculatedNutrition[]>(() => {
  return [
    {
      id: 0,
      nutrition: "calories",
      intake: selectedValue.value.calories.toFixed(1),
      mealRequirement: (props.needData.calories / 3).toFixed(1),
      mealUptakePercentage: (
        (selectedValue.value.calories / props.needData.calories) *
        300
      ).toFixed(1),
      dailyRequirement: props.needData.calories.toFixed(1),
      dailyUptakePercentage: (
        (selectedValue.value.calories / props.needData.calories) *
        100
      ).toFixed(1),
    },
    {
      id: 1,
      nutrition: "carbohydrate",
      intake: selectedValue.value.carbohydrate.toFixed(1),
      mealRequirement: (props.needData.carbohydrate / 3).toFixed(1),
      mealUptakePercentage: (
        (selectedValue.value.carbohydrate / props.needData.carbohydrate) *
        300
      ).toFixed(1),
      dailyRequirement: props.needData.carbohydrate.toFixed(1),
      dailyUptakePercentage: (
        (selectedValue.value.carbohydrate / props.needData.carbohydrate) *
        100
      ).toFixed(1),
    },
    {
      id: 2,
      nutrition: "protein",
      intake: selectedValue.value.protein.toFixed(1),
      mealRequirement: (props.needData.protein / 3).toFixed(1),
      mealUptakePercentage: (
        (selectedValue.value.protein / props.needData.protein) *
        300
      ).toFixed(1),
      dailyRequirement: props.needData.protein.toFixed(1),
      dailyUptakePercentage: (
        (selectedValue.value.protein / props.needData.protein) *
        100
      ).toFixed(1),
    },

    {
      id: 3,
      nutrition: "fat",
      intake: selectedValue.value.fat.toFixed(1),
      mealRequirement: (props.needData.fat / 3).toFixed(1),
      mealUptakePercentage: (
        (selectedValue.value.fat / props.needData.fat) *
        300
      ).toFixed(1),
      dailyRequirement: props.needData.fat.toFixed(1),
      dailyUptakePercentage: (
        (selectedValue.value.fat / props.needData.fat) *
        100
      ).toFixed(1),
    },
  ];
});
const visibleEmit = defineEmits(["update:visible"]);
const isVisible = ref(props.visible);
// Close dialog and emit update event
const closeDialog = () => {
  isVisible.value = false;
  visibleEmit("update:visible", false);
};
const deleteButtonClicked = (row: weightedFoodItem) => {
  productStore.updateRow(row);
  toast.add({
    severity: "warn",
    summary: "",
    detail: `${row.name} is removed`,
    life: 2000,
  });
};

const getRowStyle = (row:weightedFoodItem) => {
  if (row.is_customized) {
    return { '--p-datatable-row-background': 'rgba(255, 200, 120, 0.3)' }; // 橘色
  } else{
    return { '--p-datatable-row-background':  'rgba(0, 0, 0, 0)'};
  }
  return {};
};

const tabValue = ref("0");
const tabKey = ref(0);

const checkLogined = () => {
  const authStore = useAuthStore();
  if (!authStore.isLoggedIn) {
    toast.add({
      severity: "warn",
      summary: "",
      detail: "請先登入",
      life: 2000,
    });
    tabValue.value = "0"; // Reset to the first tab
    tabKey.value++; // Force re-render of the tabs
    return false;
  }
  return true;
};

</script>

<template>
  <Dialog
    v-model:visible="isVisible"
    :header="$t('selection_result_title')"
    :modal="true"
    @hide="closeDialog"
    style="overflow-x: scroll; width: 80%">
    <Toast position="top-center" :baseZIndex=12 style="width: 20rem" />
    <Tabs v-model:value="tabValue" :key="tabKey">
      <TabList>
        <Tab value="0">{{$t('selection_meal_requirement')}}</Tab>
        <Tab value="1">{{$t('selection_daily_requirement')}}</Tab>
        <Tab value="2" @click="checkLogined">{{$t('resultPage.save')}}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <DataTable
            :value="selectedIntake"
            dataKey="id"
            tableStyle="min-width: 50rem;"
            class="custom-divider"
            >
            <Column
              field="nutrition"
              :header="$t('selection_nutrition')">
              <template #body="slotProps">
                <span>{{$t(slotProps.data.nutrition)}}</span>
              </template>
            </Column>
            <Column
              field="mealRequirement"
              :header="$t('selection_meal_requirement')"
              class="first-column-divider"/>
            <Column
              field="intake"
              :header="$t('selection_intake')"/>
            <Column
              field="mealUptakePercentage"
              :header="$t('selection_meal_uptake_percentage')">
              <template #body="slotProps">
                <lable
                  :class="{
                    'precentBar-low-text':
                    slotProps.data.mealUptakePercentage < 75,
                    'precentBar-medium-text':
                    slotProps.data.mealUptakePercentage >= 75 &&
                    slotProps.data.mealUptakePercentage <= 125,
                    'precentBar-high-text':
                    slotProps.data.mealUptakePercentage > 125,
                }">
                {{ slotProps.data.mealUptakePercentage }}%
                </lable>
              </template>
            </Column>
            <Column field="mealUptakePercentage">
              <template #body="slotProps">
                <VueUiGauge 
                  :config="caloricResultConfig" 
                  :dataset="{
                            series: caloricResultSeries,
                            value: parseFloat(slotProps.data.mealUptakePercentage),
                          }"
                  style="width: 180px; height: 65px; position: relative; top: -20px;"
                  >
                </VueUiGauge>
              </template>
            </Column>
          </DataTable>
        </TabPanel>
        <TabPanel value="1">
          <DataTable
            :value="selectedIntake"
            dataKey="id"
            tableStyle="min-width: 50rem"
            class="custom-divider">
            <Column
              field="nutrition"
              :header="$t('selection_nutrition')">
              <template #body="slotProps">
                <span>{{$t(slotProps.data.nutrition)}}</span>
              </template>
            </Column>
            <Column
              field="dailyRequirement"
              :header="$t('selection_daily_requirement')"
              class="first-column-divider"/>
            <Column
              field="intake"
              :header="$t('selection_intake')"/>
            <Column
              field="dailyUptakePercentage"
              :header="$t('selection_daily_uptake_percentage')">
              <template #body="slotProps">
                <span
                  style="display: flex; align-items: center; justify-content: center;"
                  :class="{
                    'precentBar-low-text':
                    slotProps.data.dailyUptakePercentage < 75,
                    'precentBar-medium-text':
                    slotProps.data.dailyUptakePercentage >= 75 &&
                    slotProps.data.dailyUptakePercentage <= 125,
                    'precentBar-high-text':
                    slotProps.data.dailyUptakePercentage > 125,
                }">
                {{ slotProps.data.dailyUptakePercentage }}%
                </span>
                <ProgressBar
                  :value="Math.min(100, slotProps.data.dailyUptakePercentage)"
                  :class="{
                    'precentBar-low':
                    slotProps.data.dailyUptakePercentage < 75,
                    'precentBar-medium':
                    slotProps.data.dailyUptakePercentage >= 75 &&
                    slotProps.data.dailyUptakePercentage <= 125,
                    'precentBar-high':
                    slotProps.data.dailyUptakePercentage > 125,
                }"/>
              </template>
            </Column>
          </DataTable>
        </TabPanel>
        <TabPanel value="2">
          <saveRecord :food-items="productStore.selectedProducts"/>
        </TabPanel>
      </TabPanels>
    </Tabs>

    <div style="display:flex">
      <ResultExport :selectedIntake="selectedIntake" />
      <CustomFoodWindow/>
      <RecommendMealWindow/>
    </div>


    <DataTable
      :value="productStore.selectedProducts"
      :rowStyle="getRowStyle"
      dataKey="id"
      tableStyle="min-width: 50rem"
      :selection="{}">

      <Column :header="$t('resultPage.remove')" header-style="width: 3rem">
        <template #body="{ data }">
          <Button
            icon="pi pi-minus-circle"
            @click="deleteButtonClicked(data)"
            style="
              border: none;
              color: #444444;
              background-color: #F5C332
            "
          />
        </template>
      </Column>
      <Column :header="$t('resultPage.adjust')" header-style="width: 6.2rem">
        <template #body="{ data }">
          <div>
            <InputNumber
              class="iptBtn-amount"
              v-model="data.weight"
              showButtons
              :step=0.5
              :max=5
              :min=0.5
              :maxFractionDigits=1
              fluid
              incrementButtonClass="small-buttons"
            />
          </div>
        </template>
      </Column>
      <Column field="name" :header="$t('food_item')">
        <template #body="{ data }">
          <div>{{ data.name }}</div>
        </template>
      </Column>
      <Column field="unit" :header="$t('food_unit')">
        <template #body="{ data }">
          <div>{{ data.unit }}</div>
        </template>
      </Column>
      <Column field="gram" :header="$t('food_gram')">
        <template #body="{ data }">
          <div v-if="!data.is_customized" >{{ (data.gram * data.weight).toFixed(0) }}</div>
          <div v-if="data.is_customized"></div>
        </template>
      </Column>
      <Column field="calories" :header="$t('calories')">
        <template #body="{ data }">
          <div>{{ (data.calories * data.weight).toFixed(0) }}</div>
        </template></Column>
      <Column field="carbohydrate" :header="$t('carbohydrate')">
        <template #body="{ data }">
          <div>{{ (data.carbohydrate * data.weight).toFixed(1) }}</div>
        </template>
      </Column>
      <Column field="protein" :header="$t('protein')">
        <template #body="{ data }">
          <div>{{ (data.protein * data.weight).toFixed(1) }}</div>
        </template>
      </Column>
      <Column field="fat" :header="$t('fat')">
        <template #body="{ data }">
          <div>{{ (data.fat * data.weight).toFixed(1) }}</div>
        </template>
      </Column>
    </DataTable>
  </Dialog>
</template>

<style>
.display-row {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.custom-divider .first-column-divider {
  border-right: 2px solid #dee2e6;
}

.precentBar-low-text {
  color: #28a745;
}

.precentBar-low .p-progressbar-label {
  color: #28a745;
}

.precentBar-low .p-progressbar-value {
  background-color: #28a745;
}

.precentBar-medium-text {
  color: #FF8E0A;
}

.precentBar-medium .p-progressbar-label {
  color: #FF8E0A;
}

.precentBar-medium .p-progressbar-value{
  background-color: #FF8E0A;
}

.precentBar-high-text {
  color: #ff4444;
}

.precentBar-high .p-progressbar-label {
  color: #ff4444;
}

.precentBar-high .p-progressbar-value {
  background-color: #ff4444;
}

.p-dialog .p-dialog-title {
  font-family: "Inter", sans-serif !important;
  /* font-size: 2em; */
  font-weight: 700;
}
.p-dialog .p-dialog-content {
  font-family: "Inter", sans-serif !important;
  font-size: 1em;
  font-weight: 700;
}
.small-buttons .p-inputnumber-button {
  width: 24px; /* 按钮宽度 */
  height: 24px; /* 按钮高度 */
  font-size: 14px; /* 按钮文字/图标大小 */
  padding: 0; /* 去掉内边距 */
  border-radius: 4px; /* 圆角样式 */
}

.small-buttons .p-inputnumber-button.p-disabled {
  opacity: 0.6; /* 禁用时的透明度 */
  cursor: not-allowed;
}

.iptBtn-amount .p-inputnumber-increment-button {
  width: 1.4rem;
  color: #ffffff;
  background-color: #F5C332;
  border-radius: 3px;
}

.iptBtn-amount .p-inputnumber-decrement-button {
  width: 1.4rem;
  color: #ffffff;
  background-color: #F5C332;
  border-radius: 3px;
}

</style>
