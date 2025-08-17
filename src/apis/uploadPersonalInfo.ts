import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import { usePersonalInfoStore } from "@/stores/personalInfoStore";

export const uploadPersonalInfo = async () => {
  const authStore = useAuthStore();
  const personalInfoStore = usePersonalInfoStore();

  if (!authStore.isLoggedIn) {
    return;
  }

  try {
    const response = await axios.post(
      "/api/uploadPersonalInfo",
      {
        ...personalInfoStore.personalInfo,
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
