import type {
  nutrient,
  weightedFoodItem,
} from "../interfaces/Calculator";
import type { CellStyle } from 'xlsx-js-style';

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
    
    const rightCenterAlignment = { alignment: { horizontal : "right", vertical: "center" } } as CellStyle;

    const selectedNutritionExportSchema = ExcelSchemaBuilder.create<(typeof selectedIntake)[number]>()
      .column(t('selection_nutrition') as never, { key: 'nutrition', cellStyle: rightCenterAlignment })
      .column(t('selection_intake') as never, { key: 'intake', cellStyle: rightCenterAlignment })
      .column(t('selection_meal_requirement') as never, { key: 'mealRequirement', cellStyle: rightCenterAlignment })
      .column(t('selection_meal_uptake_percentage') as never, { key: 'mealUptakePercentage', cellStyle: rightCenterAlignment })
      .column(t('selection_daily_requirement') as never, { key: 'dailyRequirement', cellStyle: rightCenterAlignment })
      .column(t('selection_daily_uptake_percentage') as never, { key: 'dailyUptakePercentage', cellStyle: rightCenterAlignment })
      .build();

    const selectedFoodExportSchema = ExcelSchemaBuilder.create<(typeof selectedFood)[number]>()
      .column(t('food_item') as never, { key: 'item', cellStyle: rightCenterAlignment })
      .column(t('food_gram') as never, { key: 'gram', cellStyle: rightCenterAlignment })
      .column(t('calories') as never, { key: 'calories', cellStyle: rightCenterAlignment })
      .column(t('carbohydrate') as never, { key: 'carbohydrate', cellStyle: rightCenterAlignment })
      .column(t('protein') as never, { key: 'protein', cellStyle: rightCenterAlignment })
      .column(t('fat') as never, { key: 'fat', cellStyle: rightCenterAlignment })
      .build();

    const buffer = ExcelBuilder.create()
      .sheet('MyNutrition', { tableSeparatorWidth: 10 })
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