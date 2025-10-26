<script setup lang="ts">
import Banner from "@/components/common/Banner.vue";
import ContactUs from "@/components/common/ContactUs.vue";
</script>

<template>
  <head>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>

  <Banner title="page_title.about" subtitle="" page="about" />

  <!-- TODO: fix the margin  -->
  <section class="sb-about-text sb-p-90-0">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 align-self-center">
          <div class="sb-illustration-2 sb-mb-90">
            <div class="sb-interior-frame">
              <img
                src="@/assets/images/food.jpg"
                alt="食物照片"
                class="sb-interior"
                style="object-position: center"
              />
            </div>
            <div class="sb-square"></div>
            <div class="sb-cirkle-1"></div>
            <div class="sb-cirkle-2"></div>
            <div class="sb-cirkle-3"></div>
            <div class="sb-cirkle-4"></div>
            <div class="sb-experience">
              <div class="sb-exp-content">
                <img src="@/assets/images/Arduino.png" />
                <p class="sb-h3">Arduino</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 align-self-center sb-mb-60">
          <h2 class="sb-mb-60">
            {{ $t("page_content.about.title_1") }}<br />
            {{ $t("page_content.about.title_2") }}
          </h2>
          <p class="sb-text sb-mb-30">
            {{ $t("page_content.about.section_content[0]") }}
          </p>
          <p class="sb-text sb-mb-60">
            {{ $t("page_content.about.section_content[1]") }}
          </p>
          <div>
            <p class="sb-text sb-text-xs">
              {{ $t("page_content.about.signature.organization") }}
            </p>
            <p class="text-signature">
              {{ $t("page_content.about.signature.name") }}
            </p>
          </div>
        </div>
      </div>
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd5kbG6szrI4rOUl-zTouCIRG-tkVRP5Up40e1yzPKzUarDng/viewform?embedded=true" width="100%" height="970" frameborder="0" marginheight="0" marginwidth="0">載入中…</iframe>
    </div>
  </section>

  <!-- call to action -->
  <ContactUs />
  <!-- call to action end -->
</template>

<style>
.text-signature {
  left: 50px;
  position: relative;
  font-size: 25px;
}
</style>
