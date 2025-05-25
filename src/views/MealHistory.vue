<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { usePrimeVue } from "primevue/config";
import { useI18n } from "vue-i18n";
import DatePicker from "primevue/datepicker";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import IconField from "primevue/iconfield";
import InputText from "primevue/inputtext";
import InputIcon from "primevue/inputicon";

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
        :globalFilterFields="['name', 'class']"
        dataKey="order"
        tableStyle="min-width: 50rem"
        paginator
        :rows="10"
        rowHover
        highlightOnSelect
      >
        <template #header>
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
            "
          >
            <IconField>
              <InputIcon class="pi pi-search" style="margin-right: 1rem" />
              <InputText
                v-model="productStore.filters['global'].value"
                placeholder="Keyword Search"
              />
            </IconField>
            <div style="display: flex; align-items: center">
              <!-- <SizeReference /> -->
            </div>
          </div>
        </template>

        <Column selectionMode="multiple" style="width: 0.1%"></Column>
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
                backgroundColor: productStore.getColor(
                  data.carbohydrate,
                  0,
                  50
                ),
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
          field="dietaryFibre"
          :header="$t('food_dt_fibre')"
          :filter="true"
          :showFilterMatchModes="false"
          filterField="dietaryFibre"
          :showApplyButton="false"
          :showClearButton="false"
          style="width: 0.5%"
        >
          <template #body="{ data }">
            <div style="text-align: center">
              {{ data.dietaryFibre }}
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </section>
</template>
