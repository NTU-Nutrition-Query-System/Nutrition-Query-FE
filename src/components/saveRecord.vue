<script setup lang="ts">

import { ref, watch, defineProps, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import DatePicker from "primevue/datepicker";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Toast from "primevue/toast";
import Tag from "primevue/tag";
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

const mealType = ref<string | null>(null);

const mealOptions = [
  { label: "早餐 00:00-11:00", value: "breakfast" },
  { label: "午餐 11:00-17:00", value: "lunch" },
  { label: "晚餐 17:00-00:00", value: "dinner" },
  { label: "全部", value: null }
];

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
  // 先取出指定日期的所有紀錄
  let records = recordStore.getFoodAndTimeByDate(selectedDate.value);

  // 如果有 mealType 過濾，就先篩掉不符合的紀錄
  if (mealType.value) {
    records = records.filter(r => getMealType(r.date) === mealType.value);
  }

  let result = records.flatMap(r =>
    r.food.map(f => ({
      date: r.date, // 保留日期方便顯示
      ...f
    }))
  );

  console.log("Filtered records:", result);

  // 將巢狀 food 展平成單筆 row
  return result;
});

</script>

<template>
  <Toast position="top-center" :auto-z-index=true style="width: 20rem" />

  <div class="section-header">
      <div class="section-icon">✓</div>
      <div>
          <span class="section-title">我的用餐記錄</span>
          <span class="section-subtitle">已儲存到個人記錄</span>
      </div>
  </div>
  
    <div class="records-layout">
      <div class="calendar-section">
        <DatePicker
          :key="datatablekey"
          v-model="selectedDate"
          inline
          :pt="{
            day: (date: any) => ({
              class: {
                'p-disabled': !isDateEnabled(cvtToDate(date.context.date)),
                'p-highlight': isSameDate(cvtToDate(date.context.date), new Date()),
              }
            })
          }"
        />
      </div>


      <div class="records-section">
        <div class="time-select">
          <Button
            v-for="option in mealOptions"
            :key="option.label"
            :label="option.label"
            :class="mealType === option.value ? 'btn-yellow' : 'btn-unselected'"
            @click="mealType = option.value"
          />
        </div>

      <DataTable
          :key="datatablekey"
          :value="filteredRecords"
          :scrollable="true"
          scroll-height="380px"
          class="records-table"
          :row-hover="true"
        >
          <template #empty>
            <div class="empty-state">
              <i class="pi pi-calendar-times empty-icon"></i>
              <p>{{ t('page_content.calculator.storage.no_food_record') }}</p>
            </div>
          </template>

          <template #loading>
            <div class="loading-state">
              <i class="pi pi-spin pi-spinner"></i>
              {{ t('page_content.calculator.storage.loading') }}
            </div>
          </template>

          <!-- 狀態指示欄 -->
          <Column header="" style="width: 40px">
            <template #body>
              <div class="status-indicator saved"></div>
            </template>
          </Column>

          <Column :header="t('edit')" style="width: 80px">
            <template #body="slotProps">
              <Button 
                icon="pi pi-pencil" 
                size="small"
                severity="secondary"
                text
                @click="editItem(slotProps.data)" 
              />
            </template>
          </Column>

           <Column field="date" :header="t('DatePicker.time')">
            <template #body="slotProps">
              {{ new Date(slotProps.data.date).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }) }}
            </template>
          </Column>

          <Column field="weight" :header="t('pivot.weight')" style="width: 80px">
            <template #body="slotProps">
              <span class="weight-display">{{ slotProps.data.weight }}</span>
            </template>
          </Column>
          
          <Column field="name" :header="t('pivot.item')" style="min-width: 150px">
            <template #body="slotProps">
              <span class="food-name">{{ slotProps.data.name }}</span>
            </template>
          </Column>
          
          <Column field="gram" :header="t('pivot.gram')" style="width: 80px"></Column>
          <Column field="calories" :header="t('pivot.calories')" style="width: 90px">
            <template #body="slotProps">
              <span class="calories">{{ slotProps.data.calories }}</span>
            </template>
          </Column>
          <Column field="carbohydrate" :header="t('pivot.carbohydrate')" style="width: 90px"></Column>
          <Column field="protein" :header="t('pivot.protein')" style="width: 90px"></Column>
          <Column field="fat" :header="t('pivot.fat')" style="width: 80px"></Column>
        </DataTable>
    </div>

    </div>

    <div class="dashed-line"></div>
    
    <div class="section-header">
       <div class="section-icon">⏳</div>
       <div>
           <span class="section-title">準備加入記錄</span>
           <span class="section-subtitle">尚未儲存，可以修改</span>
       </div>
   </div>

  <div class="sb-group-input" style="width: 1000px; margin: 2.5rem auto;">
    <div style="display: inline-flex; justify-content: center;">
      <div><span></span></div>
      <div style="margin-right: 1rem; width: 25%;">
        <span>選擇日期</span>
        <DatePicker id="datepicker-12h" v-model="datetime12h"/>
      </div>
      <div style="margin-right: 1rem; width: 25%;">
        <span>選擇時間</span>
        <DatePicker id="timepicker-12h" v-model="datetime12h" timeOnly :step-minute=30 />
      </div>
      <div style="display: flex; justify-content: center; margin-top: 1rem">
        <Button 
          @click="checkInfomation"
          class="btn-yellow">
          <i class="pi pi-upload"/>
          儲存至個人紀錄
        </Button>
      </div>
    </div>
  </div>
  

