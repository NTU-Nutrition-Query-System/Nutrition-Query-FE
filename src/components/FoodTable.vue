<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, watch, computed, onMounted } from "vue";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import OverlayBadge from "primevue/overlaybadge";
import Column from "primevue/column";
import Card from "primevue/card";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import type { foodItem } from "@/interfaces/Calculator";
import { useProductStore } from "@/stores/productStore";
import SizeReference from "./SizeReference.vue";

const { locale } = useI18n();

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
    zh: "中式餐點",
    en: "Chinese-style meal",
    image: new URL(
      "@/assets/images/foodClasses/ClassChineseMeal.jpg",
      import.meta.url
    ).href,
  },
  {
    zh: "西式餐點",
    en: "Western-style meal",
    image: new URL(
      "@/assets/images/foodClasses/ClassWesternMeal.jpg",
      import.meta.url
    ).href,
  },
  {
    zh: "飯糰壽司類",
    en: "Sushi and rice ball",
    image: new URL(
      "@/assets/images/foodClasses/ClassRiceBall.jpg",
      import.meta.url
    ).href,
  },
  {
    zh: "蛋肉類",
    en: "Egg and meat",
    image: new URL(
      "@/assets/images/foodClasses/ClassMeatEgg.jpg",
      import.meta.url
    ).href,
  },
  {
    zh: "蔬菜類",
    en: "Vegetable",
    image: new URL(
      "@/assets/images/foodClasses/ClassVegetabale.jpg",
      import.meta.url
    ).href,
  },
  {
    zh: "水果類",
    en: "Fruit",
    image: new URL(
      "@/assets/images/foodClasses/ClassFruit.jpg",
      import.meta.url
    ).href,
  },
  {
    zh: "麵包蛋糕類",
    en: "Bread and cake",
    image: new URL(
      "@/assets/images/foodClasses/ClassBreadCake.jpg",
      import.meta.url
    ).href,
  },
  {
    zh: "飲品",
    en: "Drink",
    image: new URL(
      "@/assets/images/foodClasses/ClassDrink.jpg",
      import.meta.url
    ).href,
  },
  {
    zh: "油脂與堅果種子類",
    en: "Oil and nuts",
    image: new URL(
      "@/assets/images/foodClasses/ClassOilNuts.jpg",
      import.meta.url
    ).href,
  },
  {
    zh: "零食類",
    en: "Snack",
    image: new URL(
      "@/assets/images/foodClasses/ClassSnack.jpg",
      import.meta.url
    ).href,
  },
  {
    zh: "醬料類",
    en: "Condiment",
    image: new URL(
      "@/assets/images/foodClasses/ClassDressing.jpg",
      import.meta.url
    ).href,
  },
  {
    zh: "全部",
    en: "All items",
    image: new URL("@/assets/images/foodClasses/all.png", import.meta.url).href,
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
  // console.log("Row clicked");
  // console.log(e);
  const success = productStore.updateRow(e.data);
  if (success) {
    //Toast 提示
    toast.add({
      severity: "success",
      summary: "",
      detail: `${e?.data.name} is added`,
      life: 1000,
    });
  } else {
    toast.add({
      severity: "warn",
      summary: "",
      detail: `${e?.data.name} is removed`,
      life: 2000,
    });
  }
};

const computeNumberOfItem = computed(() => {
  return (index: number): number => {
    if (!productStore.selectedProducts || !categories[index]) {
      return 0; // 如果資料不存在，返回 0
    }
    if (categories[index].zh === "全部") {
      // console.log("All items: ", index, categories[index]);
      return productStore.selectedProducts.length;
    } else if (categories[index].zh === "客製化") {
      // console.log("Custom: ", index, categories[index]);
      return productStore.selectedProducts.length;
    }
    return productStore.selectedProducts.filter(
      (product: foodItem) => product.class === index + 1
    ).length;
  };
});

// === 圖片預覽 ===

const displayDialog = ref<boolean>(false);
const selectedImage = ref<string>("");
const dialogTitle = ref<string>("");
const hoveredImage = ref<string>(""); // 新增懸停圖片的 ref
const hoverPosition = ref({ x: 0, y: 0 });

const handleImageClick = async (data: any) => {
  // console.log("Image clicked for ID:", data.id);
  // console.log("Photo URL:", data.photo);
  selectedImage.value = data.imageUri;
  dialogTitle.value = data.name;
  displayDialog.value = true;
};

const handleMouseover = async (event: MouseEvent, photoUrl: string) => {
  hoveredImage.value = photoUrl; // 設定懸停時要顯示的圖片 URL
  hoverPosition.value = { x: event.clientX + 10, y: event.clientY + 10 }; // 設定懸停圖片的位置
};

const handleMouseleave = () => {
  hoveredImage.value = ""; // 清空懸停圖片 URL，隱藏預覽
};

onMounted(() => {
  // console.log("Food Table OnMounted");
  const ret = categories.map((category, index) =>
    productStore.products.filter((item) => item.class === index + 1)
  );
  ret[ret.length - 1] = productStore.products; //for the class 'All items'
  productStore.productsFilterByCategories = ret;
});

