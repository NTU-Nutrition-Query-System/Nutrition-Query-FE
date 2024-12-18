import { createI18n } from "vue-i18n";

// Import your translation files
const messages = {
  en: {
    select_language: "Languages",
    male: "Male",
    female: "Female",
    age: "Age",
    height: "Height",
    weight: "Weight",
    calories: "Calories(kcal)",
    protein: "Protein(g)",
    carbohydrate: "Carbohydrate(g)",
    fat: "Fat(g)",
    calculate: "View Selected Items & Calculate Nutrients",
    calculator: "Nutrition Calculator",
    calculator_header_title: "Nutritionist Helps You Calculate",
    calculator_header_content:
      "Enter the following information to calculate your daily required calories and nutrients!",
    calculator_input_gender: "Gender",
    calculator_result_daily_title: "My Daily Nutrient Requirements",
    calculator_result_meal_title: "My Meal Nutrient Requirements",
    calculator_input_activity_factor: "Activity Factor",
    calculator_input_activity_factor_mild: "Mild",
    calculator_input_activity_factor_moderate: "Moderate",
    calculator_input_activity_factor_severe: "Severe",
    food_item: "Item",
    food_class: "Category",
    food_gram: "Grams",
    food_dt_fibre: "Dietary fibre(g)",
    selection_result_title:
      "Am I not getting enough nutrients from the meals I selected?",
    selection_nutrition: "Nutrition",
    selection_intake: "Intake",
    selection_meal_requirement: "Meal Requirement",
    selection_meal_uptake_percentage: "Uptake Percentage per Meal",
    selection_daily_requirement: "Daily Requirement",
    selection_daily_uptake_percentage: "Uptake Percentage per Day"
  },
  ch: {
    select_language: "語言",
    male: "男",
    female: "女",
    age: "年齡",
    height: "身高",
    weight: "體重",
    calories: "熱量(大卡)",
    protein: "蛋白質(克)",
    carbohydrate: "醣類(克)",
    fat: "脂肪(克)",
    calculate: "查看已選項目&計算營養素",
    calculator: "營養計算機",
    calculator_header_title: "營養師幫你算",
    calculator_header_content:
      "輸入以下資料，就可以算出你一日所需的熱量、醣類等營養素喔!",
    calculator_input_gender: "性別",
    calculator_result_daily_title: "我的一日營養素需求",
    calculator_result_meal_title: "我的一餐營養素需求",
    calculator_input_activity_factor: "每日活動強度",
    calculator_input_activity_factor_mild: "輕度",
    calculator_input_activity_factor_moderate: "中度",
    calculator_input_activity_factor_severe: "重度",
    food_item: "品項",
    food_class: "分類",
    food_gram: "克數",
    food_dt_fibre: "膳食纖維(克)",
    selection_result_title: "我選擇的餐食營養素夠不夠呢?",
    selection_nutrition: "營養素",
    selection_intake: "攝取量",
    selection_meal_requirement: "每餐所需攝取量",
    selection_meal_uptake_percentage: "每餐攝取百分比",
    selection_daily_requirement: "每日所需攝取量",
    selection_daily_uptake_percentage: "每日攝取百分比",
  },
};

const i18n = createI18n({
  locale: "ch", // Set the default locale
  messages, // Set locale messages
});

export default i18n;
