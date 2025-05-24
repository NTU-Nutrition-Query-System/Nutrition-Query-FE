<script setup lang="ts">
import Banner from "@/components/common/Banner.vue";
import ContactUs from "@/components/common/ContactUs.vue";

import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
const { locale } = useI18n()
const { getLocaleMessage } = useI18n()

const nutritionTableData = computed(() => {
  const message = getLocaleMessage(locale.value) as any
  return message?.page_content?.nutritionNote?.table?.data || []
})
</script>

<template>
  <head>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>

  <Banner title="page_title.nutrition_note" subtitle="" page="nutrition_note" />

  <!-- TODO: fix the margin  -->
  <section class="sb-about-text sb-p-90-0">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 align-self-center">
          <div class="sb-illustration-2 sb-mb-90">
            <div class="sb-interior-frame">
              <img
                src="@/assets/images/nutrition_note_apple.png"
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
          </div>
        </div>
        <div class="col-lg-6 align-self-center sb-mb-60">
          <h2 class="sb-mb-60">
            {{ $t("page_content.nutritionNote.section[0].title") }}
          </h2>
          <p class="sb-text sb-mb-30">
            {{ $t("page_content.nutritionNote.section[0].content[0]") }}
          </p>
          <p class="sb-text sb-mb-60">
            {{ $t("page_content.nutritionNote.section[0].content[1]") }}
          </p>
        </div>
        </div>
        <div class="row">
        <div class="col-lg-6 align-self-center sb-mb-60">
            <h2 class="sb-mb-60">
                {{ $t("page_content.nutritionNote.section[1].title") }}
            </h2>
            <p class="sb-text sb-mb-30">
                {{ $t("page_content.nutritionNote.section[1].content[0]") }}
            </p>
            <p class="sb-text sb-mb-60">
                {{ $t("page_content.nutritionNote.section[1].content[1]") }}
            </p>
        </div>
        <div class="col-lg-6 align-self-center">
            <table class="sb-table sb-mb-60 nutrition_table">
                <thead>
                <tr>
                    <th>{{ $t("page_content.nutritionNote.table.standard") }}</th>
                    <th>{{ $t("page_content.nutritionNote.table.carbohydrate") }}</th>
                    <th>{{ $t("page_content.nutritionNote.table.protein") }}</th>
                    <th>{{ $t("page_content.nutritionNote.table.fat") }}</th>
                    <th>{{ $t("page_content.nutritionNote.table.background_color") }}</th>
                </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, index) in nutritionTableData"
                        :key="index"
                        >
                        <td>{{ item.name }}</td>
                        <td>{{ item.carbohydrate }}</td>
                        <td>{{ item.protein }}</td>
                        <td>{{ item.fat }}</td>
                        <td>
                            <div
                                :class="[
                                    ['Red', '紅色'].includes(item.color) ? 'bg-high' :
                                    ['Yellow', '黃色'].includes(item.color) ? 'bg-mid' :
                                    ['Green', '綠色'].includes(item.color) ? 'bg-low' :
                                    ''
                                    ]"
                                :style="{
                                    color: 'black',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    textAlign: 'center',
                                }"
                            >
                                {{ item.color }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
      </div>
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

.nutrition_table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);

  th {
    background-color: var(--primary-color);
    color: #333;
    font-weight: bold;
    padding: 12px;
    border-bottom: 2px solid #ddd;
  }

  td {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }

  tr:nth-child(even) {
    background-color: #fcfcfc;
  }
}

.bg-high {
  background-color: #ff8650;
}
.bg-mid {
  background-color: #ffd21c; 
}
.bg-low {
  background-color: #c2f24e;
}
</style>
