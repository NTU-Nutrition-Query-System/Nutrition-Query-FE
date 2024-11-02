
<script setup lang="ts">
import { ref, watch } from 'vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import { useI18n } from 'vue-i18n';
const selectedProduct = ref();

const emit = defineEmits(['update:selectedProduct']);
watch(selectedProduct, (newSelection) => {
  emit('update:selectedProduct', newSelection);
});

const fake_products = ref([
    
    { id:1, item: '醬燒烤雞三明治', class: '三明治、漢堡類', gram: 88, calories:181, carbohydrate: 3.7, fat:6.6, protein: 3.3},
    { id: 2, item: '火腿起司蛋三明治', class: '三明治、漢堡類', gram: 67, calories: 192, carbohydrate: 20.6, fat: 9.3, protein: 6.4 },
    { id: 3, item: '經典總匯三明治', class: '三明治、漢堡類', gram: 93, calories: 176, carbohydrate: 22.0, fat: 6.9, protein: 6.5 },
    { id: 4, item: '美式熱狗堡', class: '三明治、漢堡類', gram: 153, calories: 468, carbohydrate: 34.1, fat: 30.4, protein: 14.5 },
    { id: 5, item: '經典雙牛起司堡', class: '三明治、漢堡類', gram: 124, calories: 315, carbohydrate: 31.1, fat: 13.0, protein: 18.2 },
    { id: 6, item: '豬肉起司堡', class: '三明治、漢堡類', gram: 88, calories: 208, carbohydrate: 24.1, fat: 7.4, protein: 11.1 },
    { id: 7, item: '豬肉滿福堡加蛋', class: '三明治、漢堡類', gram: 87, calories: 387, carbohydrate: 28.0, fat: 21.0, protein: 23.0 },
    { id: 8, item: '豬肉滿福堡', class: '三明治、漢堡類', gram: 87, calories: 316, carbohydrate: 27.0, fat: 16.0, protein: 16.0 },
    { id: 9, item: '青蔬滿福堡', class: '三明治、漢堡類', gram: 87, calories: 289, carbohydrate: 28.0, fat: 12.0, protein: 18.0 },
    { id: 10, item: '火腿蛋堡', class: '三明治、漢堡類', gram: 87, calories: 309, carbohydrate: 31.0, fat: 14.0, protein: 16.0 },
    { id: 11, item: '吉士蛋堡', class: '三明治、漢堡類', gram: 87, calories: 288, carbohydrate: 30.0, fat: 13.0, protein: 13.0 },
    { id: 12, item: '麥香魚', class: '三明治、漢堡類', gram: 87, calories: 338, carbohydrate: 36.0, fat: 16.0, protein: 15.0 },
    { id: 13, item: '雙層牛肉吉士堡', class: '三明治、漢堡類', gram: 87, calories: 475, carbohydrate: 35.0, fat: 26.0, protein: 26.0 },
    { id: 14, item: '麥香雞', class: '三明治、漢堡類', gram: 87, calories: 387, carbohydrate: 45.0, fat: 17.0, protein: 14.0 },
    { id: 15, item: '雞蛋沙拉三明治', class: '三明治、漢堡類', gram: 90, calories: 199, carbohydrate: 23.9, fat: 8.1, protein: 7.6 },
    { id: 16, item: '紐澳良風味烤雞鮮蔬三明治', class: '三明治、漢堡類', gram: 111, calories: 291, carbohydrate: 23.1, fat: 16.5, protein: 12.4 },
    { id: 17, item: '豬肉起司蛋堡', class: '三明治、漢堡類', gram: 121, calories: 237, carbohydrate: 26.3, fat: 8.1, protein: 14.9 },
    { id: 18, item: '火腿蛋多穀貝果堡', class: '三明治、漢堡類', gram: 110, calories: 234, carbohydrate: 47.4, fat: 5.7, protein: 10.2 },
    { id: 19, item: '輕乳酪巧克力三明治', class: '三明治、漢堡類', gram: 76, calories: 174, carbohydrate: 25.8, fat: 5.5, protein: 5.4 },
    { id: 20, item: '火腿起司三明治', class: '三明治、漢堡類', gram: 100, calories: 323, carbohydrate: 38.0, fat: 15.0, protein: 9.0 },
    { id: 21, item: '火腿蛋三明治', class: '三明治、漢堡類', gram: 100, calories: 275, carbohydrate: 28.2, fat: 13.2, protein: 10.9 },
    { id: 22, item: '泰國芭樂(去蒂去籽)', class: '水果', gram: 160, calories: 69, carbohydrate: 15.5, fat: 0.2, protein: 1.3 },
    { id: 23, item: '黑珍珠蓮霧(去蒂去籽)', class: '水果', gram: 165, calories: 71.8, carbohydrate: 16.8, fat: 0.2, protein: 0.7 },
    { id: 24, item: '珍珠芭樂(去蒂去籽)', class: '水果', gram: 150, calories: 70.7, carbohydrate: 15.9, fat: 0.3, protein: 1.1 },
    { id: 25, item: '紅心芭樂(去蒂去籽)', class: '水果', gram: 150, calories: 69.4, carbohydrate: 16.1, fat: 0.2, protein: 0.8 },
    { id: 26, item: '富士蘋果(去籽)', class: '水果', gram: 130, calories: 64.1, carbohydrate: 15.5, fat: 0.1, protein: 0.3 },
    { id: 27, item: '青龍蘋果(去皮去籽)', class: '水果', gram: 120, calories: 70.7, carbohydrate: 16.6, fat: 0.6, protein: 0.4 },
    { id: 28, item: '櫻桃(去蒂去籽)', class: '水果', gram: 80, calories: 67, carbohydrate: 15.3, fat: 0.2, protein: 1.0 },
    { id: 29, item: '龍眼(去殼去籽)', class: '水果', gram: 90, calories: 72.9, carbohydrate: 16.1, fat: 0.5, protein: 1.0 },
    { id: 30, item: '龍眼乾', class: '水果', gram: 22, calories: 63, carbohydrate: 15.6, fat: 0.2, protein: 1.1 },
    { id: 31, item: '百香果(去皮)', class: '水果', gram: 140, calories: 65.1, carbohydrate: 15.0, fat: 3.4, protein: 3.1 },

]);

</script>
<template>
    <head>
        
    </head>
    <div class="FoodTable">
        <DataTable v-model:selection="selectedProduct" :value="fake_products" dataKey="id" tableStyle="min-width: 50rem">
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="item" :header="$t('food_item')"></Column>
            <Column field="class" :header="$t('food_class')"></Column>
            <Column field="gram" :header="$t('food_gram')"></Column>
            <Column field="calories" :header="$t('calories')"></Column>
            <Column field="carbohydrate" :header="$t('carbohydrate')"></Column>
            <Column field="protein" :header="$t('protein')"></Column>
            <Column field="fat" :header="$t('fat')"></Column>
        </DataTable>
    </div>
</template>


<style>
.disabled-datatable {
  pointer-events: none; /* 禁用所有交互 */
  opacity: 0.5; /* 調整透明度顯示禁用效果 */
}

.display-row {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

</style>

