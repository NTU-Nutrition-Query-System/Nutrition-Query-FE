<script setup lang="ts">
import { defineProps, onMounted, onUnmounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import LanguageSelector from '@/components/common/LanguageSelector.vue';

// Receive items from parent
const props = defineProps({
    items: {
        type: Array as () => Array<{ label: string; route?: string }>,
        required: true,
    },
    languages: {
        type: Array as () => Array<{ label: string; value: string }>,
        required: true
    },
});

const activeMenuItem = ref<number | null>(null);
const isMenuActive = ref(false);

const toggleMenu = () => {
    isMenuActive.value = !isMenuActive.value;
};

// Method to handle menu click
const handleClick = (index: number) => {
    activeMenuItem.value = activeMenuItem.value === index ? null : index;
    isMenuActive.value = false;
};
</script>

<template>
    <!-- top bar -->
    <div class="sb-top-bar-frame">
        <div class="sb-top-bar-bg"></div>
        <div class="container">
            <div class="sb-top-bar">
                <!-- logo -->
                <a href="/" class="sb-logo-frame" data-no-swup>
                    <img src="@/assets/images/logo.png" alt="臺大師培中心">
                </a>

                <!-- menu -->
                <div class="sb-right-side">
                    <nav id="sb-dynamic-menu" class="sb-menu-transition">
                        <div class="sb-navigation" :class="{ 'sb-active': isMenuActive }">
                            <ul class="sb-navigation-list">
                            <li v-for="(item, index) in items" :key="index" @click="handleClick(index)"
                                :class="{ 'sb-active': activeMenuItem === index }">
                                <router-link v-if="item.route" :to="item.route">
                                    <span data-no-swup>{{ $t(`page.${item.label}`) }}</span>
                                </router-link>
                                <a v-else>{{ item.label }}</a>
                            </li>
                            <!-- language selector -->
                            <li class="sb-language-selector">
                                <LanguageSelector :languages="languages" />
                            </li>
                        </ul>
                        </div>

                    </nav>
                    <div class="sb-buttons-frame">
                        <!-- menu btn -->
                        <div @click="toggleMenu" class="sb-menu-btn" ><span></span></div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    <!-- top bar end -->
</template>

<style scoped>

@media (max-width: 992px) {
  .sb-menu-btn {
    display: flex;
  }
}

.sb-top-bar-frame {
    width: 100%;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: solid 1px #F2F3F5;
    border-top: solid 1px #F2F3F5;
}

.sb-top-bar-frame .container {
    padding: 0 !important;
    position: static !important;
}

.sb-top-bar-frame .sb-top-bar-bg {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

.sb-top-bar-frame .sb-top-bar {
    padding: 0 15px;
    position: relative;
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 0.3s ease-in-out;
}

.sb-top-bar-frame .sb-top-bar .sb-logo-frame {
    display: flex;
    align-items: center;
    height: 80px;
    width: 130px;
    transition: 0.3s ease-in-out;
}

.sb-top-bar-frame .sb-top-bar .sb-logo-frame img {
    width: 100%;
}

.sb-top-bar-frame .sb-top-bar .sb-logo-frame:hover {
    filter: brightness(110%);
}

.sb-top-bar-frame .sb-top-bar .sb-right-side {
    width: 71%;
    display: flex;
    justify-content: flex-end;
}

.sb-top-bar-frame .sb-top-bar .sb-right-side .sb-buttons-frame {
    display: flex;
    justify-content: flex-end;
}

.sb-top-bar-frame.sb-scroll {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
}

.sb-top-bar-frame.sb-scroll .sb-top-bar {
    height: 90px;
}

nav {
    width: 100%;
    margin-right: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

nav .sb-navigation {
    display: flex;
    justify-content: center;
    align-items: center;
}

nav .sb-navigation .sb-navigation-list {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
}

@media (max-width: 992px) {
  nav .sb-navigation .sb-navigation-list {
    display: block;
  }
}

nav .sb-navigation .sb-language-selector {
    padding-left: 20rem;
}

@media (max-width: 992px) {
  nav .sb-navigation .sb-language-selector {
    justify-items: center;
    padding: 0;
  }
}

nav .sb-navigation::-webkit-scrollbar {
    display: none;
}

nav .sb-navigation li {
    display: flex;
    align-items: center;
    position: relative;
}

nav .sb-navigation li a {
    position: relative;
    padding: 0 30px;
    display: inline-block;
    font-weight: 400;
    height: 100%;
    color: #231E41;
    font-size: 14px;
    transition: 0.3s ease-in-out;
}

nav .sb-navigation li a:after,
nav .sb-navigation li a:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 15px;
    margin-top: -4px;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background-color: #F5C332;
    transform: scale(0);
}

nav .sb-navigation li a:after {
    left: auto;
    right: 15px;
}

nav .sb-navigation li a:hover {
    color: #F5C332;
}

nav .sb-navigation li.sb-active>a:before {
    transform: scale(1);
    transition: 0.3s ease-in-out;
}

nav .sb-navigation li ul {
    min-width: 120px;
    transform: translateY(10px);
    opacity: 0;
    pointer-events: none;
    padding: 30px 0 10px;
    position: absolute;
    top: 70.5px;
    left: 0;
    border: solid 1px #F2F3F5;
    background-color: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    transition: 0.3s ease-in-out;
    display: grid;
    grid-template-columns: repeat(2, 1pr);
    grid-template-rows: repeat(4, auto);
    grid-auto-flow: column;
}

nav .sb-navigation li ul li {
    display: block;
    position: relative;
    white-space: nowrap;
    width: 100%;
    margin-bottom: 30px;
    height: 20px;
}

nav .sb-navigation li ul li a {
    width: 100%;
    line-height: 20px;
}

nav .sb-navigation li ul:before {
    content: '';
    height: 50px;
    width: 100%;
    top: -50px;
    position: absolute;
}

nav .sb-navigation li:hover ul {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
}

.sb-top-bar-frame.sb-scroll nav .sb-navigation li ul {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
    top: 55.5px;
}

.sb-top-bar-frame.sb-scroll nav .sb-navigation li ul:before {
    height: 35px;
    top: -35px;
}

@media (max-width: 992px) {
  nav .sb-navigation {
    padding-top: 30px;
    box-shadow: -1px 1px 3px 0 rgba(0, 0, 0, 0.05);
    border-top: solid 1px #F2F3F5;
    position: absolute;
    top: 90px;
    opacity: 0;
    transform: translateY(30px);
    pointer-events: none;
    left: 0;
    width: 100%;
    display: block;
    height: calc(100vh - 80px);
    overflow: scroll;
    background-color: rgba(255, 255, 255, 0.92);
    transition: 0.3s ease-in-out;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  nav .sb-navigation li {
    text-align: center;
    width: 100%;
    height: auto;
    display: block;
  }

  nav .sb-navigation li a {
    line-height: 20px;
    margin-bottom: 30px;
  }

  nav .sb-navigation li a:hover {
    color: #231E41;
  }

  nav .sb-navigation li.sb-active>a:after {
    transform: scale(1);
  }

  nav .sb-navigation li ul {
    box-shadow: none !important;
    border: none;
    background-color: #F5C332;
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    padding: 0;
    transform: none;
    opacity: 1;
    pointer-events: all;
    position: relative;
    top: 0 !important;
    left: 0;
    display: block;
  }

  nav .sb-navigation li ul li {
    text-align: center;
  }

  nav .sb-navigation li ul li a {
    line-height: 20px;
    height: 20px;
  }

  nav .sb-navigation li:hover ul {
    padding-top: 30px;
    opacity: 1;
    max-height: 750px;
    margin-bottom: 30px;
  }

  nav .sb-navigation.sb-active {
    opacity: 1;
    transform: translateY(0);
    pointer-events: all;
  }
} 
</style>