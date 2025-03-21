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
            <h2 class="sb-mb-30">歡迎國高中學校與本計畫聯繫！</h2>
            <p class="sb-text sb-mb-30">
              這是一個六個小時的一日營隊型的活動，因此可能會用到假日期間。如果學校認為這個營隊對於學生有幫助，可以到貴校跟校長主任介紹更多課程的內容細節及所用的儀器。
            </p>
            <p class="sb-text sb-mb-30">
              <font-awesome-icon :icon="['fas', 'envelope']" style="width: 1.5rem;" /> 聯絡信箱：<a href="mailto:mealdatabase24@ntu.edu.tw"
                data-no-swup>mealdatabase24@ntu.edu.tw</a><br>
              <font-awesome-icon :icon="['fas', 'phone']" style="width: 1.5rem;"/> 連絡電話：02-3366-5705<br>
              <font-awesome-icon :icon="['fas', 'file-alt']" style="width: 1.5rem;"/> 線上表單：點擊或掃描 QR Code 填表單<br> 
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