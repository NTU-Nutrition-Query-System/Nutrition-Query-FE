import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export interface GoogleLoginResponse {
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


