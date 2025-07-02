import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { relogin } from "@/apis/google-login";
import { usePersonInfoStore } from "./personInfoStore";
import type { PersonalInfo } from "@/interfaces/PersonalInfo";
export interface userInfo extends PersonalInfo {
  email: string;
  picture: string;
  sub: string;
}

export const useAuthStore = defineStore("authStore", () => {
  const isLoggedIn = ref(false);
  const userInfo = ref<userInfo | null>(null);
  const accessToken = ref<string | null>(localStorage.getItem("access_token"));
  const reloginIntervalId = ref<ReturnType<typeof setTimeout> | null>(null);

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

  const startReloginInterval = () => {
    reloginIntervalId.value = setInterval(() => {
      if (isLoggedIn.value && accessToken.value !== null) {
        relogin(accessToken.value).then((response) => {
          if (response instanceof Error) {
            console.log("Relogin failed:", response);
            logout();
          } else {
            login(response.userInfo as userInfo, response.accessToken);
          }
        });
      }
    }, 540 * 1000); // 540 seconds
  };

  const login = (user: userInfo, accessToken: string) => {
    userInfo.value = user;
    const personInfoStore = usePersonInfoStore();
    personInfoStore.personInfo = {
      name: user.name || "",
      schoolName: user.schoolName || "",
      age: user.age || 0,
      height: user.height || 0,
      weight: user.weight || 0,
    }
    setAccessToken(accessToken);
    startReloginInterval();
    isLoggedIn.value = true;
  };

  const logout = () => {
    isLoggedIn.value = false;
    userInfo.value = null;
    clearAccessToken();
    clearInterval(reloginIntervalId.value as ReturnType<typeof setTimeout>);
    reloginIntervalId.value = null;
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
