<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import Column from "primevue/column";
import { FilterMatchMode } from "@primevue/core/api";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional
import { useI18n } from "vue-i18n";
import Card from "primevue/card";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Dropdown from "@/primevue/dropdown";
import MultiSelect from "@/primevue/multiselect";
import Select from "@/primevue/select";
import type { foodItem } from "@/interfaces/Calculator";
import { fakeProducts } from "@/assets/fakeData";
const props = defineProps({
  selectedProduct: {
    type: Array as () => foodItem[],
    required: true,
  },
});
const FoodTableSelectedProduct = ref();
const dialogVisible = ref(false);
const selectedClass = ref(0);
const emit = defineEmits(["updateSelectedData", "update:visible"]);
type Range = {
  [key: string]: [number, number]; // For keys like "low", "medium", etc.
  default: [number, number]; // A required fallback range
};

const computeRange = (optionValue: string, ranges: Range) => {
  if (optionValue === undefined) return ranges.default;
  return ranges[optionValue] || ranges.default;
};
const proteinRange = computed(() =>
  computeRange(proteinOption.value?.value, {
    low: [0, 18],
    medium: [18, 30],
    high: [30, 1000],
    default: [0, 1000],
  })
);

const carbRange = computed(() =>
  computeRange(carbOption.value?.value, {
    low: [0, 50],
    medium: [50, 100],
    high: [100, 1000],
    default: [0, 1000],
  })
);

const caloriesRange = computed(() =>
  computeRange(caloriesOption.value?.value, {
    low: [0, 200],
    medium: [200, 500],
    high: [500, 1000],
    default: [0, 1000],
  })
);

const fatRange = computed(() =>
  computeRange(fatOption.value?.value, {
    low: [0, 10],
    medium: [10, 20],
    high: [20, 1000],
    default: [0, 1000],
  })
);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  protein: { value: proteinRange, matchMode: FilterMatchMode.BETWEEN },
  carbohydrate: { value: carbRange, matchMode: FilterMatchMode.BETWEEN },
  calories: { value: caloriesRange, matchMode: FilterMatchMode.BETWEEN },
  fat: { value: fatRange, matchMode: FilterMatchMode.BETWEEN },
});

const productsFilterByCategories = computed(() => {
  if (!categories || !Array.isArray(categories) || !fakeProducts.value) {
    return [];
  }

  return categories.map((category) =>
    fakeProducts.value.filter((item) => item.class === category.name)
  );
});
const classClicked = (item: { image: string; name: string }, index: number) => {
  dialogVisible.value = true;
  selectedClass.value = index;
  FoodTableSelectedProduct.value = props.selectedProduct;
  console.log(item);
  selectedCategory.value.image = item.image;
  selectedCategory.value.name = item.name;
};
const proteinOption = ref();
const carbOption = ref();
const caloriesOption = ref();
const fatOption = ref();
const proteinFilterOptions = ref([
  { name: "< 18(g)", value: "low" },
  { name: "18~30(g)", value: "medium" },
  { name: "> 30(g)", value: "high" },
]);

const carbFilterOptions = ref([
  { name: "< 50(g)", value: "low" },
  { name: "50~100(g)", value: "medium" },
  { name: "> 100(g)", value: "high" },
]);

const caloriesFilterOptions = ref([
  { name: "< 200(cal)", value: "low" },
  { name: "200~500(cal)", value: "medium" },
  { name: "> 500(cal)", value: "high" },
]);

const fatFilterOptions = ref([
  { name: "< 10(g)", value: "low" },
  { name: "10~20(g)", value: "medium" },
  { name: "> 20(g)", value: "high" },
]);

const categories = [
  {
    name: "三明治、漢堡類",
    image: new URL("@/assets/imgs/sandwich_burger.svg", import.meta.url).href,
  },
  {
    name: "水果",
    image: new URL("@/assets/imgs/fruit.svg", import.meta.url).href,
  },
  {
    name: "肉類",
    image: new URL("@/assets/imgs/meat.svg", import.meta.url).href,
  },
  {
    name: "青菜類",
    image: new URL("@/assets/imgs/vegetables.svg", import.meta.url).href,
  },
  {
    name: "點心",
    image: new URL("@/assets/imgs/snacks.svg", import.meta.url).href,
  },
  {
    name: "飯糰壽司類",
    image: new URL("@/assets/imgs/snacks.svg", import.meta.url).href,
  },
  {
    name: "飲品",
    image: new URL("@/assets/imgs/snacks.svg", import.meta.url).href,
  },
  {
    name: "燕麥類",
    image: new URL("@/assets/imgs/snacks.svg", import.meta.url).href,
  },
  {
    name: "蛋與蛋餅類",
    image: new URL("@/assets/imgs/snacks.svg", import.meta.url).href,
  },
  {
    name: "醬料類",
    image: new URL("@/assets/imgs/snacks.svg", import.meta.url).href,
  },
  {
    name: "麵包蛋糕類",
    image: new URL("@/assets/imgs/snacks.svg", import.meta.url).href,
  },
  {
    name: "麵飯類",
    image: new URL("@/assets/imgs/snacks.svg", import.meta.url).href,
  },
];
const selectedCategory = ref<{ name: string; image: string }>({
  name: "",
  image: "",
});
const clearFilter = () => {
  caloriesOption.value =
    carbOption.value =
    proteinOption.value =
    fatOption.value =
      undefined;
};
const closeDialog = () => {
  emit("updateSelectedData", FoodTableSelectedProduct.value);
  clearFilter();
  console.log("Close Result");
  console.log(FoodTableSelectedProduct.value);
};
onMounted(() => {
  console.log("Food Table OnMounted");
  console.log(props.selectedProduct);
});

const closeFilter = () => {
  document.body.click(); // 自動關閉 filter popup
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
    >
      <div style="width: 100%; height: 5rem">
        <img
          :src="selectedCategory.image"
          alt="Category"
          style="
            height: 10rem;
            float: right;
            position: relative;
            z-index: 10;
            margin-bottom: -1rem;
            margin-right: 0rem;
            /* border: solid; */
          "
        />
      </div>

      <DataTable
        v-model:selection="FoodTableSelectedProduct"
        :key="props.selectedProduct"
        :value="productsFilterByCategories[selectedClass]"
        :globalFilterFields="['item', 'class']"
        :filters="filters"
        dataKey="id"
        tableStyle="min-width: 50rem"
        filterDisplay="menu"
        rowHover
      >
        <template #header>
          <div>
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText
                v-model="filters['global'].value"
                placeholder="Keyword Search"
              />
            </IconField>
          </div>
        </template>

        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column field="item" :header="$t('food_item')"></Column>
        <Column field="class" :header="$t('food_class')"></Column>
        <Column field="gram" :header="$t('food_gram')"></Column>
        <Column
          sortable
          field="calories"
          :header="$t('calories')"
          :filter="true"
          filterField="calories"
          :showFilterMatchModes="false"
          :showApplyButton="false"
          :showClearButton="false"
        >
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
        >
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
        >
          <template #body="{ data }">
            {{ data.protein }}
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
        >
          <template #body="{ data }">
            {{ data.fat }}
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
      </DataTable>
    </Dialog>
  </div>
  <div class="card-container">
    <Card
      style="width: 100%; border: 1px solid #ccc; border-radius: 8px"
      v-for="(item, index) in categories"
    >
      <template #title>
        <div style="text-align: center">
          {{ categories[index].name }}
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
</style>
