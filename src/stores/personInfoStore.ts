import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import type { PersonalInfo } from "@/interfaces/PersonalInfo";

export const usePersonInfoStore = defineStore("personInfoStore", () => {
    const personInfo = ref<PersonalInfo>({
        name: "",
        schoolName: "",
        gender: 0,
        age: 0,
        weight: 0,
        height: 0,
        activityFactor: 0,
    });
    
    return {
        personInfo,
    };
});