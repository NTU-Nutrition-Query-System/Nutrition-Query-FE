<script setup lang="ts">
import InputNumber from "primevue/inputnumber";
import { useI18n } from "vue-i18n";
import { ref, watch, computed, onMounted } from "vue";
import Dialog from "primevue/dialog";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import ProgressBar from "primevue/progressbar";
import { useProductStore } from "@/stores/productStore";
import Button from "primevue/button";
import type {
  nutrient,
  foodItem,
  weightedFoodItem,
} from "../interfaces/Calculator";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
const productStore = useProductStore();
const { t } = useI18n();
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
  console.log("Selected Value");

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

const selectedIntake = computed(() => {
  return [
    {
      id: 0,
      nutrition: t("calories"),
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
      id: 3,
      nutrition: t("carbohydrate"),
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
      id: 1,
      nutrition: t("protein"),
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
      id: 2,
      nutrition: t("fat"),
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
const emit = defineEmits(["update:visible"]);
const isVisible = ref(props.visible);
// Close dialog and emit update event
const closeDialog = () => {
  isVisible.value = false;
  emit("update:visible", false);
  console.log("Close Result");
};
const deleteButtonClicked = (row: weightedFoodItem) => {
  productStore.updateRow(row);
  toast.add({
    severity: "warn",
    summary: "",
    detail: `${row.item} is removed`,
    life: 2000,
  });
};
watch(
  () => props.visible,
  (newValue) => {
    console.log("updated!");
    isVisible.value = newValue;
  }
);

onMounted(() => {
  console.log("Result onMounted");
});
</script>

<template>
  <Dialog
    v-model:visible="isVisible"
    :header="$t('selection_result_title')"
    :modal="true"
    @hide="closeDialog"
    style="overflow-x: scroll; width: 80%">
    <Toast position="top-center" :baseZIndex=12 style="width: 20rem" />
    <Tabs value="0">
      <TabList>
        <Tab value="0">{{$t('selection_meal_requirement')}}</Tab>
        <Tab value="1">{{$t('selection_daily_requirement')}}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <DataTable
            :value="selectedIntake"
            dataKey="id"
            tableStyle="min-width: 50rem"
            class="custom-divider">
            <Column
              field="nutrition"
              :header="$t('selection_nutrition')">
            </Column>
            <Column
              field="mealRequirement"
              :header="$t('selection_meal_requirement')"
              class="first-column-divider">
            </Column>
            <Column
              field="intake"
              :header="$t('selection_intake')"
            </Column>
            <Column
              field="mealUptakePercentage"
              :header="$t('selection_meal_uptake_percentage')">
              <template #body="slotProps">
                <span
                  style="display: flex; align-items: center; justify-content: center;"
                  :class="{
                    'precentBar-low-text':
                    slotProps.data.mealUptakePercentage < 85,
                    'precentBar-medium-text':
                    slotProps.data.mealUptakePercentage >= 85 &&
                    slotProps.data.mealUptakePercentage <= 115,
                    'precentBar-high-text':
                    slotProps.data.mealUptakePercentage > 115,
                }">
                {{ slotProps.data.mealUptakePercentage }}%
                </span>
                <ProgressBar
                  :value="Math.min(100, slotProps.data.mealUptakePercentage)"
                  :class="{
                    'precentBar-low':
                    slotProps.data.mealUptakePercentage < 85,
                    'precentBar-medium':
                    slotProps.data.mealUptakePercentage >= 85 &&
                    slotProps.data.mealUptakePercentage <= 115,
                    'precentBar-high':
                    slotProps.data.mealUptakePercentage > 115,
                }"/>
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
            </Column>
            <Column
              field="dailyRequirement"
              :header="$t('selection_daily_requirement')"
              class="first-column-divider">
            </Column>
            <Column
              field="intake"
              :header="$t('selection_intake')"
            </Column>
            <Column
              field="dailyUptakePercentage"
              :header="$t('selection_daily_uptake_percentage')">
              <template #body="slotProps">
                <span
                  style="display: flex; align-items: center; justify-content: center;"
                  :class="{
                    'precentBar-low-text':
                    slotProps.data.dailyUptakePercentage < 85,
                    'precentBar-medium-text':
                    slotProps.data.dailyUptakePercentage >= 85 &&
                    slotProps.data.dailyUptakePercentage <= 115,
                    'precentBar-high-text':
                    slotProps.data.dailyUptakePercentage > 115,
                }">
                {{ slotProps.data.dailyUptakePercentage }}%
                </span>
                <ProgressBar
                  :value="Math.min(100, slotProps.data.dailyUptakePercentage)"
                  :class="{
                    'precentBar-low':
                    slotProps.data.dailyUptakePercentage < 85,
                    'precentBar-medium':
                    slotProps.data.dailyUptakePercentage >= 85 &&
                    slotProps.data.dailyUptakePercentage <= 115,
                    'precentBar-high':
                    slotProps.data.dailyUptakePercentage > 115,
                }"/>
              </template>
            </Column>
          </DataTable>
        </TabPanel>
      </TabPanels>
    </Tabs>
    <Button 
      style="  
      margin-bottom: 1rem;
      border: none;
      color: #444444;
      background-color: #F5C332;
      width: 13rem"
    >
      <i class="pi pi-download"/>
      {{$t('button.toCSV')}} 
    </Button>
    
    <DataTable
      :value="productStore.selectedProducts"
      dataKey="id"
      tableStyle="min-width: 50rem"
      v-model:selection="productStore.selectedProducts">
      <Column :header="$t('移除')" header-style="width: 3rem">
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
      <Column :header="$t('調整份數')" header-style="width: 6.2rem">
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
      <Column field="item" :header="$t('food_item')">
        <template #body="{ data }">
          <div>{{ data.item }}</div>
        </template>
      </Column>
      <Column field="gram" :header="$t('food_gram')">
        <template #body="{ data }">
          <div>{{ (data.gram * data.weight).toFixed(0) }}</div>
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
  color: #FF8E0A;
}

.precentBar-low .p-progressbar-label {
  color: #FF8E0A;
}

.precentBar-low .p-progressbar-value {
  background-color: #FF8E0A;
}

.precentBar-medium-text {
  color: #28a745;
}

.precentBar-medium .p-progressbar-label {
  color: #28a745;
}

.precentBar-medium .p-progressbar-value{
  background-color: #28a745;
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
