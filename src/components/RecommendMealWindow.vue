<script setup lang="ts">
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const dialogVisible = ref(false);

const showDialog = () => {
    // Hide the dialog
    dialogVisible.value = true;
};
const closeDialog = () => {
    // Hide the dialog
    dialogVisible.value = false;
};

const RecommendMealData = ref([
  {
    id: 1,
    name: "家樂氏原味玉米片",
    category: "西式餐點",
    subcategory: "燕麥",
    calories: "114.0 kcal",
    carbs: 26.1,
    fat: 0.3,
    protein: 2.1
  },
  {
    id: 2,
    name: "全脂鮮奶",
    category: "飲品",
    subcategory: "乳品",
    calories: "151.6 kcal",
    carbs: 11.8,
    fat: 8.4,
    protein: 7.2
  },
  {
    id: 3,
    name: "奶皇包",
    category: "中式餐點",
    subcategory: "包子饅頭",
    calories: "184.0 kcal",
    carbs: 30.3,
    fat: 4.9,
    protein: 4.7
  }
]);
</script>

<template>
    <div style="display: flex; align-items: center;">
        <Button 
            class="btn-yellow"
            @click="showDialog"
        >
            <div class="btn-yellow-content">
                <font-awesome-icon :icon="['fas', 'fa-bowl-rice']" style="height: 24px; width: 24px; color: black;" />
                {{$t('button.RecommendMeal')}} 
            </div>
        </Button>
    </div>

    <Dialog
        v-model:visible="dialogVisible"
        :header="$t('button.RecommendMeal')"
        @hide="closeDialog"
        :modal="true"
        :closable="true"
        style="width: 80%; height: 80%;"
    >
        <DataTable 
            :value="RecommendMealData" 
            dataKey="id"
            tableStyle="min-width: 50rem, max-width: 50rem"
            :rows="10"
            responsiveLayout="scroll"
            rowHover
            highlightOnSelect
        >
            <Column field="name" header="食物名稱"></Column>
            <Column field="category" header="分類"></Column>
            <Column field="subcategory" header="子分類"></Column>
            <Column field="calories" header="熱量"></Column>
            <Column field="carbs" header="醣類 (g)"></Column>
            <Column field="fat" header="脂肪 (g)"></Column>
            <Column field="protein" header="蛋白質 (g)"></Column>
        </DataTable>
    </Dialog>
</template>

<style scoped>
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

table>tr>td {
    padding: 10px;
    text-align: center;
}

.sb-description {
    font-size: 1.2em;
    margin: 10px 0;
    background-color: var(--primary-color);
    width: 60px;
}

.sb-picture {
    width: 100%;
    height: auto;
    border-radius: 20px;
}

</style>
