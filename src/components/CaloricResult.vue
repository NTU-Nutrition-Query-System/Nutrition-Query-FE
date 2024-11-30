<script setup lang="ts">
import InputNumber from "primevue/inputnumber";
import { useI18n } from "vue-i18n";
import { ref, watch, computed, onMounted } from "vue";
import Dialog from "primevue/dialog";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional
import type { nutrient, foodItem } from "../interfaces/Calculator";

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
      protein: 0,
      carbohydrate: 0,
      fat: 0,
    }; // cartData.value 為 undefined 時的預設值
  }
  return cartData.value.reduce<nutrient>(
    (acc, item) => {
      acc.calories += item.calories;
      acc.protein += item.protein;
      acc.carbohydrate += item.carbohydrate;
      acc.fat += item.fat;
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
      uptakePercentage:
        (
          (selectedValue.value.calories / props.needData.calories) *
          100
        ).toFixed(1) + "%",
    },
    {
      id: 1,
      nutrition: t("protein"),
      intake: selectedValue.value.protein.toFixed(1),
      uptakePercentage:
        ((selectedValue.value.protein / props.needData.protein) * 100).toFixed(
          1
        ) + "%",
    },

    {
      id: 2,
      nutrition: t("fat"),
      intake: selectedValue.value.fat.toFixed(1),
      uptakePercentage:
        ((selectedValue.value.fat / props.needData.fat) * 100).toFixed(1) + "%",
    },
    {
      id: 3,
      nutrition: t("carbohydrate"),
      intake: selectedValue.value.fat.toFixed(1),
      uptakePercentage:
        (
          (selectedValue.value.carbohydrate / props.needData.carbohydrate) *
          100
        ).toFixed(1) + "%",
    },
  ];
});
const emit = defineEmits(["update:visible", "updateSelectedData"]);
const isVisible = ref(props.visible);
// Close dialog and emit update event
const closeDialog = () => {
  isVisible.value = false;
  emit("update:visible", false);
  emit("updateSelectedData", cartData.value);
  console.log("Close Result");
};
const cartData = ref<foodItem[]>();
// Watch for changes in the prop and update the local state
watch(
  () => props.visible,
  (newValue) => {
    console.log("updated!");
    isVisible.value = newValue;
  }
);
watch(cartData, (newSelection) => {
  console.log("Result Data updated");
  console.log(cartData.value);
  console.log(props.selectedData);
});
onMounted(() => {
  console.log("Result onMounted");
  console.log(props.selectedData);
  cartData.value = props.selectedData;
});
</script>

<template>
  <Dialog
    v-model:visible="isVisible"
    :header="$t('selection_result_title')"
    :modal="true"
    @hide="closeDialog"
    style="overflow-x: scroll; width: 80%"
  >
    <DataTable
      :value="selectedIntake"
      dataKey="id"
      tableStyle="min-width: 50rem"
    >
      <Column field="nutrition" :header="$t('selection_nutrition')"></Column>
      <Column field="intake" :header="$t('selection_intake')"></Column>
      <Column
        field="uptakePercentage"
        :header="$t('selection_uptake_percentage')"
      >
        <template #body="slotProps">
          <span
            :style="{
              color:
                parseFloat(slotProps.data.uptakePercentage) > 100
                  ? 'red'
                  : 'green',
            }"
          >
            {{ slotProps.data.uptakePercentage }}
          </span>
        </template>
      </Column>
    </DataTable>
    <!-- <div>
            <div class="display-row" v-for="(value, key) in selectedValue" :key="key">
                <label>{{$t(key)}}:</label>
                <span>{{ (value).toFixed(2) }} ({{ key === 'calories' ? 'kcal' : 'g' }})</span>
            </div>
        </div> -->
    <br />
    <DataTable
      :value="props.selectedData"
      dataKey="id"
      tableStyle="min-width: 50rem"
      v-model:selection="cartData"
    >
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="item" :header="$t('food_item')"></Column>
      <Column field="calories" :header="$t('calories')"></Column>
      <Column field="carbohydrate" :header="$t('carbohydrate')"></Column>
      <Column field="protein" :header="$t('protein')"></Column>
      <Column field="fat" :header="$t('fat')"></Column>
    </DataTable>
  </Dialog>
</template>

<style>
.display-row {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
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
</style>
