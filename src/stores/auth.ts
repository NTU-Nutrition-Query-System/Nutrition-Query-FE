import { googleAuthCodeLogin } from "vue3-google-login";
import { googleLogin } from "@/apis/google-login";

import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

interface GoogleLoginResponse {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

export const useAuthStore = defineStore("authStore", () => {
  const isLoggedIn = ref(false);
  const userInfo = ref<GoogleLoginResponse | null>(null);

  const login = (user: GoogleLoginResponse) => {
    isLoggedIn.value = true;
    userInfo.value = user;
  };

  const logout = () => {
    isLoggedIn.value = false;
    userInfo.value = null;
  };

  return {
    isLoggedIn,
    userInfo,
    login,
    logout,
  };
});

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
        console.log("Login successful", backendResponse);
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
