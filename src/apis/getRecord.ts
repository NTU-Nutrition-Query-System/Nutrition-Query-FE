import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

export const getRecord = async () => {
  const authStore = useAuthStore();
  try {
    const response = await axios.get("/api/getRecord", {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};
