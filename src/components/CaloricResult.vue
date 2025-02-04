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
import type {
  nutrient,
  foodItem,
  weightedFoodItem,
} from "../interfaces/Calculator";

const { t } = useI18n();
const { locale } = useI18n();
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  selectedData: {
    type: Array as () => foodItem[],
    required: true,
  },
  needData: {
    type: Object as () => nutrient,
    required: true,
  },
});
const selectedValue = computed<nutrient>(() => {
  if (!cartData.value) {
    return {
      calories: 0,
      carbohydrate: 0,
      protein: 0,
      fat: 0,
    }; // cartData.value 為 undefined 時的預設值
  }
  return cartData.value.reduce<nutrient>(
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
const emit = defineEmits(["update:visible", "updateSelectedData"]);
const isVisible = ref(props.visible);
// Close dialog and emit update event
const closeDialog = () => {
  isVisible.value = false;
  emit("update:visible", false);
  emit("updateSelectedData", selectedCartData.value);
  console.log("Close Result");
};
const cartData = ref<weightedFoodItem[]>();
const selectedCartData = ref<weightedFoodItem[]>();

// Watch for changes in the prop and update the local state
watch(
  () => props.visible,
  (newValue) => {
    console.log("updated!");
    isVisible.value = newValue;
  }
);
// watch(cartData, (newSelection) => {
//   console.log("Result Data updated");
//   console.log(cartData.value);
//   console.log(props.selectedData);
// });
const handle_percentage = (percent: number) => {
  return Math.min(100, percent);
};
onMounted(() => {
  console.log("Result onMounted");
  console.log(props.selectedData);

  cartData.value = props.selectedData.map((item) => ({
    ...item,
    weight: 1,
  }));
  selectedCartData.value = cartData.value;
});
const value3 = ref(5);
</script>

<template>
  <Dialog
    v-model:visible="isVisible"
    :header="$t('selection_result_title')"
    :modal="true"
    @hide="closeDialog"
    style="overflow-x: scroll; width: 80%"
  >
    <Tabs value="0">
      <TabList>
        <Tab value="0">每餐所需營養素&百分比</Tab>
        <Tab value="1">每日所需營養素</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <DataTable
            :value="selectedIntake"
            dataKey="id"
            tableStyle="min-width: 50rem"
            class="custom-divider"
          >
            <Column
              field="nutrition"
              :header="$t('selection_nutrition')"
            ></Column>
            <Column
              field="intake"
              :header="$t('selection_intake')"
              class="first-column-divider"
            ></Column>
            <Column
              field="mealRequirement"
              :header="$t('selection_meal_requirement')"
            ></Column>
            <Column
              field="mealUptakePercentage"
              :header="$t('selection_meal_uptake_percentage')"
            >
              <template #body="slotProps">
                <span
                  :style="{
                    color:
                      parseFloat(slotProps.data.mealUptakePercentage) > 100
                        ? 'red'
                        : 'green',
                  }"
                >
                  {{ slotProps.data.mealUptakePercentage }}%
                  <ProgressBar
                    :value="
                      handle_percentage(slotProps.data.mealUptakePercentage)
                    "
                    :class="{
                      'custom-progress-bar':
                        slotProps.data.mealUptakePercentage > 100,
                    }"
                  >
                    {{ slotProps.data.mealUptakePercentage }}%
                  </ProgressBar>
                </span>
              </template>
            </Column>
          </DataTable></TabPanel
        >
        <TabPanel value="1">
          <DataTable
            :value="selectedIntake"
            dataKey="id"
            tableStyle="min-width: 50rem"
            class="custom-divider"
          >
            <Column
              field="nutrition"
              :header="$t('selection_nutrition')"
            ></Column>
            <Column
              field="intake"
              :header="$t('selection_intake')"
              class="first-column-divider"
            ></Column>

            <Column
              field="dailyRequirement"
              :header="$t('selection_daily_requirement')"
            ></Column>
            <Column
              field="dailyUptakePercentage"
              :header="$t('selection_daily_uptake_percentage')"
            >
              <template #body="slotProps">
                <span
                  :style="{
                    color:
                      parseFloat(slotProps.data.dailyUptakePercentage) > 100
                        ? 'red'
                        : 'green',
                  }"
                >
                  {{ slotProps.data.dailyUptakePercentage }}%
                </span>
                <ProgressBar
                  :value="
                    handle_percentage(slotProps.data.dailyUptakePercentage)
                  "
                  :class="{
                    'custom-progress-bar':
                      slotProps.data.dailyUptakePercentage > 100,
                  }"
                >
                  {{ slotProps.data.dailyUptakePercentage }}%
                </ProgressBar>
              </template>
            </Column>
          </DataTable>
        </TabPanel>
      </TabPanels>
    </Tabs>

    <!-- <div>
            <div class="display-row" v-for="(value, key) in selectedValue" :key="key">
                <label>{{$t(key)}}:</label>
                <span>{{ (value).toFixed(2) }} ({{ key === 'calories' ? 'kcal' : 'g' }})</span>
            </div>
        </div> -->
    <br />
    <DataTable
      :value="cartData"
      dataKey="id"
      tableStyle="min-width: 50rem"
      v-model:selection="selectedCartData"
    >
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column
        :header="$t('調整份數')"
        header-style="width: 12%"
        style="min-width: 180px"
      >
        <template #body="{ data }"
          ><div>
            <InputNumber
              inputId="horizontal-buttons"
              v-model="data.weight"
              showButtons
              buttonLayout="horizontal"
              :step="0.5"
              max="5"
              min="0.5"
              maxFractionDigits="1"
              fluid
              incrementButtonClass="small-buttons"
            />
          </div> </template
      ></Column>
      <Column field="item" :header="$t('food_item')">
        <template #body="{ data }"
          ><div>{{ data.item }}</div>
        </template></Column
      >
      <Column field="gram" :header="$t('food_gram')"
        ><template #body="{ data }"
          ><div>{{ (data.gram * data.weight).toFixed(0) }}</div>
        </template></Column
      >
      <Column field="calories" :header="$t('calories')"
        ><template #body="{ data }"
          ><div>{{ (data.calories * data.weight).toFixed(0) }}</div>
        </template></Column
      >
      <Column field="carbohydrate" :header="$t('carbohydrate')"
        ><template #body="{ data }"
          ><div>{{ (data.carbohydrate * data.weight).toFixed(1) }}</div>
        </template></Column
      >
      <Column field="protein" :header="$t('protein')"
        ><template #body="{ data }"
          ><div>{{ (data.protein * data.weight).toFixed(1) }}</div>
        </template></Column
      >
      <Column field="fat" :header="$t('fat')"
        ><template #body="{ data }"
          ><div>{{ (data.fat * data.weight).toFixed(1) }}</div>
        </template></Column
      >
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
.custom-progress-bar .p-progressbar-value {
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
</style>
