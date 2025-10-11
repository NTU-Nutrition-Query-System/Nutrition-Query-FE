import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import type { nutrient } from "@/interfaces/Calculator";
import type {
  PersonalInfo,
  PersonalInfoWithTime,
} from "@/interfaces/PersonalInfo";
import { getRecommendedWeight } from "@/utils/BMIChecking";

export const usePersonalInfoStore = defineStore("personInfoStore", () => {

  const personalInfo = ref<PersonalInfo>({
      name: "",
      schoolName: "",
      gender: -1,
      age: 0,
      weight: 0,
      height: 0,
      activityFactor: 0,
  });

  const dailyRequirement = computed((): nutrient => {
    let bmr = 0;
    let recommendedWeight = getRecommendedWeight(
      personalInfo.value.weight,
      personalInfo.value.height,
      personalInfo.value.age,
      personalInfo.value.gender == 1 ? 'male' : 'female'
    );
    
    if (!recommendedWeight) {
      return { calories: 0, protein: 0, carbohydrate: 0, fat: 0 };
    }
    // Schofield equation for BMR calculation
    if (personalInfo.value.gender == 1) { // Male
      if (personalInfo.value.age <= 3) {
        bmr = 59.512 * recommendedWeight - 30.4;
      } else if (personalInfo.value.age >= 4 && personalInfo.value.age <= 10) {
        bmr = 22.706 * recommendedWeight + 504.3;
      } else if (personalInfo.value.age >= 11 && personalInfo.value.age <= 17) {
        bmr = 17.686 * recommendedWeight + 658.2;
      } else if (personalInfo.value.age >= 18 && personalInfo.value.age <= 29) {
        bmr = 15.057 * recommendedWeight + 692.2;
      } else if (personalInfo.value.age >= 30 && personalInfo.value.age <= 59) {
        bmr = 11.472 * recommendedWeight + 873.1;
      } else if (personalInfo.value.age >= 60) {
        bmr = 11.711 * recommendedWeight + 587.7;
      }
    } else if (personalInfo.value.gender == 0) { // Female
      if (personalInfo.value.age <= 3) {
        bmr = 58.317 * recommendedWeight - 31.1;
      } else if (personalInfo.value.age >= 4 && personalInfo.value.age <= 10) {
        bmr = 20.315 * recommendedWeight + 485.9;
      } else if (personalInfo.value.age >= 11 && personalInfo.value.age <= 17) {
        bmr = 13.384 * recommendedWeight + 692.6;
      } else if (personalInfo.value.age >= 18 && personalInfo.value.age <= 29) {
        bmr = 14.818 * recommendedWeight + 486.6;
      } else if (personalInfo.value.age >= 30 && personalInfo.value.age <= 59) {
        bmr = 8.126 * recommendedWeight + 845.6;
      } else if (personalInfo.value.age >= 60) {
        bmr = 9.082 * recommendedWeight + 658.5;
      }
    }

    const calories = bmr * personalInfo.value.activityFactor;

    const protein = (calories * 0.2) / 4;
    const carbohydrate = (calories * 0.5) / 4;
    const fat = (calories * 0.3) / 9;

    return {
      calories,
      protein,
      carbohydrate,
      fat,
    };
  });

  // Clear person info and cookies
  const clearPersonInfo = () => {
    personalInfo.value = {
      name: "",
      schoolName: "",
      gender: -1,
      age: 0,
      weight: 0,
      height: 0,
      activityFactor: 0,
    };
  };

  return {
    personalInfo,
    dailyRequirement,
    clearPersonInfo,
  };
});
