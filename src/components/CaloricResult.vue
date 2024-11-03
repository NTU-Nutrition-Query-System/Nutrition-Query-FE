<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
import { useI18n } from 'vue-i18n';
import { defineProps, ref, watch, defineEmits, computed } from 'vue';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional

const fake_products = ref([
    { id:1, item: '醬燒烤雞三明治', class: '三明治、漢堡類', gram: 88, calories:181, carbohydrate: 3.7, fat:6.6, protein: 3.3},
    { id: 2, item: '火腿起司蛋三明治', class: '三明治、漢堡類', gram: 67, calories: 192, carbohydrate: 20.6, fat: 9.3, protein: 6.4 },
]);
const { t } = useI18n();
const { locale } = useI18n();

interface nutrition {
    calories: number;
    protein: number;
    carbohydrate: number;
    fat: number;
}

const props = defineProps({
    visible: {
        type: Boolean,
        required: true,
    },
    selectedData:{
        type: Array as () => foodItem[],
        required: true,
    },
    needData:{
        type: Object as () =>nutrition,
        required: true,
    }
});

interface foodItem {
    id: number;
    item: string;
    class: string;
    gram: number;
    calories: number;
    carbohydrate: number;
    fat: number;
    protein: number;
}

interface foodItem {
    id: number;
    item: string;
    class: string;
    gram: number;
    calories: number;
    carbohydrate: number;
    fat: number;
    protein: number;
}

const selectedValue = computed<nutrition>(() => {
    return props.selectedData.reduce<nutrition>((acc, item) => {
        acc.calories += item.calories;
        acc.protein += item.protein;
        acc.carbohydrate += item.carbohydrate;
        acc.fat += item.fat;
        return acc;
    }, {
        calories: 0,
        protein: 0,
        carbohydrate: 0,
        fat: 0,
    });
});
const selectedIntake = computed(()=>{
    return [
    {
        id: 0,
        nutrition: t('calories'),
        intake: selectedValue.value.calories.toFixed(1),
        uptakePercentage: ((selectedValue.value.calories / props.needData.calories) * 100).toFixed(1) + '%',
    },
    {
        id: 1,
        nutrition: t('protein'),
        intake: selectedValue.value.protein.toFixed(1),
        uptakePercentage: ((selectedValue.value.protein / props.needData.protein) * 100).toFixed(1) + '%',
    },
    {
        id: 2,
        nutrition: t('fat'),
        intake: selectedValue.value.fat.toFixed(1),
        uptakePercentage: ((selectedValue.value.fat / props.needData.fat) * 100).toFixed(1) + '%',
    },
    ]

})
const emit = defineEmits(['update:visible']);
const isVisible = ref(props.visible);
// Close dialog and emit update event
const closeDialog = () => {
    isVisible.value = false;
    emit('update:visible', false);
};
const uptakePercentageTemplate = (rowData: { uptakePercentage: string }) => {
    console.log('Hello');
    const percentage = parseFloat(rowData.uptakePercentage);
    const color = percentage > 100 ? 'red' : 'green';

    return `<span style="color: ${color};">${rowData.uptakePercentage}</span>`;
};
// Watch for changes in the prop and update the local state
watch(() => props.visible, (newValue) => {
    console.log('updated!')
    isVisible.value = newValue;
});
</script>

<template>
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>

    <Dialog
    v-model:visible="isVisible"
    :header="$t('selection_result_title')"
    :modal="true"
    @hide="closeDialog"
    >
        <DataTable :value="selectedIntake" dataKey="id" tableStyle="min-width: 50rem">
            <Column field="nutrition" :header="$t('selection_nutrition')"></Column>
            <Column field="intake" :header="$t('selection_intake')"></Column>
            <Column
                field="uptakePercentage"
                :header="$t('selection_uptake_percentage')"
            >
            <template #body="slotProps">
                <span :style="{ color: parseFloat(slotProps.data.uptakePercentage) > 100 ? 'red' : 'green' }">
                    {{ slotProps.data.uptakePercentage }}
                </span>
            </template>
            </Column>
        </DataTable>
        <!-- <div>
            <div class="display-row" v-for="(value, key) in selectedValue" :key="key">
                <label>{{$t(key)}}:</label>
                <span>{{ (value).toFixed(2) }} ({{ key === 'calories' ? 'kcal' : 'g' }})</span>
            </div>
        </div> -->
        <br/>
        <DataTable :value="selectedData" dataKey="id" tableStyle="min-width: 50rem">
            <Column field="item" :header="$t('food_item')"></Column>
            <Column field="calories" :header="$t('calories')"></Column>
            <Column field="carbohydrate" :header="$t('carbohydrate')"></Column>
            <Column field="protein" :header="$t('protein')"></Column>
            <Column field="fat" :header="$t('fat')"></Column>
        </DataTable>
    </Dialog>
</template>

<style>
.display-row {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
}

.p-dialog .p-dialog-title {
  font-family: 'Inter', sans-serif !important;;
  /* font-size: 2em; */
  font-weight: 700;
}
.p-dialog .p-dialog-content {
  font-family: 'Inter', sans-serif !important;;
  font-size: 1em;
  font-weight: 700;
}
</style>
