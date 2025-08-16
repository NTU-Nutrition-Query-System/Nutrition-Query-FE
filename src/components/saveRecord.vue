<script setup lang="ts">

import { ref, watch, defineProps, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import DatePicker from "primevue/datepicker";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Toast from "primevue/toast";
import { usePrimeVue } from "primevue/config";
import { useToast } from "primevue/usetoast";
import { uploadRecord } from "@/apis/uploadRecord";
import { useAuthStore } from "@/stores/authStore";
const toast = useToast();

import type { DatePickerDateSlotOptions } from "primevue/datepicker";
import type { foodItem, weightedFoodItem } from "@/interfaces/Calculator";
import { useRecordStore } from "@/stores/recordStore";

const recordStore = useRecordStore();

const { t, locale, tm } = useI18n();
const primevue = usePrimeVue();
const datatablekey = ref(0); // Key to force DataTable to re-render
const mealType = ref<'breakfast' | 'lunch' | 'dinner' | null>(null);

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
const selectedDate = ref(new Date()); // Default date is the last of enabledDates

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
    datatablekey.value++; // Increment key to ensure DataTable re-renders with new data
  });
});

const props = defineProps({
  foodItems: {
    type: Array as () => weightedFoodItem[],
    required: true,
  },
});

const dialogVisible = ref(false);
const openDialog = () => {
  const authStore = useAuthStore();
  if(!authStore.isLoggedIn){
    toast.add({
      severity: "warn",
      summary: "",
      detail: "請先登入",
      life: 2000,
    });
  }
  dialogVisible.value = true;
};
const closeDialog = () => {
  dialogVisible.value = false;
};

const formatTo30Min = (date: Date) => {
  const rounded = new Date(date);
  const minutes = rounded.getMinutes();
  rounded.setMinutes(minutes < 30 ? 0 : 30, 0, 0);
  return rounded;
};

const datetime12h = ref(formatTo30Min(new Date()));

const checkInfomation = () => {
  if (!datetime12h.value) {
    toast.add({
      severity: "error",
      summary: "",
      detail: "請選擇時間",
      life: 2000,
    });
    return false;
  }
  datetime12h.value.setMilliseconds(0); // Clear milliseconds for consistency
  datetime12h.value.setSeconds(0); // Clear seconds for consistency
  // Here you can add logic to save the record with datetime12h.value
  // For example, you might want to call an API or store it in a Vuex store
  uploadRecord(datetime12h.value.getTime() / 1000, props.foodItems)
    .then(() => {
      toast.add({ severity: "success", detail: "紀錄已儲存", life: 2000 });
      // 回傳另一個 async，讓後面的 then 接續
      return recordStore.fetchRecords();
    })
    .then(() => {
      // Initialize enabledDates with the dates of records
      const ret = recordStore.getDateofRecords();
      if (Array.isArray(ret)) {
        enabledDates.value = ret.map((date: Date) => new Date(date));
      } else {
        console.error("getDateofRecords did not return an array:", ret);
        enabledDates.value = [];
      }

      datatablekey.value++;
      selectedDate.value = datetime12h.value;
      mealType.value =
        datetime12h.value.getHours() < 11
          ? "breakfast"
          : datetime12h.value.getHours() < 17
          ? "lunch"
          : "dinner";

      closeDialog();
    })
    .catch((error) => {
      console.error("Error saving record:", error);
      toast.add({
        severity: "error",
        summary: "",
        detail: "儲存失敗，請稍後再試",
        life: 2000,
      });
    });
    return true;
  };

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
  return enabledDates.value.some((d) => isSameDate(d, date));
};

const editDialogVisible = ref(false);
const editForm = ref<weightedFoodItem | null>(null);

const editItem = (item: weightedFoodItem) => {
  editForm.value = { ...item }; // 複製一份避免直接改原資料
  editDialogVisible.value = true;
};

const saveEdit = () => {
  if (editForm.value) {
    // recordStore.updateFoodItem(editForm.value); // 你需要在 store 加 update 方法
  }
  editDialogVisible.value = false;
};

const getMealType = (date: Date) => {
  const hour = new Date(date).getHours();
  if (hour >= 0 && hour < 11) return 'breakfast';
  if (hour >= 11 && hour < 17) return 'lunch';
  return 'dinner';
};

const filteredRecords = computed(() => {
  let records = recordStore.getFoodAndTimeByDate(selectedDate.value);
  if (mealType.value) {
    records = records.filter(r => getMealType(r.date) === mealType.value);
  }
  return records;
});

</script>

<template>
  <Toast position="top-center" :auto-z-index=true style="width: 20rem" />

    <div style="width: 100%; display: flex; flex-direction: row; align-items: self-start; justify-content: space-around;">
      <DatePicker
        :key="datatablekey"
        v-model="selectedDate"
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
      <div>
      <div class="time-select">
        <Button class="btn-yellow" label="早餐 00:00-11:00" @click="mealType = 'breakfast'" />
        <Button class="btn-yellow" label="午餐 11:00-17:00" @click="mealType = 'lunch'" />
        <Button class="btn-yellow" label="晚餐 17:00-00:00" @click="mealType = 'dinner'" />
        <Button class="btn-yellow" label="全部" @click="mealType = null" />
      </div>

      <DataTable
        :key="datatablekey"
        :value="filteredRecords"
        scrollHeight="300px"
        style="width: 100%; margin-top: 1rem; min-height: 300px;"
      >
      <template #empty>
        <div style="text-align: center; width: 100%; padding: 1rem;">
          {{ t('page_content.calculator.storage.no_food_record') }}
        </div>
      </template>

      <template #loading> {{ t('page_content.calculator.storage.loading') }}</template>

      <Column :header="t('edit')" style="width: 100px">
        <template #body="slotProps">
          <Button class="btn-yellow" icon="pi pi-pencil" @click="editItem(slotProps.data)" />
        </template>
      </Column>

      <Column field="date" :header="t('DatePicker.time')">
        <template #body="slotProps">
          {{ new Date(slotProps.data.date).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }) }}
        </template>
      </Column>
      <Column field="weight" :header="t('pivot.weight')"></Column>
      <Column field="name" :header="t('pivot.item')" weight="200px"></Column>
      <Column field="gram" :header="t('pivot.gram')"></Column>
      <Column field="calories" :header="t('pivot.calories')"></Column>
      <Column field="carbohydrate" :header="t('pivot.carbohydrate')"></Column>
      <Column field="protein" :header="t('pivot.protein')"></Column>
      <Column field="fat" :header="t('pivot.fat')"></Column>
    </DataTable>
    </div>

    </div>

    
    

  <div class="sb-group-input" style="width: 500px; margin: 2.5rem auto;">
    <div style="display: inline-flex; justify-content: center;">
      
      <div style="margin-right: 1rem;">
        <span>選擇日期</span>
        <DatePicker id="datepicker-12h" v-model="datetime12h"/>
      </div>
      <div>
        <span>選擇時間</span>
        <DatePicker id="timepicker-12h" v-model="datetime12h" timeOnly :step-minute=30 />
      </div>
    </div>
  </div>
  <div style="display: flex; justify-content: center; margin-top: 2rem">
    <Button 
      @click="checkInfomation"
      class="btn-yellow">
      <i class="pi pi-upload"/>
      儲存至個人紀錄
    </Button>
  </div>
  

</template>

<style scoped>
.time-select {
  display: flex;
  flex-direction: row;
  justify-content: right;
  margin-top: 1rem;
}
</style>