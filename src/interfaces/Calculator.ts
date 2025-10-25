export interface nutrient {
  calories: number;
  protein: number;
  carbohydrate: number;
  fat: number;
}
export interface foodItem {
  id: number;
  name: string;
  class: number;
  subclass?: string;
  unit: string;
  gram: number;
  calories: number;
  carbohydrate: number;
  fat: number;
  protein: number;
  dietaryFibre: number;
}

export interface CalculatedNutrition {
  id: number,
  nutrition: string,
  intake: string,
  mealRequirement: string,
  mealUptakePercentage: string,
  dailyRequirement: string,
  dailyUptakePercentage: string,
};

export interface weightedFoodItem extends foodItem {
  portion: number;
  is_customized: boolean;
}
export interface filterOption {
  class: "protein" | "calories" | "carbohydrate" | "fat" | "dietaryFibre"; // 可以擴展更多類型
  min: number;
  max: number;
}
