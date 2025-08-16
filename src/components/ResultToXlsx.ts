import type {
  foodItem,
  weightedFoodItem,
  CalculatedNutrition,
} from "@/interfaces/Calculator";

import type { CellStyle } from "xlsx-js-style";
import { usePersonalInfoStore } from "@/stores/personInfoStore";
import { ExcelBuilder, ExcelSchemaBuilder } from "@chronicstone/typed-xlsx";

interface personIDinRow {
  name: string;
  value: string;
}

function convertupTakeToNutrition(
  selectedIntake: CalculatedNutrition[]
): foodItem[] {
  // convert selectedIntake to nutrition domain
  const itemNames: string[] = [
    "intake",
    "mealRequirement",
    "mealUptakePercentage",
    "dailyRequirement",
    "dailyUptakePercentage",
  ];

  const result: foodItem[] = itemNames.map((name, index) => ({
    id: index + 1,
    name: name,
    unit: "",
    gram: 0,
    class: 0,
    subclass: "",
    calories: 0,
    carbohydrate: 0,
    protein: 0,
    fat: 0,
    dietaryFibre: 0,
  }));

  selectedIntake.forEach((entry) => {
    const nutritionType = entry.nutrition;

    itemNames.forEach((name, index) => {
      // Convert string values to appropriate types (number)
      const value = name.includes("Percentage")
        ? parseFloat(entry[name as keyof CalculatedNutrition] as string)
        : parseInt(entry[name as keyof CalculatedNutrition] as string, 10);

      // Assign the value to the correct property in the result
      (result[index] as any)[nutritionType] = value;
    });
  });

  return result;
}

/**
 * Converts an array of objects to CSV format and triggers a download
 * @param data Array of objects to convert to CSV
 * @param filename Name of the downloaded file
 * @param separator Character to use as CSV separator
 */
export function exportResultToXlsx(
  selectedIntake: CalculatedNutrition[],
  selectedFood: weightedFoodItem[],
  t: (key: string) => string,
  filename = "MyNutrition.xlsx"
): void {
  const rightCenterAlignment = {
    alignment: { horizontal: "right", vertical: "center" },
  } as CellStyle;

  const PersonInfoStore = usePersonalInfoStore();

  const infomation: personIDinRow[] = [
    {
      name: t("resultPage.school_name"),
      value: PersonInfoStore.personInfo.schoolName,
    },
    {
      name: t("calculator_input.age"),
      value: PersonInfoStore.personInfo.age.toString(),
    },
    {
      name: t("calculator_input.weight"),
      value: PersonInfoStore.personInfo.weight.toString(),
    },
    {
      name: t("calculator_input.height"),
      value: PersonInfoStore.personInfo.height.toString(),
    },
    { name: t("resultPage.date"), value: new Date().toLocaleDateString() },
  ];

  const infoExportSchema = ExcelSchemaBuilder.create<personIDinRow>()
    .column(t("resultPage.name") as never, {
      key: "name",
      cellStyle: rightCenterAlignment,
    })
    .column(PersonInfoStore.personInfo.name as never, {
      key: "value",
      cellStyle: rightCenterAlignment,
    })
    .build();

  const selectedNutritionExportSchema = ExcelSchemaBuilder.create<
    foodItem[][number]
  >()
    .column("" as never, {
      key: "name",
      cellStyle: rightCenterAlignment,
      transform: (value: string) =>
        value === "intake"
          ? t("selection_intake")
          : value === "mealRequirement"
          ? t("selection_meal_requirement")
          : value === "mealUptakePercentage"
          ? t("selection_meal_uptake_percentage")
          : value === "dailyRequirement"
          ? t("selection_daily_requirement")
          : value === "dailyUptakePercentage"
          ? t("selection_daily_uptake_percentage")
          : value,
    })
    .column(t("calories") as never, {
      key: "calories",
      cellStyle: rightCenterAlignment,
      transform: (value: number, index: number) =>
        index == 2 || index == 4 ? value + "%" : value,
    })
    .column(t("carbohydrate") as never, {
      key: "carbohydrate",
      cellStyle: rightCenterAlignment,
      transform: (value: number, index: number) =>
        index == 2 || index == 4 ? value + "%" : value,
    })
    .column(t("protein") as never, {
      key: "protein",
      cellStyle: rightCenterAlignment,
      transform: (value: number, index: number) =>
        index == 2 || index == 4 ? value + "%" : value,
    })
    .column(t("fat") as never, {
      key: "fat",
      cellStyle: rightCenterAlignment,
      transform: (value: number, index: number) =>
        index == 2 || index == 4 ? value + "%" : value,
    })
    .build();

  const selectedFoodExportSchema = ExcelSchemaBuilder.create<
    (typeof selectedFood)[number]
  >()
    .column(t("food_item") as never, {
      key: "name",
      cellStyle: rightCenterAlignment,
    })
    .column(t("food_gram") as never, {
      key: "gram",
      cellStyle: rightCenterAlignment,
    })
    .column(t("calories") as never, {
      key: "calories",
      cellStyle: rightCenterAlignment,
    })
    .column(t("carbohydrate") as never, {
      key: "carbohydrate",
      cellStyle: rightCenterAlignment,
    })
    .column(t("protein") as never, {
      key: "protein",
      cellStyle: rightCenterAlignment,
    })
    .column(t("fat") as never, { key: "fat", cellStyle: rightCenterAlignment })
    .build();

  const buffer = ExcelBuilder.create()
    .sheet("MyNutrition", { tableSeparatorWidth: 10 })
    .addTable({
      data: infomation,
      schema: infoExportSchema,
    })
    .addTable({
      data: selectedFood,
      schema: selectedFoodExportSchema,
    })
    .addTable({
      data: convertupTakeToNutrition(selectedIntake),
      schema: selectedNutritionExportSchema,
    })
    .build({ output: "buffer" });

  downloadXlsx(buffer, filename);
}

function downloadXlsx(buffer: ArrayBuffer, filename: string) {
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
