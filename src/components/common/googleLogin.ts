import { googleAuthCodeLogin } from "vue3-google-login";
import { googleLogin } from "@/apis/google-login";
import { useAuthStore } from "@/stores/authStore";
import type { GoogleLoginResponse } from "@/stores/authStore";

export const loginCallback = async () => {
    try {
      const response = await googleAuthCodeLogin();
      if (response) {
        const backendResponse = (await googleLogin(
          response.code
        )) as GoogleLoginResponse;
        if (backendResponse) {
          const authStore = useAuthStore();
          authStore.login(backendResponse);
        } else {
          console.error("Backend response is null");
        }
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      // Handle error
      console.error("Error during login:", error);
    }
  };