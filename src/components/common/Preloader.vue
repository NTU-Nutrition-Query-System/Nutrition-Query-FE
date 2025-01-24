<script setup lang="ts">
import { ref } from 'vue';

// State to control the visibility of the preloader
const showPreloader = ref(true);

// Method to handle the end of the animation
const onAnimationEnd = () => {
  showPreloader.value = false;
};
</script>

<template>
  <div>
    <!-- Preloader -->
    <div v-if="showPreloader" class="sb-preloader" @animationend="onAnimationEnd">
      <div class="sb-preloader-bg"></div>
      <div class="sb-preloader-body">
        <div class="sb-loading">
          <div class="sb-percent">
            <span class="sb-preloader-number" data-count="101">00</span><span>%</span>
          </div>
        </div>
        <div class="sb-loading-bar">
          <div class="sb-bar"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes progress {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
</style>