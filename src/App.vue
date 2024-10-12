<script setup lang="ts">
import Calculate from './components/Calculator.vue'
</script>

<template>
  <div class="center">
    <Calculate />
  </div>
</template>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
}
</style>
