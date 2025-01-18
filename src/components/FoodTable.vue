<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, watch, computed, onMounted, toValue } from "vue";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import OverlayBadge from 'primevue/overlaybadge';
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional
import Card from "primevue/card";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import Dropdown from "@/primevue/dropdown";
import Tag from "@/primevue/tag";
import { useToast } from "primevue/usetoast";
import { FilterMatchMode } from "@primevue/core/api";
import type { foodItem } from "@/interfaces/Calculator";
import { getTableData } from "@/apis/tableData";
import { fakeProducts } from "@/assets/fakeData";
import { idText } from "typescript";
import {
  proteinOption,
  carbOption,
  caloriesOption,
  fatOption,
  proteinRange,
  carbRange,
  caloriesRange,
  fatRange,
  proteinFilterOptions,
  carbFilterOptions,
  caloriesFilterOptions,
  fatFilterOptions,
  filters,
  clearFilter,
  subclassOption,
  subclassOptions,
} from "@/components/CategoriesData";
const props = defineProps({
  selectedProduct: {
    type: Array as () => foodItem[],
    required: true,
  },
  products: {
    type: Array as () => foodItem[],
    required: true,
  },
});
const FoodTableSelectedProducts = ref<foodItem[]>([]);
const dialogVisible = ref(false);
const selectedClass = ref<number>(0);
const emit = defineEmits(["updateSelectedData", "update:visible"]);

const productsFilterByCategories = ref<foodItem[][]>([]);

const classClicked = (item: { image: string; name: string }, index: number) => {
  dialogVisible.value = true;
  selectedClass.value = index;
  FoodTableSelectedProducts.value = props.selectedProduct;
  selectedCategory.value.image = item.image;
  selectedCategory.value.name = item.name;
};

const toast = useToast();

const categories = [
  {
    name: "中式餐點",
    image: new URL("@/assets/imgs/ClassChineseMeal.jpg", import.meta.url).href,
  },
  {
    name: "西式餐點",
    image: new URL("@/assets/imgs/ClassWesternMeal.jpg", import.meta.url).href,
  },
  {
    name: "飯糰壽司類",
    image: new URL("@/assets/imgs/ClassRiceBall.jpg", import.meta.url).href,
  },
  {
    name: "蛋肉類",
    image: new URL("@/assets/imgs/ClassMeatEgg.jpg", import.meta.url).href,
  },
  {
    name: "蔬菜類",
    image: new URL("@/assets/imgs/ClassVegetabale.jpg", import.meta.url).href,
  },
  {
    name: "水果類",
    image: new URL("@/assets/imgs/ClassFruit.jpg", import.meta.url).href,
  },
  {
    name: "麵包蛋糕類",
    image: new URL("@/assets/imgs/ClassBreadCake.jpg", import.meta.url).href,
  },
  {
    name: "飲品",
    image: new URL("@/assets/imgs/ClassDrink.jpg", import.meta.url).href,
  },
  {
    name: "油脂與堅果種子類",
    image: new URL("@/assets/imgs/ClassOilNuts.jpg", import.meta.url).href,
  },
  {
    name: "零食類",
    image: new URL("@/assets/imgs/ClassSnack.jpg", import.meta.url).href,
  },
  {
    name: "醬料類",
    image: new URL("@/assets/imgs/ClassDressing.jpg", import.meta.url).href,
  },
  {
    name: "全部",
    image: new URL("@/assets/imgs/girl_square.png", import.meta.url).href,
  },
];

const selectedCategory = ref<{ name: string; image: string }>({
  name: "",
  image: "",
});

