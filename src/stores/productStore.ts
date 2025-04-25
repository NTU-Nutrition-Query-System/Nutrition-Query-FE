import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import type {
  filterOption,
  foodItem,
  weightedFoodItem,
  nutrient,
} from "@/interfaces/Calculator";
import { FilterMatchMode } from "@primevue/core/api";

export const useProductStore = defineStore("productStore", () => {
  const products = ref<weightedFoodItem[]>([]);
  const selectedProducts = ref<weightedFoodItem[]>([]);
  const customProducts = ref<weightedFoodItem[]>([]);
  const customProductsCount = ref<number>(0);
  const dailyNeeds = ref<nutrient>();
  const foodTableLoaded = ref(false);
  const selectedOptions = ref();
  const filterOptions = ref([
    {
      name: "熱量",
      key: "calories",
      states: [
        { class: "calories", name: "低熱量", min: 0, max: 100 },
        { class: "calories", name: "中熱量", min: 101, max: 300 },
        { class: "calories", name: "高熱量", min: 301, max: 9999 },
      ],
    },
    {
      name: "蛋白質",
      key: "protein",
      states: [
        { class: "protein", name: "低蛋白", min: 0, max: 5 },
        { class: "protein", name: "中蛋白", min: 6, max: 15 },
        { class: "protein", name: "高蛋白", min: 16, max: 9999 },
      ],
    },
    {
      name: "醣類",
      key: "carbohydrate",
      states: [
        { class: "carbohydrate", name: "低醣類", min: 0, max: 20 },
        { class: "carbohydrate", name: "中醣類", min: 21, max: 50 },
        { class: "carbohydrate", name: "高醣類", min: 51, max: 9999 },
      ],
    },
    {
      name: "脂肪",
      key: "fat",
      states: [
        { class: "fat", name: "低脂肪", min: 0, max: 5 },
        { class: "fat", name: "中脂肪", min: 6, max: 15 },
        { class: "fat", name: "高脂肪", min: 16, max: 9999 },
      ],
    },
    {
      name: "膳食纖維",
      key: "dietary_fibre",
      states: [
        { class: "dietary_fibre", name: "低膳食纖維", min: 0, max: 2 },
        { class: "dietary_fibre", name: "中膳食纖維", min: 3, max: 6 },
        { class: "dietary_fibre", name: "高膳食纖維", min: 7, max: 9999 },
      ],
    },
  ]);

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const calculatorFilters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const loadTableData = async (getTableData: () => Promise<any[]>) => {
    const res = await getTableData(); //call api
    products.value = res;
    foodTableLoaded.value = true;
    products.value.forEach((product) => {
      product.weight = 1.0;
      product.is_customized = false;
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
      if (row.is_customized === true) {
        customProductsCount.value--;
      }
      // 重新賦值，觸發重新渲染
      selectedProducts.value = [...selectedProducts.value];
      return false;
    }
  };
  const getColor = (value: number, min_val: number, max_val: number) => {
    const min = min_val;
    const max = max_val;

    // Calculate the percentage between min and max values (0 to 1)
    const percentage = (value - min) / (max - min);

    // Define the color transitions based on the percentage
    const colors = [
      { r: 194, g: 242, b: 78 }, // #c2f24e
      { r: 255, g: 210, b: 28 }, // #ffd21c
      { r: 255, g: 134, b: 80 }, // #ff8650
    ];

    // Choose a color based on the percentage value
    let r, g, b;
    if (percentage <= 0.33) {
      r = colors[0].r;
      g = colors[0].g;
      b = colors[0].b;
    } else if (percentage <= 0.66) {
      r = colors[1].r;
      g = colors[1].g;
      b = colors[1].b;
    } else {
      r = colors[2].r;
      g = colors[2].g;
      b = colors[2].b;
    }

    return `rgb(${r}, ${g}, ${b})`;
  };
  const removeTag = (index: number) => {
    selectedOptions.value.splice(index, 1);
  };
  const selectedClass = ref<number>(0);

  const productsFilterByCategories = ref<foodItem[][]>([]);
  // Clean the search field
  const clearFilters = () => {
    filters.value["global"].value = null;
    selectedOptions.value = [];
  };

  const calculatorFilteredData = computed(() => {
    if (!calculatorFilters.value.global.value) {
      return [];
    }

    const searchText = calculatorFilters.value.global.value;
    console.log(searchText);
    return products.value.filter((product) =>
      ["item", "class"].some((key) =>
        String((product as Record<string, any>)[key]).includes(searchText)
      )
    );
  });
  const filteredData = computed(() => {
    // 如果 selectedOptions 為 undefined 或空陣列，則返回原始資料
    if (!selectedOptions.value || selectedOptions.value.length === 0) {
      return productsFilterByCategories.value[selectedClass.value];
    }

    // 使用 reduce 來遍歷每個 selectedOptions 並篩選資料
    return selectedOptions.value.reduce(
      (filteredItems: foodItem[], option: filterOption) => {
        // 找出符合條件的項目
        const filtered = productsFilterByCategories.value[
          selectedClass.value
        ].filter((item) => {
          switch (option.class) {
            case "protein":
              return item.protein >= option.min && item.protein <= option.max;
            case "calories":
              return item.calories >= option.min && item.calories <= option.max;
            case "carbohydrate":
              return (
                item.carbohydrate >= option.min &&
                item.carbohydrate <= option.max
              );
            case "fat":
              return item.fat >= option.min && item.fat <= option.max;
            case "dietary_fibre":
              return (
                item.dietary_fibre >= option.min &&
                item.dietary_fibre <= option.max
              );
            default:
              return true; // 若不存在對應 class，則保留該項目
          }
        });

        // 將符合條件的項目與之前的結果合併，並去除重複項目
        return [...new Set([...filteredItems, ...filtered])];
      },
      [] // 初始為空陣列，表示沒有任何篩選條件
    );
  });

  const setDailyNeeds = (data: nutrient) => {
    dailyNeeds.value = data;
  };


  return {
    removeTag,
    loadTableData,
    updateRow,
    getColor,
    clearFilters,
    setDailyNeeds,

    products,
    selectedProducts,
    customProductsCount,
    foodTableLoaded,
    filters,
    selectedOptions,
    filterOptions,
    filteredData,
    productsFilterByCategories,
    selectedClass,
    calculatorFilteredData,
    calculatorFilters,
    dailyNeeds,
  };
});
