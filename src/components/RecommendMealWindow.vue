<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Carousel from "primevue/carousel";
import { getMealDetail } from "@/assets/data/recommendMeals";
import type { foodItem } from "@/interfaces/Calculator";
import { useProductStore } from "@/stores/productStore";

import { library as faLibrary } from "@fortawesome/fontawesome-svg-core";
import { faBowlRice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
faLibrary.add(faBowlRice);

const productStore = useProductStore();
const dialogVisible = ref(false);
const { t } = useI18n();

const showDialog = () => {
  // Hide the dialog
  dialogVisible.value = true;
};
const closeDialog = () => {
  // Hide the dialog
  dialogVisible.value = false;
};

type PivotTable = Record<string, Record<string, number | string>>;

const pivotMeals = (meals: foodItem[]) => {
  const pivot: PivotTable = {};
  const headers = [
    "class",
    "subclass",
    "unit",
    "gram",
    "calories",
    "carbohydrate",
    "protein",
    "fat",
    "dietary_fibre",
    "sugar",
    "sodium",
  ];

  for (const attr of headers) {
    pivot[attr] = { 項目: t(`pivot.${attr}`) }; // 使用 i18n 轉換
  }

  for (const meal of meals) {
    for (const attr of headers) {
      if (!pivot[attr]) {
        pivot[attr] = {};
      }
      pivot[attr][meal.name] = meal[attr as keyof foodItem] as number | string;
    }
  }
  // console.log("pivot", pivot);
  return pivot;
};

const convertMeal = () => {
  const mealList = getMealDetail(productStore.dailyNeeds?.calories || 1500);
  // console.log("mealList", typeof mealList, mealList);
  const result = [];
  for (const meals of mealList) {
    const pivot = pivotMeals(meals);
    pivot["nutrition"] = meals[0].header;
    result.push(pivot);
  }
  // console.log("mealDetails", result);
  // console.log("mealDetails length", result.length);
  return result;
};

const getPivotRowNames = (pivot: PivotTable) => {
  if (!pivot || Object.keys(pivot).length === 0) return [];

  const firstColumn = Object.keys(pivot)[0]; // 隨便取一個 column
  return pivot[firstColumn] ? Object.keys(pivot[firstColumn]) : [];
};

const recommendCalories = () => {
  const recommends = [1500, 2000, 2500, 3000];
  const dailyCalorie = productStore.dailyNeeds?.calories || 0;
  return recommends.reduce((prev, curr) =>
    Math.abs(curr - dailyCalorie) < Math.abs(prev - dailyCalorie) ? curr : prev
  );
};

const mealDetails = convertMeal();
</script>

<template>
  <div style="display: flex; align-items: center">
    <Button class="btn-yellow" @click="showDialog">
      <FontAwesomeIcon
        :icon="['fas', 'fa-bowl-rice']"
        style="height: 24px; width: 24px"
      />
      {{ $t("button.RecommendMeal") }}
    </Button>
  </div>

  <Dialog
    v-model:visible="dialogVisible"
    :header="$t('button.RecommendMeal')"
    @hide="closeDialog"
    :modal="true"
    :closable="true"
    style="width: 80%; height: 80%"
  >
    <Carousel :value="mealDetails" :numVisible="1" :numScroll="1">
      <template #item="item" style="display: flex; width: 100%">
        <h3 style="text-align: center">{{ recommendCalories() }}</h3>
        <DataTable
          :value="item.data"
          :scrollable="true"
          table-style="min-width: 50rem; width: 100%;"
          columnResizeMode="expand"
          class="p-datatable-table-container"
        >
          <Column
            v-for="col of getPivotRowNames(item.data)"
            :key="col"
            :field="col"
            :header="col"
            style="text-align: center; justify-content: center"
          >
          </Column>
        </DataTable>
      </template>
    </Carousel>
  </Dialog>
</template>

<style scoped>
.p-dialog .p-dialog-title {
  text-align: center;
  flex-grow: 1;
  line-height: 120%;
  font-size: 22px;
  letter-spacing: -1px;
}

.p-dialog .p-dialog-header {
  padding: 10px;
}

table > tr > td {
  padding: 10px;
  text-align: center;
}

.sb-description {
  font-size: 1.2em;
  margin: 10px 0;
  background-color: var(--primary-color);
  width: 60px;
}

.sb-picture {
  width: 100%;
  height: auto;
  border-radius: 20px;
}

::v-deep(.p-datatable-column-header-content) {
  text-align: center !important;
  align-items: center !important;
  justify-content: center !important;
}

.p-datatable-table-container {
  display: flex !important;
  justify-content: center !important;
  align-content: center !important;
  text-align: center !important;
}
</style>
