import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import type { foodItem } from "@/interfaces/Calculator";
import { isSameDate } from "@/utils/dateUtils";
import { getRecord } from "@/apis/getRecord";

export interface foodRecord {
  date: Date;
  food: foodItem[];
}

export const useRecordStore = defineStore("RecordStore", () => {
  const foodRecords = ref<foodRecord[]>([]);

  const foodRecordsShown = ref<foodRecord[]>([]);

  const fetchRecords = async () => {
    try {
      const records = await getRecord();
      if (Array.isArray(records.records)) {
        const groupedRecords: { [key: string]: foodItem[] } = {};

        records.records.forEach((record:any) => {
          const recordDate = new Date(record.date).toISOString().split("T")[0];
          if (!groupedRecords[recordDate]) {
            groupedRecords[recordDate] = [];
          }
          groupedRecords[recordDate].push({
            id: record.id,
            name: record.name,
            class: record.class,
            subclass: record.subclass,
            unit: record.unit,
            gram: record.gram,
            calories: record.calories,
            carbohydrate: record.carbohydrate,
            fat: record.fat,
            protein: record.protein,
            dietaryFibre: record.dietaryFibre,
          });
        });

        foodRecords.value = Object.entries(groupedRecords).map(
          ([date, food]) => ({
            date: new Date(date),
            food,
          })
        );
        console.log("Food records fetched successfully:", foodRecords.value);
      } else {
        console.error("Invalid records format:", records);
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  const getDateofRecords = () => {
    const dates: Date[] = foodRecords.value.map((record) => new Date(record.date));
    return dates.sort((a, b) => a.getTime() - b.getTime());
  }

  const clearFoodRecords = () => {
    foodRecords.value = [];
  };

  const getFoodRecordsByDate = (date: Date) => {
    const rec = foodRecords.value.filter((record) => {
      return isSameDate(record.date, date);
    });
    return rec.length > 0 ? rec[0].food : [];
  };

  return {
    getDateofRecords,
    getFoodRecordsByDate,
    fetchRecords,
    foodRecords,
  };
});
