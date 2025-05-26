import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { relogin } from "@/apis/google-login";

export interface userInfo {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

export const useAuthStore = defineStore("authStore", () => {
  const isLoggedIn = ref(false);
  const userInfo = ref<userInfo | null>(null);
  const accessToken = ref<string | null>(localStorage.getItem("access_token"));

  onMounted(() => {
    if (accessToken.value !== null) {
      relogin(accessToken.value).then((response) => {
        if (response instanceof Error) {
          console.log("Relogin failed:", response);
          logout();
        } else {
          login(response.userInfo as userInfo, response.accessToken);
        }
      });
      
    }
  });

  const login = (user: userInfo, accessToken: string) => {
    isLoggedIn.value = true;
    userInfo.value = user;
    setAccessToken(accessToken);
  };

  const logout = () => {
    isLoggedIn.value = false;
    userInfo.value = null;
    clearAccessToken();
  };

  const setAccessToken = (token: string) => {
    accessToken.value = token;
    localStorage.setItem("access_token", token);
  };

  const clearAccessToken = () => {
    accessToken.value = null;
    localStorage.removeItem("access_token");
  };

  return {
    isLoggedIn,
    userInfo,
    accessToken,
    login,
    logout,
    setAccessToken,
    clearAccessToken,
  };
});


