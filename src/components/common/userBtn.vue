<script setup lang="ts">
import { ref, computed, watch } from "vue";
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import Menu from "primevue/menu";
import { useAuthStore } from "@/stores/authStore";
import { loginCallback } from "@/components/common/googleLogin";
import { useRouter } from 'vue-router';

const router = useRouter();

const authStore = useAuthStore();

const menu = ref();
const items = computed(() => [
  {
    label: authStore.userInfo?.name || 'User',
    items: [
      {
        label: "History",
        icon: "pi pi-history",
        route: '/MealHistory'
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          authStore.logout();
        },
      }
    ],
  },
]);

const menuKey = ref(0);

// Watch for auth state changes and force menu update
watch(
  () => authStore.isLoggedIn,
  (newValue) => {
    if (newValue) {
      // User just logged in, force menu rerender
      menuKey.value++;
    }
  }
);

const toggle = (event : any) => {
  menu.value.toggle(event);
};
</script>

<template>
  <div v-if="authStore.isLoggedIn" class="user-btn">
    <button
      class="user-btn"
      style="width: 2.5rem; height: 2.5rem; border-radius: 50%"
      @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"
    >
      <Avatar
        :image="authStore.userInfo?.picture"
        alt="Profile Image"
        size="large"
        shape="circle"
        style="width: 2.5rem; height: 2.5rem"
      />
    </button>
    <Menu 
      ref="menu" 
      id="overlay_menu" 
      :model="items" 
      :popup="true"
      :key="menuKey"
    >
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon"></span>
            <span>{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon"></span>
          <span>{{ item.label }}</span>
        </a>
      </template>
    </Menu>
  </div>
  <button
    v-else
    @click="loginCallback"
    class="login-button"
    style="height: 2.5rem"
  >
    <i class="pi pi-google" style="font-size: 14px"></i>
    {{ $t("button.login") }}
  </button>
</template>

<style scoped>
.user-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.2s;
}

.user-btn:hover {
  background-color: #f5f5f5;
}

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
