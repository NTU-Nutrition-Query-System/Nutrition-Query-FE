<script setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';
import InputNumber from 'primevue/inputnumber';
import RadioButton from 'primevue/radiobutton';
import FoodTable from './FoodTable.vue';
import { useI18n } from 'vue-i18n';
import CaloricResult from './CaloricResult.vue';
// Declare reactive variables using `ref`
const age = ref<number>(0);
const height = ref<number>(0);
const weight = ref<number>(0);
const gender = ref('Male');
const isExpanded = ref<boolean>(false);
const showResult = ref<boolean>(false);
const dailyNeeds = ref({
  calories: 0,
  protein: 0,
  carbohydrate: 0,
  fat: 0,
});

const calculateDailyNeed = () => {
  if (gender.value === 'Male') {
    dailyNeeds.value.calories = 66 + 13.7 * weight.value + 5 * height.value - 6.8 * age.value;
  } else {
    dailyNeeds.value.calories = 665 + 9.6 * weight.value + 1.8 * height.value - 4.7 * age.value;
  }
};
const calculate = () => {
  showResult.value = true
  console.log(selectedProduct.value)
  
}

const nextOnclicked = () => {
  isExpanded.value = true;
  calculateDailyNeed();
};
const selectedProduct = ref([]);

const { locale } = useI18n();
</script>

<template>
  <head>
    
  </head>
  <div>
    <div
    class="calculator-decription-title"
    >
    <h1>{{$t('calculator')}}</h1>
    </div>
  
  </div>
  
  <div class="calculator" :class="{'expanded': isExpanded}">
    <div class="gender-selection flex justify-between items-center">
  <label class="font-bold block mb-2">{{$t('calculator_input_gender')}}</label>
  <div class="flex items-center">
    <div class="radio-group">
      <div class="RadioButton">
        <RadioButton v-model="gender" value="Male" />
        <label>{{$t('male')}}</label>
      </div>
      <div class="RadioButton">
        <RadioButton v-model="gender" value="Female" />
        <label>{{$t('female')}}</label>
      </div>
    </div>
  </div>
</div>

    <div class="card flex flex-wrap gap-4">
      <div class="flex-auto">
        <label for="age" class="font-bold block mb-2">{{$t('age')}}</label>
        <InputNumber v-model="age" suffix="" fluid class="input-field" />
      </div>
      <div class="flex-auto">
        <label for="height" class="font-bold block mb-2">{{$t('height')}}</label>
        <InputNumber v-model="height" suffix=" cm" fluid class="input-field" />
      </div>
      <div class="flex-auto">
        <label for="weight" class="font-bold block mb-2">{{$t('weight')}}</label>
        <InputNumber v-model="weight" suffix=" kg" fluid class="input-field" />
      </div>
      <Button class="tab" label="Next" @click="nextOnclicked" />
      <Button class="tab" label="Collapse" @click="isExpanded = false" />
    </div>

    <div class="calculator_result" v-if="isExpanded">
      <h3>{{$t('calculator_result_daily_title')}}</h3>
      
      <div class="display-row" v-for="(value, key) in dailyNeeds" :key="key">
        <label>{{$t(key)}}:</label>
        <span>{{ (value).toFixed(2) }} ({{ key === 'calories' ? 'kcal' : 'g' }})</span>
      </div>
      <h3>{{$t('calculator_result_meal_title')}}</h3>
      
      <div class="display-row" v-for="(value, key) in dailyNeeds" :key="key">
        <label>{{$t(key)}}:</label>
        <span>{{ (value / 3.0).toFixed(2) }} ({{ key === 'calories' ? 'kcal' : 'g' }})</span>
      </div>
      
    </div>
  </div>
<Button class="tab" :label="$t('calculate')" @click="calculate" />

<FoodTable
    v-model:selectedProduct="selectedProduct"
/> 
<CaloricResult 
  v-model:visible="showResult"
  v-model:selectedData="selectedProduct"
></CaloricResult>
</template>

<style>
.calculator-decription-title{
  text-align: center;
}
.calculator-decription-content{
  text-align: center;
}
.calculator {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}
.radio-group {
  display: flex;
  justify-content: space-between; /* 將兩組 radio 均勻分佈 */
  width: 100%; /* 使容器占滿整個寬度 */
}

.radio-group label {
  margin-left: 5px; /* 使 label 與 radio 之間有一些間距 */
  display: flex;
  align-items: center; /* 垂直置中 label */
}

.radio-group .RadioButton {
  flex: 1; /* 每個 radio 和 label 占據相同的空間 */
  display: flex; /* 將 radio 和 label 置於同一行 */
  align-items: center; /* 垂直置中 */
}
.calculator.expanded {
  height: 700px;
}

.display-row {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.calculator_result {
  flex: 1;
  margin: 0 1%;
  padding: 10px;
  color: black;
  text-align: center;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.tab {
  flex: 1;
  margin: 0 1%;
  padding: 10px;
  background-color: #3498db;
  color: white;
  text-align: center;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.tab:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}

.tab.active {
  background-color: #2980b9;
}

.input-field {
  border-radius: 4px;
  border: 1px solid #ccc;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #3498db;
}
</style>
