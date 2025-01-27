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
  const updateRow = (row: weightedFoodItem) => {
    if (!selectedProducts.value.some((item: any) => item.id === row.id)) {
      selectedProducts.value.push(row);
      row.weight = 1.0;

      // To trigger re-rendering
      selectedProducts.value = [...selectedProducts.value];
      return true; //Return true to represent successful adding
    } else {
      // 如果已經選中了，則從 selectedProducts 移除
      selectedProducts.value = selectedProducts.value.filter(
        (item: any) => item.id !== row.id
      );
      console.log("item unselected!");

      // 重新賦值，觸發重新渲染
      selectedProducts.value = [...selectedProducts.value];
      return false;
    }
  };
  return {
    products,
    selectedProducts,
    foodTableLoaded,
    loadTableData,
    updateRow,
  };
});
