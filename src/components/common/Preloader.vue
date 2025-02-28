<script setup lang="ts">
import { ref, onMounted } from 'vue';

// State to control the visibility of the preloader
const showPreloader = ref(true);
const hiddenPreloader = ref(false);

// Method to handle the end of the animation
const onAnimationEnd = () => {
  showPreloader.value = false;
};

const countNum = ref(0);
const countTo = '100';

// Method to handle the preloader animation
const startPreloaderAnimation = () => {
  const countAnimation = setInterval(() => {
    countNum.value += 1;
    if (countNum.value >= parseInt(countTo, 10)) {
      clearInterval(countAnimation); 
      setTimeout(() => {
        hiddenPreloader.value = true;
      }, 100);
      setTimeout(() => {
        showPreloader.value = false;
      }, 400); 
    }
  }, 10); 
};

onMounted(() => {
  startPreloaderAnimation();
});
</script>

<template>
  <div>
    <!-- Preloader -->
    <transition name="slide" @before-enter="startPreloaderAnimation" @after-leave="onAnimationEnd">
      <div v-if="showPreloader" class="sb-preloader" :class="{ 'sb-hidden': hiddenPreloader }">
        <div class="sb-preloader-bg"></div>
        <div class="sb-preloader-body">
          <div class="sb-loading">
            <div class="sb-percent">
              <span class="sb-preloader-number">{{ countNum }}%</span>
            </div>
          </div>
          <div class="sb-loading-bar">
            <div class="sb-bar" :style="{ 'height': `${countNum}%` }"></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.slid-enter-active, .slide-leave-active {
  transition: all 1s ease;
}
.slide-enter-from {
  transform: translateY(-100%);
}

.slide-leave-to {
  transform: translateY(100%);
}

.sb-preloader {
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 99999999999999999;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s ease-in-out; 
}

.sb-preloader .sb-preloader-bg {
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  position: absolute;
  background-color: #F5C332;
  height: 1000px;
  width: 1000px;
  top: 20%;
  transform: scale(2);
  transition: 0.6s ease-in-out; 
}

.sb-preloader .sb-preloader-body {
  position: absolute;
  bottom: 0;
  z-index: 999;
  width: 100%;
  text-align: center;
  transition: 0.4s ease-in-out; 
}

.sb-preloader .sb-preloader-body .sb-loading {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 30px; 
}

.sb-preloader .sb-preloader-body .sb-loading-bar {
  margin-bottom: 15px;
  width: 1px;
  height: 80vh;
  margin: 0 auto;
  border-radius: 2px;
  overflow: hidden;
  background-color: #FFFFFF; 
}

.sb-preloader .sb-preloader-body .sb-loading-bar .sb-bar {
  width: 100%;
  height: 0;
  background-color: #231E41; 
}
  
.sb-preloader.sb-hidden {
  pointer-events: none;
  transition-delay: 0.2s; 
}

.sb-preloader.sb-hidden .sb-preloader-bg {
  transform: scale(0);
  transition-delay: 0.2s; 
}

.sb-preloader.sb-hidden .sb-preloader-body {
  transform: translateY(30%);
  opacity: 0;
  transition-delay: 0s; 
}

.sb-bar {
  transition: height 1s;
}
</style>