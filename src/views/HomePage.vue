<template>
  <div class="sb-app">
    <div class="message-board">
      <!-- <h2 class="board-title">公告板</h2>

    <div class="messages">
      <p-card
        v-for="(message, index) in messages"
        :key="index"
        class="message-card"
      >
        <template #header>
          <div class="message-header">
            <i class="pi pi-info-circle" />
            <span class="message-title">{{ message.title }}</span>
          </div>
        </template>
        <p>{{ message.content }}</p>
        <template #footer>
          <div class="message-footer">{{ message.date }}</div>
        </template>
      </p-card>
    </div> -->
    <Poster></Poster>
      <router-link to="/Calculator">
        <!-- <Button
          label="前往計算機"
          class="message-button"
        /> -->
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Card from "primevue/card";
import Button from "primevue/button";
import Poster from "@/components/Poster.vue";
const messages = ref([
  {
    title: "系統維護通知",
    content: "本系統將於本周五進行維護，期間將無法使用。",
    date: "2024-10-15",
  },
  {
    title: "新功能上線",
    content: "我們將於下月推出新功能，敬請期待！",
    date: "2024-10-10",
  },
  {
    title: "使用者回饋",
    content: "感謝各位使用者的寶貴意見，我們會持續改進！",
    date: "2024-10-01",
  },
]);
</script>

<style scoped>
.message-board {
  padding: 20px;
  margin: 0 auto;
}

.board-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2em;
  color: #333;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.message-card {
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.message-header {
  display: flex;
  align-items: center;
}

.message-title {
  margin-left: 10px;
  font-weight: bold;
  color: #2c3e50;
}

.message-footer {
  text-align: right;
  font-size: 0.85em;
  color: #888;
}

.message-button {
  display: block;
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  background-color: #F5C332;
  border: none;
}

.message-button:hover {
  border: none !important;
  background-color: #f8d469 !important; 
}
</style>