watch(() => productStore.lastUpdated, () => {
  const ret = categories.map((category, index) =>
    productStore.products.filter((item) => item.class === index + 1)
  );
  ret[ret.length - 1] = productStore.products; //for the class 'All items'
  productStore.productsFilterByCategories = ret;
});
</script>

<template>
  <Dialog
    v-model:visible="displayDialog"
    :header="dialogTitle"
    :modal="true"
    :style="{ width: '30vw' }"
    :dismissableMask="true"
  >
    <img v-if="selectedImage" :src="selectedImage" style="width: 100%" />
  </Dialog>

  <div
    v-if="hoveredImage"
    :style="{
      position: 'fixed',
      top: hoverPosition.y + 'px',
      left: hoverPosition.x + 'px',
      zIndex: 1000000,
      border: '1px solid #ccc',
      backgroundColor: 'white',
      padding: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    }"
  >
    <img :src="hoveredImage" style="max-width: 200px; max-height: 200px" />
  </div>

  <Dialog
    v-model:visible="dialogVisible"
    :modal="true"
    @hide="closeDialog"
    style="overflow-x: auto; width: 90%"
    :dismissableMask="true"
    :header="selectedCategory.name"
  >
    <Toast position="top-center" :baseZIndex="12" style="width: 20rem" />

    <DataTable
      :selection="productStore.selectedProducts"
      :value="productStore.filteredData"
      :globalFilterFields="['name', 'class']"
      :filters="productStore.filters"
      dataKey="order"
      tableStyle="min-width: 50rem"
      paginator
      :rows="10"
      @row-click="itemSelect"
      @row-select="itemSelect"
      @row-unselect="itemSelect"
      rowHover
      highlightOnSelect
    >
      <template #header>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <IconField>
            <InputIcon class="pi pi-search" style="margin-right: 1rem" />
            <InputText
              v-model="productStore.filters['global'].value"
              placeholder="Keyword Search"
            />
          </IconField>
          <div style="display: flex; align-items: center">
            <table class="display-row nutrition-desc">
              <thead>
              <tr>
                <td>Level</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="bg-low">
                  <span>{{ $t("page_content.nutritionNote.table.low") }}</span>
                </td>
                <td class="bg-mid">
                  <span>{{
                    $t("page_content.nutritionNote.table.medium")
                  }}</span>
                </td>
                <td class="bg-high">
                  <span>{{ $t("page_content.nutritionNote.table.high") }}</span>
                </td>
              </tr>
            </tbody>
            </table>
            <SizeReference/>
          </div>
        </div>
      </template>

      <Column selectionMode="multiple" style="width: 0.1%"></Column>
      <Column
        field="name"
        :header="$t('food_item')"
        style="min-width: 150px; width: 1%"
      >
        <template #body="rowData">
          <span>{{ rowData.data.name }}</span>
          <Button
            v-if="rowData.data.imageUri !== null"
            icon="pi pi-image"
            class="p-button-rounded p-button-sm"
            style="
              margin-left: 8px;
              background-color: var(--primary-color);
              color: black;
              border: none;
            "
            @click="handleImageClick(rowData.data)"
            @mouseover="
              (event) => handleMouseover(event, rowData.data.imageUri)
            "
            @mouseleave="handleMouseleave"
          />
        </template>
      </Column>
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
              backgroundColor: productStore.getColor(data.carbohydrate, 0, 50),
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
        field="dietaryFibre"
        :header="$t('food_dt_fibre')"
        :filter="true"
        :showFilterMatchModes="false"
        filterField="dietaryFibre"
        :showApplyButton="false"
        :showClearButton="false"
        style="width: 0.5%"
      >
        <template #body="{ data }">
          <div style="text-align: center">
            {{ data.dietaryFibre }}
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
  <div class="card-container">
    <Card
      class="food-class-card"
      v-for="(item, index) in categories"
      @click="
        classClicked(
          { image: item.image, name: locale === 'en' ? item.en : item.zh },
          index
        )
      "
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
            {{ locale === "en" ? categories[index].en : categories[index].zh }}
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
            @click="
              classClicked(
                {
                  image: item.image,
                  name: locale === 'en' ? item.en : item.zh,
                },
                index
              )
            "
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

.nutrition-desc {
  border-collapse: collapse;
  font-size: 16px;
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);

  th {
    background-color: var(--primary-color);
    color: #333;
    font-weight: bold;
    padding: 12px;
    border-bottom: 2px solid #ddd;
  }

  td {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }

  tr:nth-child(even) {
    background-color: #fcfcfc;
  }
}

.bg-high {
  color: "black";
  padding: "10px";
  border-radius: "5px";
  text-align: "center";
  background-color: #ff8650;
}
.bg-mid {
  color: "black";
  padding: "10px";
  border-radius: "5px";
  text-align: "center";
  background-color: #ffd21c;
}
.bg-low {
  color: "black";
  padding: "10px";
  border-radius: "5px";
  text-align: "center";
  background-color: #c2f24e;
}
</style>
