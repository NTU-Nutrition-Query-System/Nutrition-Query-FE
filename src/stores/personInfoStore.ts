import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import type { PersonalInfo } from "@/interfaces/PersonalInfo";

export const usePersonInfoStore = defineStore("personInfoStore", () => {
    const personInfo = ref<PersonalInfo>({
        uuid: "",
        name: "",
        schoolName: "",
        age: 0,
        weight: 0,
        height: 0,
    });
    
    return {
        personInfo,
    };
});