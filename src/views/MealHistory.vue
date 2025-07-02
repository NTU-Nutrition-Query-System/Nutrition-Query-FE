<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { usePrimeVue } from "primevue/config";
import { useI18n } from "vue-i18n";
import DatePicker from "primevue/datepicker";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

import type { DatePickerDateSlotOptions } from "primevue/datepicker";

import { useRecordStore } from "@/stores/recordStore";

const recordStore = useRecordStore();

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
const enabledDates = ref<Date[]>([]);

const datatablekey = ref(0); // Key to force DataTable to re-render

onMounted(() => {
  datatablekey.value = 0;
  recordStore.fetchRecords().then(() => {
    // Initialize enabledDates with the dates of records
    const ret = recordStore.getDateofRecords();
    if (Array.isArray(ret)) {
      enabledDates.value = ret.map((date: Date) => new Date(date));
    } else {
      console.error("getDateofRecords did not return an array:", ret);
      enabledDates.value = [];
    }
    selectedDate.value = enabledDates.value[enabledDates.value.length - 1]; // Set default date to the last of enabledDates
    console.log("datatablekey:", typeof selectedDate, selectedDate.value );
    datatablekey.value++; // Increment key to ensure DataTable re-renders with new data
  });
});

const selectedDate = ref(new Date); // Default date is the last of enabledDates

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

const reRenderDataTable = () => {
  datatablekey.value++;
};

const isDateEnabled = (date: Date) => {
  return enabledDates.value.some((d) => isSameDate(d, date));
};
</script>

<template>
  <section style="margin-top: 6rem; width: 100%;;">
    <div class="container" style="justify-items: center">
      <DatePicker
        v-model="selectedDate"
        style="margin-top: 1rem"
        inline
        @date-select="reRenderDataTable"
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
        v-if="datatablekey != 0"
        :key="datatablekey"
        :value="recordStore.getFoodRecordsByDate(selectedDate)"
        dataKey="id"
        table-style="width: 100%; min-width: 50rem; max-width: 100%"
        style="margin-top: 1rem; width: 100%;"
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
      </DataTable>
    </div>
  </section>
</template>
