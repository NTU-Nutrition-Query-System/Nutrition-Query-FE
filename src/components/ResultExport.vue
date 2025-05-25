<script setup lang="ts">
import { ref } from "vue";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import type { CalculatedNutrition } from "@/interfaces/Calculator";
import { useProductStore } from "@/stores/productStore";
import { usePersonInfoStore } from "@/stores/personInfoStore";
import { exportResultToXlsx } from "@/components/ResultToXlsx";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const toast = useToast();
const productStore = useProductStore();
const dialogVisible = ref(false);
const personalInfoStore = usePersonInfoStore();

const checkInfomation = () => {
    if (personalInfoStore.personInfo.name == "" || personalInfoStore.personInfo.schoolName == "") {
        toast.add({
            severity: "error",
            summary: "",
            detail: "請填寫姓名與學校",
            life: 2000,
        });
        return false;
    } else {
      personalInfoStore.personInfo
      exportResultToXlsx(props.selectedIntake, productStore.selectedProducts, t)
    }
    closeDialog();
    return true;
};

const showDialog = () => {
  // Hide the dialog
  dialogVisible.value = true;
};
const closeDialog = () => {
  // Hide the dialog
  dialogVisible.value = false;
};

const props = defineProps({
  selectedIntake: {
    type: Object as () => CalculatedNutrition[],
    required: true,
  },
});
</script>

<template>
  <div style="display: flex; align-items: center;">
    <Button 
        @click="showDialog()"
        class="btn-yellow">
        <i class="pi pi-download"/>
        {{$t('button.toXlsx')}}
    </Button>
  </div>
  <div>
    <Toast position="top-center" :baseZIndex="12" style="width: 20rem" />
  </div>
  <Dialog
    v-model:visible="dialogVisible"
    :header="$t('button.addCustomFood')"
    @hide="closeDialog"
    :modal="true"
    :closable="true"
    style="width: 40%; height: 80%"
  >
    <div class="sb-group-input" style="width: 300px; margin: 2.5rem auto">
      <input 
        v-model="personalInfoStore.personInfo.name"
        type="text" 
        required 
      />
      <label>{{$t('resultPage.name')}}</label>
    </div>
    <div class="sb-group-input" style="width: 300px; margin: 2.5rem auto">
      <input 
        v-model="personalInfoStore.personInfo.schoolName" 
        type="text" 
        required 
      />
      <label>{{$t('resultPage.school')}}</label>
    </div>
    <div style="display: flex; justify-content: center; margin-top: 2rem">
      <Button 
        class="btn-yellow" 
        @click="checkInfomation()"
      >
        <i class="pi pi-download"/>
        {{$t('button.toXlsx')}}
      </Button>
    </div>
  </Dialog>
</template>

<style scoped></style>
