

<template>
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  
  <div class="MainPage">
    <div class="language-selector">
        <label for="language-select">{{ $t('select_language') }}</label>
        <select id="language-select" v-model="currentLocale" @change="changeLocale">
          <option value="en">English</option>
          <option value="ch">中文</option>
        </select>
    </div>
    <!-- Sidebar Navigation -->
    <nav class="sidebar">
      <ul>
        <li><router-link to="/Home">Home</router-link></li>
        <li><router-link to="/calculator">Calculator</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <!-- <li><router-link to="/FoodTable">Food Table</router-link></li> -->
      </ul>
    </nav>
    <!-- <Table/>
    <Result :result="calculationResult"/>
    <Calculator @inputDone="handleCalculation"/> -->
    <div class="content-area">
      <router-view />
    </div>
    
  </div>
  
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Calculator from './components/Calculator.vue'
import Result from './components/CaloricResult.vue'
import Table from './components/FoodTable.vue'
import Home from './components/HelloWorld.vue'
import { useI18n } from 'vue-i18n';
import { isMinusToken } from 'typescript';
const { locale } = useI18n(); 
const calculationResult = ref(10);
const currentLocale = ref(locale.value); // 当前语言
const handleCalculation = (result: number) => {
  calculationResult.value = result;
  console.log(result);
};
const changeLocale = () => {
  locale.value = currentLocale.value; // 切换语言
};
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
}

.sidebar {
  width: 200px;
  height: 90vh; /* 覆蓋整個視窗高度 */
  background-color: #2c3e50;
  padding: 20px;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 20px;
}

.sidebar a {
  color: white;
  text-decoration: none;
}

.sidebar a.router-link-active {
  font-weight: bold;
}

.content-area {
  flex-grow: 1;
  padding: 20px;
  background-color: #ecf0f1;
}
.MainPage{
  display: flex;
  font-family: 'Inter';
}

/* 语言选择器样式 */
.language-selector {
  position: absolute;
  top: 20px; /* 距离顶部的距离 */
  right: 20px; /* 距离右边的距离 */
  display: flex;
  align-items: center;
}


</style>
