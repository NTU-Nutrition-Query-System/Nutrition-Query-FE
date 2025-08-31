import axios from "axios";
import type { weightedFoodItem } from "@/interfaces/Calculator";
import { useAuthStore } from "@/stores/authStore";

export const uploadRecord = async (epoch: number, foodItems: Array<weightedFoodItem> ) => {
    const authStore = useAuthStore();
    try {
      const transformedFoodItems = foodItems.map(item => {
        const { weight, ...rest } = item;
        return {
          ...rest,
          portion: weight
        };
      });
      const response = await axios.post("/api/uploadRecord",
        {
          datetime: epoch,
          foodItems: transformedFoodItems
        },
        {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return err;
    }
  };
  