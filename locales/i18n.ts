import { createI18n } from 'vue-i18n';

// Import your translation files
const messages = {
  en: {
    select_language: 'Languages',
    male: 'Male',
    female: 'Female',
    age: 'Age',
    height: 'Height',
    weight: 'Weight',
    calories: 'Calories',
    protein: 'Protein',
    carbohydrate: 'Carbohydrate',
    fat: 'Fat',
    calculate: 'Calculate',
    calculator: 'Nutrition Calculator',
    calculator_header_title: 'Nutritionist Helps You Calculate',
    calculator_header_content: 'Enter the following information to calculate your daily required calories and nutrients!',
    calculator_input_gender: 'Gender',
    calculator_result_daily_title: 'My Daily Nutrient Requirements',
    calculator_result_meal_title: 'My Meal Nutrient Requirements',
    food_item: 'Item',
    food_class: 'Category',
    food_gram: 'Grams',
    food_dt_fibre: 'Dietary fibre',
    selection_result_title: 'Am I not getting enough nutrients from the meals I selected?',
    selection_nutrition: 'Nutrition',
    selection_intake: 'Intake',
    selection_uptake_percentage: 'Uptake Percentage'
  },
  ch: {
    select_language: '語言',
    male: '男',
    female: '女',
    age: '年齡',
    height: '身高',
    weight: '體重',
    calories: '熱量',
    protein: '蛋白質',
    carbohydrate: '醣類',
    fat: '脂肪',
    calculate: '計算',
    calculator: '營養計算機',
    calculator_header_title: '營養師幫你算',
    calculator_header_content: '輸入以下資料，就可以算出你一日所需的熱量、醣類等營養素喔!',
    calculator_input_gender: '性別',
    calculator_result_daily_title: '我的一日營養素需求',
    calculator_result_meal_title: '我的一餐營養素需求',
    food_item: '品項',
    food_class: '分類',
    food_gram: '克數',
    food_dt_fibre: '膳食纖維',
    selection_result_title: '我選擇的餐食營養素夠不夠呢?',
    selection_nutrition: '營養素',
    selection_intake: '攝取量',
    selection_uptake_percentage: '攝取百分比'
  },
};

const i18n = createI18n({
  locale: 'en', // Set the default locale
  messages, // Set locale messages
});

export default i18n;
