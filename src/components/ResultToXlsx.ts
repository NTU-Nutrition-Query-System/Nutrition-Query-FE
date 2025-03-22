import type {
  nutrient,
  weightedFoodItem,
} from "../interfaces/Calculator";
// Removed useI18n import as t will be passed as a parameter

import { ExcelBuilder, ExcelSchemaBuilder } from '@chronicstone/typed-xlsx';

/**
 * Converts an array of objects to CSV format and triggers a download
 * @param data Array of objects to convert to CSV
 * @param filename Name of the downloaded file
 * @param separator Character to use as CSV separator
 */
export function exportResultToXlsx(
    selectedIntake: {
      id: number;
      nutrition: string;
      intake: string;
      mealRequirement: string;
      mealUptakePercentage: string;
      dailyRequirement: string;
      dailyUptakePercentage: string;
    }[],
    selectedFood: weightedFoodItem[],
    t: (key: string) => string,
    filename = 'MyNutrition.xlsx',
  ): void {
    
    const selectedNutritionExportSchema = ExcelSchemaBuilder.create<(typeof selectedIntake)[number]>()
      .column(t('selection_nutrition') as never, { key: 'nutrition' })
      .column(t('selection_intake') as never, { key: 'intake' })
      .column(t('selection_meal_requirement') as never, { key: 'mealRequirement' })
      .column(t('selection_meal_uptake_percentage') as never, { key: 'mealUptakePercentage' })
      .column(t('selection_daily_requirement') as never, { key: 'dailyRequirement' })
      .column(t('selection_daily_uptake_percentage') as never, { key: 'dailyUptakePercentage' })
      .build();

    const selectedFoodExportSchema = ExcelSchemaBuilder.create<(typeof selectedFood)[number]>()
      .column(t('food_item') as never, { key: 'item' })
      .column(t('food_gram') as never, { key: 'gram' })
      .column(t('calories') as never, { key: 'calories' })
      .column(t('carbohydrate') as never, { key: 'carbohydrate' })
      .column(t('protein') as never, { key: 'protein' })
      .column(t('fat') as never, { key: 'fat' })
      .build();

    const buffer = ExcelBuilder.create()
      .sheet('MyNutrition')
      .addTable({
        data: selectedIntake,
        schema: selectedNutritionExportSchema,
      })
      .addTable({
        data: selectedFood,
        schema: selectedFoodExportSchema,
      })
      .build({output:'buffer'});
    
    downloadXlsx(buffer, filename);
}

function downloadXlsx(buffer: ArrayBuffer, filename: string) {
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}