</template>

<style scoped>
.time-select {
  display: flex;
  flex-direction: row;
  justify-content: right;
  margin-top: -4rem;
}

.dashed-line {
    border-top: 0.5px dashed #3e3e3e;
    padding-top: 30px;
    margin-top: 30px;
}

/* 已儲存記錄區塊 */
.saved-section {
    margin-bottom: 40px;
}

.section-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #e9ecef;
}

.section-icon {
    width: 24px;
    height: 24px;
    margin-right: 12px;
    background: var(--primary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 14px;
}

.section-title {
    font-size: 18px;
    font-weight: bold;
    color: #2c3e50;
}

.section-subtitle {
    font-size: 14px;
    color: #6c757d;
    margin-left: 8px;
}

/* 待儲存區塊 */
.pending-section {
    border-top: 3px dashed #ffc107;
    padding-top: 30px;
}

.pending-section .section-icon {
    background: #ffc107;
    color: #000;
}

.pending-section .section-title {
    color: #856404;
}

/* 整體佈局 */
.saved-section, .pending-section {
  margin-bottom: 2rem;
}

/* Section Header */
.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--surface-border);
}

.section-icon {
  width: 32px;
  height: 32px;
  margin-right: 12px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
}

.section-icon.saved {
  background: var(--green-500);
}

.section-icon.pending {
  background: var(--orange-500);
}

.section-info {
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.25rem;
}

.section-subtitle {
  font-size: 0.875rem;
  color: var(--text-color-secondary);
}

/* Records Layout */
.records-layout {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 2rem;
  align-items: start;
}

.calendar-section {
  min-width: 400px;
}

.records-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Meal Filter */
.meal-filter {
  display: flex;
  justify-content: flex-end;
}

.meal-selector {
  font-size: 0.875rem;
}

/* 狀態指示器 */
.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.status-indicator.saved {
  background: var(--green-500);
}

.status-indicator.pending {
  background: var(--orange-500);
}

/* Tables */
.records-table, .pending-table {
  border: 1px solid var(--surface-border);
  border-radius: 8px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-color-secondary);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.loading-state {
  text-align: center;
  padding: 2rem;
  color: var(--text-color-secondary);
}

/* Time Tag */
.time-tag {
  font-size: 0.875rem;
}

/* Food Name */
.food-name {
  font-weight: 500;
}

/* Calories */
.calories {
  color: var(--orange-500);
  font-weight: 500;
}

/* Weight Display */
.weight-display {
  font-weight: 500;
  color: var(--blue-500);
}

/* Section Divider */
.section-divider {
  margin: 2rem 0;
  border-top: 2px dashed var(--orange-300);
}

/* DateTime Selector */
.datetime-selector {
  margin-bottom: 1.5rem;
}

.datetime-form {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 1.5rem;
  align-items: end;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: var(--text-color);
}

.save-button {
  height: fit-content;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

/* Quantity Controls */
.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity {
  min-width: 2rem;
  text-align: center;
  font-weight: 500;
}

/* Edit Form */
.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.edit-form .form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.edit-form label {
  font-weight: 500;
  color: var(--text-color);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .records-layout {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .datetime-form {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>