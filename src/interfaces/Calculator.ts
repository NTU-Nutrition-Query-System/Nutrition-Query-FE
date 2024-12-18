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
}

export interface weightedFoodItem extends foodItem {
  weight: number;
}
