import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

export const uploadRecord = async (epoch: number, foodItems: Array<any> ) => {
    const authStore = useAuthStore();
    try {
      const response = await axios.post("/api/uploadRecord",
        {
          datetime: epoch, 
          foodItems: foodItems
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
  