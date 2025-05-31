<script setup lang="ts">

import { ref, defineProps } from "vue";
import { useI18n } from "vue-i18n";
import Dialog from "primevue/dialog";
import DatePicker from "primevue/datepicker";
import Button from "primevue/button";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { uploadRecord } from "@/apis/uploadRecord";
import { useAuthStore } from "@/stores/authStore";
const { t } = useI18n();
const toast = useToast();

import type { foodItem } from "@/interfaces/Calculator";

const props = defineProps({
  foodItems: {
    type: Array as () => foodItem[],
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
const datetime12h = ref();

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
  // Here you can add logic to save the record with datetime12h.value
  // For example, you might want to call an API or store it in a Vuex store
  datetime12h.value.setHours(12, 0, 0, 0);
  uploadRecord(datetime12h.value.getTime(), props.foodItems)
    .then(() => {
      toast.add({
        severity: "success",
        summary: "",
        detail: "紀錄已儲存",
        life: 2000,
      });
    })
    .catch(error => {
      console.error("Error saving record:", error);
      toast.add({
        severity: "error",
        summary: "",
        detail: "儲存失敗，請稍後再試",
        life: 2000,
      });
    });

  closeDialog();
  return true;
};

</script>

<template>
  <div style="display: flex; align-items: center;">
    <Button 
        @click="openDialog()"
        class="btn-yellow">
        <i class="pi pi-upload"/>
        儲存至個人紀錄
    </Button>
  </div>
  <Toast position="top-center" :auto-z-index=true style="width: 20rem" />
  <Dialog
    :modal="true"
    @hide="closeDialog"
    style="overflow-x: auto; width: 30%"
    :dismissableMask="true"
    v-model:visible="dialogVisible"
  >
    <div class="sb-group-input" style="width: 300px; margin: 2.5rem auto">
      <span>選擇紀錄時間</span>
      <DatePicker id="datepicker-12h" v-model="datetime12h" fluid />
    </div>
    <div style="display: flex; justify-content: center; margin-top: 2rem">
      <Button 
        @click="checkInfomation"
        class="btn-yellow">
        <i class="pi pi-upload"/>
        儲存至個人紀錄
    </Button>
    </div>
  </Dialog>

</template>

<style scoped>

</style>