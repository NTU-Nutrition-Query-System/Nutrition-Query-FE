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
import MultiSelect from "primevue/multiselect";
import { useToast } from "primevue/usetoast";
import type {
  foodItem,
  filterOption,
  weightedFoodItem,
} from "@/interfaces/Calculator";
import { useProductStore } from "@/stores/productStore";
import StandardSizeDialog from "./StandardSizeDialog.vue";
import CustomFoodWindow from "./CustomFoodWindow.vue";

const dialogVisible = ref(false);

const emit = defineEmits(["updateSelectedData", "update:visible"]);
const productStore = useProductStore();

const classClicked = (item: { image: string; name: string }, index: number) => {
  dialogVisible.value = true;
  productStore.selectedClass = index;

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
    name: "客製化",
    image: new URL("@/assets/imgs/girl_square.png", import.meta.url).href,
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
  productStore.clearFilters();
};
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
      console.log("All items: ", index, categories[index]);
      return productStore.selectedProducts.length;
    } else if (categories[index].name === "客製化") {
      console.log("Custom: ", index, categories[index]);
      return productStore.selectedProducts.length;
    }
    return productStore.selectedProducts.filter(
      (product: foodItem) => product.class === categories[index].name
    ).length;
  };
});

onMounted(() => {
  console.log("Food Table OnMounted");
  const ret = categories.map((category) =>
    productStore.products.filter((item) => item.class === category.name)
  );
  ret[ret.length - 1] = productStore.products; //for the class 'All items'
  productStore.productsFilterByCategories = ret;
});
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
      <Toast position="top-center" :baseZIndex="12" style="width: 20rem" />

      <DataTable
        :selection="productStore.selectedProducts"
        :value="productStore.filteredData"
        :globalFilterFields="['item', 'class']"
        :filters="productStore.filters"
        dataKey="id"
        tableStyle="min-width: 50rem"
        paginator
        :rows="10"
        @row-click="itemSelect"
        rowHover
        highlightOnSelect
      >
        <template #header>
          <div style="
            display: flex;
            align-items: center;
            justify-content: space-between;">
              <IconField>
                <InputIcon class="pi pi-search" style="margin-right: 1rem" />
                <InputText
                  v-model="productStore.filters['global'].value"
                  placeholder="Keyword Search"
                />
              </IconField>
              <div style="
                  display: flex;
                  align-items: center;">
                <CustomFoodWindow v-show="selectedCategory.name === '客製化'" />
                <StandardSizeDialog />
              </div>
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
          :showFilterMatchModes="false"
          :showApplyButton="false"
          :showClearButton="false"
        >
        </Column>
        <Column
          field="unit"
          :header="$t('food_unit')"
          style="width: 0.3%"
        ></Column>
        <Column
          field="gram"
          :header="$t('food_gram')"
          style="width: 0.3%"
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
                backgroundColor: productStore.getColor(data.calories, 0, 550),
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
                backgroundColor: productStore.getColor(
                  data.carbohydrate,
                  0,
                  50
                ),
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
                backgroundColor: productStore.getColor(data.protein, 0, 25),
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
                backgroundColor: productStore.getColor(data.fat, 0, 25),
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
                backgroundColor: productStore.getColor(
                  data.dietary_fibre,
                  0,
                  25
                ),
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

      <template #footer>
        <Button
          :label="$t('button.confirm')"
          icon="pi pi-check"
          style="
            margin-right: 0rem;
            margin-top: 1rem;
            background-color: var(--primary-color);
            border: none;
            color: black;
          "
          @click="dialogVisible = false"
        />
      </template>
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
              border: 0;
              margin: 0 0;
              font-size: 20px;
              color: #333333;
              background-color: #f5c332;
            "
            :label="$t('button.open')"
            @click="classClicked(item, index)"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<style>
.p-dialog .p-dialog-title {
  text-align: center;
  flex-grow: 1;
  line-height: 120%;
  font-size: 22px;
  letter-spacing: -1px;
}

.p-dialog .p-dialog-header {
  padding: 10px;
}

.p-datatable-header-cell[role="columnheader"] {
  background-color: var(--primary-color);
}

.p-dialog-footer {
  padding-bottom: 10px !important;
}

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
