import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { foodItem, weightedFoodItem } from "@/interfaces/Calculator";
export const useProductStore = defineStore("productStore", () => {
  const products = ref<weightedFoodItem[]>([]);
  const selectedProducts = ref<weightedFoodItem[]>([]);
  const foodTableLoaded = ref(false);

  const loadTableData = async (getTableData: () => Promise<any[]>) => {
    const res = await getTableData(); //call api
    products.value = res;
    foodTableLoaded.value = true;
    products.value.forEach((product) => {
      product.weight = 1.0;
    });
  };
  return {
    products,
    selectedProducts,
    foodTableLoaded,
    loadTableData,
  };
});
