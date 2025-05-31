import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import { usePersonInfoStore } from "@/stores/personInfoStore";

export const uploadPersonalInfo = async () => {
  const authStore = useAuthStore();
  const personInfoStore = usePersonInfoStore();

  if (!authStore.isLoggedIn) {
    return;
  }

  try {
    const response = await axios.post(
      "/api/uploadPersonalInfo",
      {
        ...personInfoStore.personInfo,
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      }
    );
    return;
  } catch (err) {
    console.error("Error uploading personal info:", err);
    return;
  }
};
