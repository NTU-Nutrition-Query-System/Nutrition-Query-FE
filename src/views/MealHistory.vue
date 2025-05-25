<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { usePrimeVue } from "primevue/config";
import { useI18n } from "vue-i18n";
import DatePicker from "primevue/datepicker";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

import type { DatePickerDateSlotOptions } from "primevue/datepicker";

import { useProductStore } from "@/stores/productStore";

const productStore = useProductStore();

const primevue = usePrimeVue();
const { locale, tm } = useI18n();
primevue.config.locale = Object.assign(
  {},
  primevue.config.locale,
  tm("DatePicker")
);

watch(locale, () => {
  primevue.config.locale = Object.assign(
    {},
    primevue.config.locale,
    tm("DatePicker")
  );
});

// Only these dates will be enabled
const enabledDates = [
  new Date(2025, 4, 15),
  new Date(2025, 4, 17),
  new Date(2025, 4, 18),
];

const date = ref(enabledDates[enabledDates.length - 1]); // Default date is the last of enabledDates

const cvtToDate = (date: DatePickerDateSlotOptions) => {
  return new Date(date.year, date.month, date.day);
};

const isSameDate = (a: Date, b: Date) => {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
};

const isDateEnabled = (date: Date) => {
  return enabledDates.some((d) => isSameDate(d, date));
};
</script>

<template>
  <section style="margin-top: 6rem">
    <div class="container" style="justify-items: center">
      <h2>Meal History</h2>
      <!-- <DatePicker v-model="date" inline style="margin-top: 1rem;"/> -->
      <DatePicker
        v-model="date"
        style="margin-top: 1rem"
        inline
        :pt="{
            day: (date : any) => ({
              class: {
                'p-disabled': !isDateEnabled(cvtToDate(date.context.date)),
                'p-highlight': isSameDate(cvtToDate(date.context.date), new Date()),
              }
            })
        }"
      >
      </DatePicker>
      <DataTable
        :key="locale"
        :value="productStore.filteredData"
        dataKey="id"
        style="width: 85rem; margin-top: 1rem"
        paginator
        :rows="10"
      >
        <Column
          field="name"
          :header="$t('food_item')"
          style="min-width: 150px; width: 1%"
        >
          <template #body="rowData">
            <span>{{ rowData.data.name }}</span>
          </template>
        </Column>
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
          field="unit"
          :header="$t('food_unit')"
          style="width: 0.3%"
        ></Column>
        <Column
          field="gram"
          :header="$t('food_gram')"
          style="width: 0.3%"
        ></Column>
        <Column
          field="calories"
          :header="$t('calories')"
          style="width: 0.5%"
        ></Column>
        <Column
          field="carbohydrate"
          :header="$t('carbohydrate')"
          style="width: 0.5%"
        ></Column>
        <Column
          field="protein"
          :header="$t('protein')"
          style="width: 0.5%"
        ></Column>
        <Column
          field="fat"
          :header="$t('fat')"
          style="width: 0.5%"
        ></Column>
        <Column
          field="dietaryFibre"
          :header="$t('food_dt_fibre')"
          style="width: 0.5%"
        ></Column>
      </DataTable>
    </div>
  </section>
</template>
