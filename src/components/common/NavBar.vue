<script setup lang="ts">
import { defineProps, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import Swup from 'swup'; // Import Swup

// Receive items from parent
const props = defineProps({
  items: {
    type: Array as () => Array<{ label: string; route?: string }>,
    required: true,
  },
});

onMounted(() => {
    const options = {
    containers: ['#sb-dynamic-content', '#sb-dynamic-menu'],
    animateHistoryBrowsing: true,
    linkSelector: '.sb-navigation a:not([data-no-swup]) , a:not([data-no-swup])',
    };
    const swup = new Swup(options); // Initialize Swup

    // Optionally, clean up Swup when the component is unmounted
    onUnmounted(() => {
        swup.destroy(); // Destroy Swup instance to avoid memory leaks
    });
});

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
                        <ul class="sb-navigation">
                        <li v-for="(item, index) in items" :key="index" class="sb-active">
                            <router-link v-if="item.route" :to="item.route">
                                <a data-no-swup>{{ item.label }}</a>
                            </router-link>
                            <a v-else>{{ item.label }}</a>
                        </li>
                        </ul>
                    </nav>
                    <div class="sb-buttons-frame">
                        <!-- menu btn -->
                        <div class="sb-menu-btn"><span></span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- top bar end -->
</template>
  
<style scoped>
</style>