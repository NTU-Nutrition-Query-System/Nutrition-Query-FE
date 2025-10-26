<script setup lang="ts">

import { ref, watch, defineProps } from "vue";
import DatePicker from "primevue/datepicker";
import Button from "primevue/button";
import Toast from "primevue/toast";
import Select from 'primevue/select';
import { usePrimeVue } from "primevue/config";
import { useToast } from "primevue/usetoast";
import { uploadRecord } from "@/apis/uploadRecord";
import { useAuthStore } from "@/stores/authStore";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const toast = useToast();

import type { foodItem } from "@/interfaces/Calculator";

const { locale, tm } = useI18n();
const primevue = usePrimeVue();
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

const props = defineProps({
  foodItems: {
    type: Array as () => foodItem[],
    required: true,
  },
});

const datetime12h = ref(new Date());
const time12h = ref();
const timeOptions = ref(
  Array.from({ length: 48 }, (_, i) => {
    const hours = Math.floor(i / 2).toString().padStart(2, '0');
    const minutes = (i % 2 === 0 ? '00' : '30');
    const timeString = `${hours}:${minutes}`;
    const unixTime = new Date().setHours(parseInt(hours), parseInt(minutes), 0, 0) / 1000;
    return { name: timeString, code: unixTime };
  })
);

const selectedmealType = ref();
const mealType = ref([
    { name: t("mealType.breakfast") },
    { name: t("mealType.lunch") },
    { name: t("mealType.dinner") },
    { name: t("mealType.other") },
]);


const checkInfomation = () => {
  if (!datetime12h.value) {
    toast.add({
      severity: "error",
      summary: "",
      detail: t('SaveRecord.toastSelectTime'),
      life: 2000,
    });
    return false;
  }
  if (!selectedmealType.value) {
    toast.add({
      severity: "error",
      summary: "",
      detail: t('SaveRecord.toastSelectMealType'),
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
      toast.add({
        severity: "success",
        summary: "",
        detail: t('SaveRecord.toastSaved'),
        life: 2000,
      });
    })
    .catch(error => {
      console.error("Error saving record:", error);
      toast.add({
        severity: "error",
        summary: "",
        detail: t('SaveRecord.toastError'),
        life: 2000,
      });
    });
  return true;
};

</script>

<template>
  <Toast position="top-center" :auto-z-index=true style="width: 20rem" />
  <div class="sb-group-input" style="width: 600px; margin: 2.5rem auto;">
    <div style="display: inline-flex; justify-content: center;">
      <div style="margin-right: 1rem;">
        <span>{{$t("SaveRecord.selectDate")}}</span>
        <DatePicker id="datepicker-12h" v-model="datetime12h"/>
      </div>
      <div style="margin-right: 1rem;">
        <span>{{$t("SaveRecord.selectTime")}}</span>
        <Select v-model="time12h" :options="timeOptions" optionLabel="name" :placeholder="$t('SaveRecord.selectTime')" class="w-full md:w-56" />
      </div>
      <div>
        <span>{{$t("SaveRecord.selectMealType")}}</span>
        <Select v-model="selectedmealType" :options="mealType" optionLabel="name" :placeholder="$t('SaveRecord.selectMealType')" />
      </div>
    </div>
  </div>
  <div style="display: flex; justify-content: center; margin-top: 2rem">
    <Button 
      @click="checkInfomation"
      class="btn-yellow">
      <i class="pi pi-upload"/>
      {{$t("SaveRecord.saveButton")}}
    </Button>
  </div>
  

</template>

<style scoped>

</style>