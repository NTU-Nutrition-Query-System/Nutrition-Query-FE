<script setup lang="ts">
import Avatar from "primevue/avatar";
import { loginCallback, useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <div style="display: flex; align-items: center">
    <Avatar
      :image="authStore.userInfo?.picture"
      alt="Profile Image"
      size="large"
      shape="circle"
      v-if="authStore.isLoggedIn"
    />
    <button
      @click="loginCallback"
      class="login-button"
      style="height: 2.5rem"
      v-else
    >
      <i class="pi pi-google" style="font-size: 14px"></i>
      {{ $t("button.login") }}
    </button>
  </div>
</template>

<style scoped>
.login-button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  transition: background-color 0.2s;
}

.login-button:hover {
  background-color: #f5f5f5;
}

.login-button .label {
  margin: 0;
}
</style>
