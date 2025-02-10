<script setup lang="ts">
import { tint } from '@primevue/themes';
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

// Receive items from parent
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    page: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <!-- banner -->
  <section class="sb-banner sb-banner-xs sb-banner-color">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <!-- main title -->
          <div class="sb-main-title-frame">
            <div class="sb-main-title">
              <h1 class="sb-h2">{{ $t(props.title) }}</h1>
              <p class="sb-subtitle">{{ $t(props.subtitle) }}</p>
              <ul class="sb-breadcrumbs">
                <li>
                    <router-link to="/" data-no-swup> {{ $t(`page.home`) }}</router-link>
                </li>
                <li><a data-no-swup>{{ $t(`page.${props.page}`) }}</a></li>
              </ul>
            </div>
          </div>
          <!-- main title end -->
        </div>
      </div>
    </div>
  </section>
  <!-- banner end -->
</template>

<style scoped>  
.sb-subtitle{
  margin: 0 15px;
}
</style>