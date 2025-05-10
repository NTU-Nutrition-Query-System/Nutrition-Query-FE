<script lang="ts" setup>
import { ref } from "vue";

</script>

<template>
  <!-- call to action -->
  <section class="sb-call-to-action">
    <div class="sb-bg-3"></div>
    <div class="container">
      <div class="row">
        <div class="col-lg-6 align-self-center">
          <div class="sb-cta-text">
            <h2 class="sb-mb-30">{{ $t("page_content.home.contact.title") }}</h2>
            <p class="sb-text sb-mb-30">
              {{ $t("page_content.home.contact.description[0]") }}<br>   
              {{ $t("page_content.home.contact.description[1]") }} 
            </p>
            <p class="sb-text sb-mb-30">
              <font-awesome-icon :icon="['fas', 'envelope']" style="width: 1.5rem;" /> 
                {{ $t("page_content.home.contact.email") }}
                <a href="mailto:mealdatabase24@ntu.edu.tw"
                  data-no-swup>mealdatabase24@ntu.edu.tw
                </a><br>
              <font-awesome-icon :icon="['fas', 'phone']" style="width: 1.5rem;"/> 
                {{ $t("page_content.home.contact.phone") }}
                02-3366-5705<br>
              <font-awesome-icon :icon="['fas', 'file-alt']" style="width: 1.5rem;"/> 
                {{ $t("page_content.home.contact.form") }}<br> 
            </p>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="sb-illustration-3">
            <a href="https://forms.gle/bbyyYU81HH82zgZt8" target="_blank">
              <img src="../..//assets/images/QR-CODE.png" alt="QR Code" class="sb-phones">
            </a>
            <div class="sb-cirkle-1"></div>
            <div class="sb-cirkle-2"></div>
            <div class="sb-cirkle-3"></div>
            <div class="sb-cirkle-4"></div>
            <img src="../../assets/img/illustrations/1.svg" alt="phones" class="sb-pik-1">
            <img src="../../assets/img/illustrations/2.svg" alt="phones" class="sb-pik-2">
            <img src="../../assets/img/illustrations/3.svg" alt="phones" class="sb-pik-3">
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- call to action end -->
</template>

<style scoped>
</style>