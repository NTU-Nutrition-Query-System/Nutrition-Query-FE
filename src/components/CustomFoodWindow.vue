<script setup lang="ts">
import { ref, computed } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Toast from "primevue/toast";
import type { foodItem, weightedFoodItem } from "@/interfaces/Calculator";
import { useProductStore } from "@/stores/productStore";
import { useToast } from "primevue/usetoast";
import { library as faLibrary } from "@fortawesome/fontawesome-svg-core";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
faLibrary.add(faAdd);

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
  name: "",
  class: -1,
  unit: "1份",
  gram: 0,
  calories: 0,
  carbohydrate: 0,
  fat: 0,
  protein: 0,
  dietaryFibre: 0,
  portion: 1,
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
    detail: `${new_food.name} 已新增至查看`,
    life: 4000,
  });
  dialogVisible.value = false;
  //   console.log("Custom Food");
  //   console.log(new_food);
  food.value = {
    id: 0,
    name: "",
    class: -1,
    unit: "1份",
    gram: 0,
    calories: 0,
    carbohydrate: 0,
    fat: 0,
    protein: 0,
    dietaryFibre: 0,
    portion: 1,
    is_customized: true,
  };
};
</script>

<template>
  <div style="display: flex; align-items: center">
    <Button class="btn-yellow" @click="showDialog">
      <FontAwesomeIcon
        :icon="['fas', 'fa-add']"
        style="height: 24px; width: 24px; margin-right: 5px"
      />
      {{ $t("button.addCustomFood") }}
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
      <input v-model="food.name" type="text" name="name" required />
      <span class="sb-bar"></span>
      <label>{{ $t("food_item") }}</label>
    </div>
    <div class="sb-group-input" style="width: 300px; margin: 2.5rem auto">
      <input v-model="food.calories" type="number" name="calories" required />
      <span class="sb-bar"></span>
      <label>{{ $t("calories") }}</label>
    </div>
    <div class="sb-group-input" style="width: 300px; margin: 2.5rem auto">
      <input v-model="food.protein" type="number" name="protein" required />
      <span class="sb-bar"></span>
      <label>{{ $t("protein") }}</label>
    </div>
    <div class="sb-group-input" style="width: 300px; margin: 2.5rem auto">
      <input v-model="food.fat" type="number" name="fat" required />
      <span class="sb-bar"></span>
      <label>{{ $t("fat") }}</label>
    </div>
    <div class="sb-group-input" style="width: 300px; margin: 2.5rem auto">
      <input
        v-model="food.carbohydrate"
        type="number"
        name="carbohydrate"
        required
      />
      <span class="sb-bar"></span>
      <label>{{ $t("carbohydrate") }}</label>
    </div>
    <div class="sb-group-input" style="width: 300px; margin: 2.5rem auto">
      <input
        v-model="food.dietaryFibre"
        type="number"
        name="food_dt_fibre"
        required
      />
      <span class="sb-bar"></span>
      <label>{{ $t("food_dt_fibre") }}</label>
    </div>
    <div style="display: flex; justify-content: center; margin-top: 2rem">
      <Button class="btn-yellow" @click="addFood">
        <FontAwesomeIcon
          :icon="['fas', 'fa-add']"
          style="height: 24px; width: 24px; margin-right: 5px"
        />
        {{ $t("button.addCustomFood") }}
      </Button>
    </div>
  </Dialog>
</template>

<style scoped></style>
