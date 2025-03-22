<script setup lang="ts">
import { ref } from "vue";
import Dialog from "primevue/dialog";
import type { foodItem, weightedFoodItem } from "@/interfaces/Calculator";
import { useProductStore } from "@/stores/productStore";
import { useToast } from "primevue/usetoast";
const productStore = useProductStore();

const dialogVisible = ref(false);

const showDialog = () => {
  // Hide the dialog
  dialogVisible.value = true;
};
const closeDialog = () => {
  // Hide the dialog
  dialogVisible.value = false;
};
const toast = useToast();
const food = ref<weightedFoodItem>({
  id: 0,
  item: "",
  class: "客製化",
  gram: 0,
  calories: 0,
  carbohydrate: 0,
  fat: 0,
  protein: 0,
  dietary_fibre: 0,
  weight: 1,
  is_customized: true,
});

const addFood = () => {
  productStore.customProductsCount++;
  const new_food = { ...food.value };

  new_food.id = productStore.customProductsCount * -1;
  productStore.selectedProducts.push(new_food);

  toast.add({
    severity: "success",
    summary: "",
    detail: `${new_food.item} is added`,
    life: 1000,
  });
  dialogVisible.value = false;
  //   console.log("Custom Food");
  //   console.log(new_food);
  food.value = {
    id: 0,
    item: "",
    class: "客製化",
    gram: 0,
    calories: 0,
    carbohydrate: 0,
    fat: 0,
    protein: 0,
    dietary_fibre: 0,
    weight: 1,
    is_customized: true,
  };
};
</script>

<template>
  
  <div style="display: flex; align-items: center; margin-left: 10px;">
    <Button class="btn-yellow" @click="showDialog">
      <div class="btn-yellow-content">
        <font-awesome-icon :icon="['fas', 'fa-add']" 
                    style="height: 24px; width: 24px; margin-right: 5px;" />
        {{ $t("button.addCustomFood") }}
      </div>
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
    style="width: 80%; height: 80%"
  >
    <div class="sb-group-input" style="width: 300px; margin: 2.5rem auto">
      <input v-model="food.item" type="text" name="item" required />
      <span class="sb-bar"></span>
      <label>{{ $t("food_item") }}</label>
    </div>
    <div class="sb-group-input" style="width: 300px; margin: 2.5rem auto">
      <input v-model="food.calories" type="text" name="calories" required />
      <span class="sb-bar"></span>
      <label>{{ $t("calories") }}</label>
    </div>
    <div class="sb-group-input" style="width: 300px; margin: 2.5rem auto">
      <input v-model="food.protein" type="text" name="protein" required />
      <span class="sb-bar"></span>
      <label>{{ $t("protein") }}</label>
    </div>
    <div class="sb-group-input" style="width: 300px; margin: 2.5rem auto">
      <input v-model="food.fat" type="text" name="fat" required />
      <span class="sb-bar"></span>
      <label>{{ $t("fat") }}</label>
    </div>
    <div class="sb-group-input" style="width: 300px; margin: 2.5rem auto">
      <input
        v-model="food.carbohydrate"
        type="text"
        name="carbohydrate"
        required
      />
      <span class="sb-bar"></span>
      <label>{{ $t("carbohydrate") }}</label>
    </div>
    <div class="sb-group-input" style="width: 300px; margin: 2.5rem auto">
      <input
        v-model="food.dietary_fibre"
        type="text"
        name="food_dt_fibre"
        required
      />
      <span class="sb-bar"></span>
      <label>{{ $t("food_dt_fibre") }}</label>
    </div>
    <div style="display: flex; justify-content: center; margin-top: 2rem">
      <Button class="btn-yellow" @click="addFood">
      <div class="btn-yellow-content">
        <i class="pi pi-plus"/>
        {{ $t("button.addCustomFood") }}
      </div>
      </Button>
    </div>
  </Dialog>
</template>

<style scoped></style>
