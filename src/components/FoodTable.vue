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
import { getTableData } from "@/apis/tableData";
import Dropdown from "@/primevue/dropdown";
import Tag from "@/primevue/tag";
import type { foodItem } from "@/interfaces/Calculator";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
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
  {
    name: "全部",
    image: new URL("@/assets/imgs/snacks.svg", import.meta.url).href,
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
watch(subclassOption, (nv) => {
  closeFilter();
});
const closeFilter = () => {
  console.log("Close filter");
  document.body.click(); // 自動關閉 filter popup
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
      style="overflow-x: auto; width: 90%"
    >
      <Toast position="top-center" baseZIndex="12" style="width: 20rem" />
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
        v-model:selection="FoodTableSelectedProducts"
        :key="props.selectedProduct"
        :value="productsFilterByCategories[selectedClass]"
        :globalFilterFields="['item', 'class']"
        :filters="filters"
        dataKey="id"
        tableStyle="min-width: 50rem"
        filterDisplay="menu"
        paginator
        scrollable
        scrollHeight="700px"
        selectionMode="multiple"
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

        <Column selectionMode="multiple" style="width: 1%"></Column>
        <Column
          field="item"
          :header="$t('food_item')"
          style="width: 10%"
        ></Column>
        <Column
          field="subclass"
          :header="$t('food_class')"
          style="width: 8%"
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
              @filter="console.log('Filter Changed!')"
              showClear
            />
          </template>
        </Column>
        <Column
          field="gram"
          :header="$t('food_gram')"
          style="width: 2%"
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
          style="width: 4%"
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
          style="width: 4%"
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
          style="width: 4%"
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
          style="width: 4%"
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