const closeDialog = () => {
  emit("updateSelectedData", FoodTableSelectedProducts.value);
  clearFilter();
  console.log("Close Result");
  console.log(FoodTableSelectedProducts.value);
};
const itemSelect = (e: any) => {
  console.log("item selected!");
  console.log(e);
  toast.add({
    severity: "success",
    summary: "",
    detail: `${e?.data.item} is added`,
    life: 1000,
  });
};
const computeNumberOfItem = computed(() => {
  return (index: number): number => {
    if (!props.selectedProduct || !categories[index]) {
      return 0; // 如果資料不存在，返回 0
    }
    if (categories[index].name === "全部") {
      return props.selectedProduct.length;
    }
    return props.selectedProduct.filter(
      (product: foodItem) => product.class === categories[index].name
    ).length;
  };
});
const itemUnselect = (e: any) => {
  console.log("item unselected!");
  console.log(e);
  toast.add({
    severity: "warn",
    summary: "",
    detail: `${e?.data.item} is removed`,
    life: 2000,
  });
};
const selectAll = (e: any) => {
  console.log("select all");
  toast.add({
    severity: "success",
    detail: `${categories[selectedClass.value].name} is added`,
    life: 2000,
  });
};
const unselectAll = (e: any) => {
  console.log("select all");
  toast.add({
    severity: "warn",
    detail: `${categories[selectedClass.value].name} is removed`,
    life: 2000,
  });
};
const getColor = (value: number, min_val: number, max_val: number) => {
  const min = min_val;
  const max = max_val;

  // Calculate the percentage between min and max values (0 to 1)
  const percentage = (value - min) / (max - min);

  // Define the color transitions based on the percentage
  const colors = [
    { r: 76, g: 232, b: 90 }, // #4CE85A
    { r: 224, g: 220, b: 72 }, // #E0DC48
    { r: 242, g: 123, b: 39 }, // #F27B27
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

onMounted(() => {
  console.log("Food Table OnMounted");
  console.log(props.products);
  console.log(subclassOptions.value[0]);
  console.log(proteinFilterOptions.value);
  const ret = categories.map((category) =>
    props.products.filter((item) => item.class === category.name)
  );
  ret[ret.length - 1] = props.products;
  productsFilterByCategories.value = ret;
});
watch(selectedClass, (nv) => {
  console.log("Selected Class");
  console.log(selectedClass.value);
  console.log(subclassOptions.value[selectedClass.value]);
  console.log(nv);
});
const closeFilter = () => {
  console.log("Close filter");
  //Clicked twice to close the filter
  document.body.click(); // 自動關閉 filter popup
  document.body.click();
};
</script>
<template>
  <head> </head>

  <div>
    <Dialog
      v-model:visible="dialogVisible"
      :modal="true"
      @hide="closeDialog"
      :header="selectedCategory.name"
      style="overflow-x: auto; width: 90%"
    >
      <Toast position="top-center" baseZIndex="12" style="width: 20rem" />

      <DataTable
        v-model:selection="FoodTableSelectedProducts"
        :key="props.selectedProduct"
        :value="productsFilterByCategories[selectedClass]"
        :globalFilterFields="['item', 'class']"
        :filters="filters"
        dataKey="id"
        tableStyle="min-width: 50rem"
        filterDisplay="menu"
        paginator
        :rows="10"
        @row-select="itemSelect"
        @row-unselect="itemUnselect"
        @row-select-all="selectAll"
        @row-unselect-all="unselectAll"
        rowHover
      >
        <template #header>
          <div>
            <IconField>
              <InputIcon class="pi pi-search" style="margin-right: 1rem" />
              <InputText
                v-model="filters['global'].value"
                placeholder="Keyword Search"
              />
            </IconField>
          </div>
        </template>

        <Column selectionMode="multiple" style="width: 0.1%"></Column>
        <Column
          field="item"
          :header="$t('food_item')"
          style="min-width: 150px; width: 1%"
        ></Column>
        <Column
          field="subclass"
          :header="$t('food_class')"
          style="width: 1%"
          :filter="true"
          filterField="subclass"
          :showFilterMatchModes="false"
          :showApplyButton="false"
          :showClearButton="false"
        >
          <template #filter="{ field, filterModel, filterCallback }">
            <Dropdown
              v-model="subclassOption"
              :options="subclassOptions[selectedClass]"
              optionLabel="name"
              placeholder="Any"
              @change="closeFilter"
              showClear
            />
          </template>
        </Column>
        <Column
          field="gram"
          :header="$t('food_gram')"
          style="width: 0.5%"
        ></Column>
        <Column
          sortable
          field="calories"
          :header="$t('calories')"
          :filter="true"
          filterField="calories"
          :showFilterMatchModes="false"
          :showApplyButton="false"
          :showClearButton="false"
          style="width: 0.5%"
        >
          <template #body="{ data }">
            <div
              :style="{
                backgroundColor: getColor(data.calories, 0, 550),
                color: 'black',
                padding: '10px',
                borderRadius: '5px',
                textAlign: 'center',
              }"
            >
              {{ data.calories }}
            </div>
          </template>
          <template #filter="{ field, filterModel, filterCallback }">
            <Dropdown
              v-model="caloriesOption"
              :options="caloriesFilterOptions"
              optionLabel="name"
              placeholder="Any"
              @change="closeFilter"
              showClear
            />
          </template>
        </Column>
        <Column
          sortable
          field="carbohydrate"
          :header="$t('carbohydrate')"
          :filter="true"
          filterField="carbohydrate"
          :showFilterMatchModes="false"
          :showApplyButton="false"
          :showClearButton="false"
          style="width: 0.5%"
        >
          <template #body="{ data }">
            <div
              :style="{
                backgroundColor: getColor(data.carbohydrate, 0, 50),
                color: 'black',
                padding: '10px',
                borderRadius: '5px',
                textAlign: 'center',
              }"
            >
              {{ data.carbohydrate }}
            </div>
          </template>
          <template #filter="{ field, filterModel, filterCallback }">
            <Dropdown
              v-model="carbOption"
              :options="carbFilterOptions"
              optionLabel="name"
              placeholder="Any"
              @change="closeFilter"
              showClear
            />
          </template>
        </Column>
        <Column
          sortable
          field="protein"
          :header="$t('protein')"
          :filter="true"
          filterField="protein"
          :showFilterMatchModes="false"
          :showApplyButton="false"
          :showClearButton="false"
          style="width: 0.5%"
        >
          <template #body="{ data }">
            <div
              :style="{
                backgroundColor: getColor(data.protein, 0, 25),
                color: 'black',
                padding: '10px',
                borderRadius: '5px',
                textAlign: 'center',
              }"
            >
              {{ data.protein }}
            </div>
          </template>
          <template #filter="{ field, filterModel, filterCallback }">
            <Dropdown
              v-model="proteinOption"
              :options="proteinFilterOptions"
              optionLabel="name"
              placeholder="Any"
              @change="closeFilter"
              showClear
            >
              <template #option="slotProps">
                <div class="flex items-center gap-2">
                  <span>{{ slotProps.option.name }}</span>
                </div>
              </template>
            </Dropdown>
          </template>
        </Column>
        <Column
          sortable
          field="fat"
          :header="$t('fat')"
          :filter="true"
          :showFilterMatchModes="false"
          filterField="fat"
          :showApplyButton="false"
          :showClearButton="false"
          style="width: 0.5%"
        >
          <template #body="{ data }">
            <div
              :style="{
                backgroundColor: getColor(data.fat, 0, 25),
                color: 'black',
                padding: '10px',
                borderRadius: '5px',
                textAlign: 'center',
              }"
            >
              {{ data.fat }}
            </div>
          </template>
          <template #filter="{ field, filterModel, filterCallback }">
            <Dropdown
              v-model="fatOption"
              :options="fatFilterOptions"
              optionLabel="name"
              placeholder="Any"
              @change="closeFilter"
              showClear
            >
              <template #option="slotProps">
                <div class="flex items-center gap-2">
                  <span>{{ slotProps.option.name }}</span>
                </div>
              </template>
            </Dropdown>
          </template>
        </Column>

        <Column
          sortable
          field="dietary_fibre"
          :header="$t('food_dt_fibre')"
          :filter="true"
          :showFilterMatchModes="false"
          filterField="dietary_fibre"
          :showApplyButton="false"
          :showClearButton="false"
          style="width: 0.5%"
        >
          <template #body="{ data }">
            <div
              :style="{
                backgroundColor: getColor(data.dietary_fibre, 0, 25),
                color: 'black',
                padding: '10px',
                borderRadius: '5px',
                textAlign: 'center',
              }"
            >
              {{ data.dietary_fibre }}
            </div>
          </template>
        </Column>
      </DataTable>
    </Dialog>
  </div>
  <div class="card-container">
    <Card
      class="card"
      v-for="(item, index) in categories"
      @click="classClicked(item, index)"
    >
      <template #title>
        <div style="display: flex">
          <div style="text-align: center">
            <span>{{ categories[index].name }}</span>
            <span style="color: red">({{ computeNumberOfItem(index) }})</span>
          </div>
        </div>
      </template>
      <template #content>
        <div style="width: 50%; margin-left: auto; margin-right: auto">
          <img
            :src="item.image"
            alt="Category Image"
            style="
              width: 100%;
              height: auto;
              object-fit: cover;
              justify-content: center;
            "
          />
        </div>
      </template>
      <template #footer>
        <div>
          <Button
            style="display: flex; width: 100%"
            label="Open"
            @click="classClicked(item, index)"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<style>
.disabled-datatable {
  pointer-events: none;
  opacity: 0.5;
}

.display-row {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.card {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
}
.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 5);
  background-color: rgba(255, 255, 255, 0.8);
}
.card-container {
  margin-top: 5rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1.5fr));
  gap: 20px;
  justify-content: center; /* Centers the cards in the container */
  /* border: solid; */
}

.card-container .Card {
  width: 80%; /* Ensures the cards take up full available width in each column */
}
.badge {
  top: -10px; /* 調整位置 */
  right: -10px; /* 調整位置 */
  border-radius: 50%;
  width: 10%;
  height: 24px;
  justify-content: left;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
