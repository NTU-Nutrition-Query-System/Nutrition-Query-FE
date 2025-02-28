export interface nutrient {
  calories: number;
  protein: number;
  carbohydrate: number;
  fat: number;
}
export interface foodItem {
  id: number;
  item: string;
  class: string;
  subclass?: string;
  gram: number;
  calories: number;
  carbohydrate: number;
  fat: number;
  protein: number;
  dietary_fibre: number;
}

export interface weightedFoodItem extends foodItem {
  weight: number;
}
export interface filterOption {
  class: "protein" | "calories" | "carbohydrate" | "fat" | "dietary_fibre"; // 可以擴展更多類型
  min: number;
  max: number;
}
