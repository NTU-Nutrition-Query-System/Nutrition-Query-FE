<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, watch, computed, onMounted, toValue } from "vue";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import OverlayBadge from "primevue/overlaybadge";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional
import Card from "primevue/card";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import CascadeSelect from "primevue/cascadeselect";
import MultiSelect from "primevue/multiselect";
import { useToast } from "primevue/usetoast";
import type { foodItem, filterOption } from "@/interfaces/Calculator";
import { useProductStore } from "@/stores/productStore";
import { filters } from "@/components/CategoriesData";
const props = defineProps({});

const selectedFilterOption = ref();
const dialogVisible = ref(false);
const selectedClass = ref<number>(0);
const emit = defineEmits(["updateSelectedData", "update:visible"]);
const productStore = useProductStore();
const productsFilterByCategories = ref<foodItem[][]>([]);
const filteredData = computed(() => {
  console.log("Filter Changed!!");
  console.log(selectedOptions.value);

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
              item.carbohydrate >= option.min && item.carbohydrate <= option.max
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

const classClicked = (item: { image: string; name: string }, index: number) => {
  dialogVisible.value = true;
  selectedClass.value = index;

  selectedCategory.value.image = item.image;
  selectedCategory.value.name = item.name;
};
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

const closeDialog = () => {};
const itemSelect = (e: any) => {
  console.log("Row clicked");
  console.log(e);
  const success = productStore.updateRow(e.data);
  if (success) {
    //Toast 提示
    toast.add({
      severity: "success",
      summary: "",
      detail: `${e?.data.item} is added`,
      life: 1000,
    });
  } else {
    toast.add({
      severity: "warn",
      summary: "",
      detail: `${e?.data.item} is removed`,
      life: 2000,
    });
  }
};

const computeNumberOfItem = computed(() => {
  return (index: number): number => {
    if (!productStore.selectedProducts || !categories[index]) {
      return 0; // 如果資料不存在，返回 0
    }
    if (categories[index].name === "全部") {
      return productStore.selectedProducts.length;
    }
    return productStore.selectedProducts.filter(
      (product: foodItem) => product.class === categories[index].name
    ).length;
  };
});

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
const removeTag = (index: number) => {
  selectedOptions.value.splice(index, 1);
};
onMounted(() => {
  console.log("Food Table OnMounted");
  const ret = categories.map((category) =>
    productStore.products.filter((item) => item.class === category.name)
  );
  ret[ret.length - 1] = productStore.products; //for the class 'All items'
  productsFilterByCategories.value = ret;
});
watch(selectedClass, (nv) => {
  filters.value["global"].value = null;
});

const sel = ref([]);
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
      :dismissableMask="true"
    >
      <Toast position="top-center" baseZIndex="12" style="width: 20rem" />

      <DataTable
        :selection="productStore.selectedProducts"
        :value="filteredData"
        :globalFilterFields="['item', 'class']"
        :filters="filters"
        dataKey="id"
        tableStyle="min-width: 50rem"
        paginator
        :rows="10"
        @row-click="itemSelect"
        rowHover
        highlightOnSelect
      >
        <template #header>
          <div style="display: flex align-items-center">
            <IconField>
              <InputIcon class="pi pi-search" style="margin-right: 1rem" />
              <InputText
                v-model="filters['global'].value"
                placeholder="Keyword Search"
              />
            </IconField>
            <!-- <CascadeSelect
              style="width: 15rem"
              v-model="selectedOptions"
              :options="filterOptions"
              optionLabel="name"
              optionGroupLabel="name"
              :optionGroupChildren="['states']"
              placeholder="選擇要篩選的營養素!"
              showClear
            /> -->
            <MultiSelect
              v-model="selectedOptions"
              :options="filterOptions"
              optionLabel="name"
              optionGroupLabel="name"
              :optionGroupChildren="['states']"
              :showToggleAll="false"
              showClear
            ></MultiSelect>
            <div class="tags-container">
              <span
                v-for="(option, index) in selectedOptions"
                :key="index"
                class="tag"
                @click="removeTag(index)"
              >
                <Button :label="option.name" icon="pi pi-times"></Button>
              </span>
            </div>
            <Button
              :label="'Clear'"
              icon="pi pi-times"
              style="margin-left: 0rem"
              @click="selectedOptions = undefined"
            />
            <Button
              :label="$t('food_table.confirm')"
              icon="pi pi-check"
              style="margin-right: 0rem"
              @click="dialogVisible = false"
            />
          </div>
          <div></div>
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
          :showFilterMatchModes="false"
          :showApplyButton="false"
          :showClearButton="false"
        >
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
        </Column>
        <Column
          sortable
          field="protein"
          :header="$t('protein')"
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
      class="food-class-card"
      v-for="(item, index) in categories"
      @click="classClicked(item, index)"
    >
      <template #content>
        <div style="width: 100%; position: relative">
          <OverlayBadge
            v-if="computeNumberOfItem(index) > 0"
            :value="computeNumberOfItem(index)"
            size="xlarge"
            style="position: absolute; right: 0"
          />
          <img
            :src="item.image"
            alt="Category Image"
            style="object-fit: cover; justify-content: center"
          />
        </div>
        <div style="display: flex">
          <label
            style="
              width: 40%;
              margin: 0;
              margin-left: 5%;
              margin-right: 5%;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              font-size: 20px;
            "
          >
            {{ categories[index].name }}
          </label>
          <Button
            style="
              width: 50%;
              height: 4.5rem;
              border-radius: 0;
              margin: 0 0;
              font-size: 20px;
            "
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

.food-class-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
}

.food-class-card .p-card-body {
  padding: 0rem;
}

.food-class-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 5);
  background-color: rgba(255, 255, 255, 0.8);
}

.card-container {
  margin: 10%;
  margin-top: 3rem;
  /* margin-right: 0%; */
  width: 80%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 0.3fr));
  gap: 20px;
  justify-content: center; /* Centers the cards in the container */
  padding: 10px;
  /* border: solid; */
}

.card-container .Card {
  width: 100%; /* Ensures the cards take up full available width in each column */
}
</style>
