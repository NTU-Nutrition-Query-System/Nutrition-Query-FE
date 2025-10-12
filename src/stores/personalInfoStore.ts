import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import type { nutrient } from "@/interfaces/Calculator";
import type {
  PersonalInfo,
  PersonalInfoWithTime,
} from "@/interfaces/PersonalInfo";
import { getRecommendedWeight } from "@/utils/BMIChecking";

export const usePersonalInfoStore = defineStore("personInfoStore", () => {
  // Cookie management functions
  const setCookie = (name: string, value: string) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 1); // tomorrow
    // expires.setDate(expires.getDate() - 1); // yesterday for testing
    expires.setHours(3, 0, 0, 0); // 3:00 AM
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict;`;
  };

  const getCookie = (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const checkCookieExists = (): boolean => {
    const cookieData = getCookie("personInfo");

    if (!cookieData) {
      return false;
    }

    try {
      // Check if the cookie data is valid JSON
      const parsedData = JSON.parse(decodeURIComponent(cookieData));

      // Manual expiration check based on stored timestamp
      if (parsedData.time) {
        const cookieTime = new Date(parsedData.time);
        const now = new Date();

        // Calculate expiration time: 3 AM tomorrow from when cookie was created
        const expirationTime = new Date(cookieTime);
        expirationTime.setDate(expirationTime.getDate() + 1);
        expirationTime.setHours(3, 0, 0, 0);

        // Check if cookie has expired
        if (now >= expirationTime) {
          deleteCookie("personInfo");
          return false;
        }
      }

      // Return true if cookie exists, is valid, and hasn't expired
      return parsedData && typeof parsedData === "object";
    } catch (error) {
      console.error("Error checking cookie validity:", error);
      return false;
    }
  };

  // Load person info from cookie or use default values
  const loadFromCookie = (): PersonalInfo => {
    const cookieData = getCookie("personInfo");
    if (cookieData) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(cookieData));
        return {
          name: parsedData.name || "",
          schoolName: parsedData.schoolName || "",
          gender: parsedData.gender || 0,
          age: parsedData.age || 0,
          weight: parsedData.weight || 0,
          height: parsedData.height || 0,
          activityFactor: parsedData.activityFactor || 0,
        };
      } catch (error) {
        console.error("Error parsing person info from cookie:", error);
      }
    }
    return {
      name: "",
      schoolName: "",
      gender: -1,
      age: 0,
      weight: 0,
      height: 0,
      activityFactor: 0,
    };
  };

  const personalInfo = ref<PersonalInfo>(loadFromCookie());

  const dailyRequirement = computed((): nutrient => {
    let bmr = 0;

    if(personalInfo.value.gender == -1) {
      return { calories: 0, protein: 0, carbohydrate: 0, fat: 0 };
    }

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

  // Save person info to cookie whenever it changes
  const saveToCookie = () => {
    const dataWithTimestamp: PersonalInfoWithTime = {
      ...personalInfo.value,
      time: new Date().toISOString(),
    };
    setCookie(
      "personInfo",
      encodeURIComponent(JSON.stringify(dataWithTimestamp))
    );
  };

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
    deleteCookie("personInfo");
  };

  return {
    personalInfo,
    dailyRequirement,
    saveToCookie,
    checkCookieExists,
    clearPersonInfo,
  };
});
