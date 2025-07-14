<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { defineProps, ref, computed } from 'vue';

// Receive items from parent
const props = defineProps({
  languages: {
    type: Array as () => Array<{ label: string; value: string; }>,
    required: true
  },
});

const { locale } = useI18n();
const currentIndex = ref(0);

// Compute current language
const currentLanguage = computed(() => props.languages[currentIndex.value]);
const nextLanguage = computed(() => {
  const nextIndex = (currentIndex.value + 1) % props.languages.length;
  return props.languages[nextIndex];
});

// Switch to next language
const switchLanguage = () => {
  currentIndex.value = (currentIndex.value + 1) % props.languages.length;
  locale.value = currentLanguage.value.value;
};

// Set initial locale
locale.value = currentLanguage.value.value;
</script>

<template>
  <div>
    <div class="language-selector">
      <!-- <label for="language-button" style="margin-right: 0.5rem">{{ $t("select_language") }}</label> -->
      <button id="language-button" @click="switchLanguage" class="language-button" style="height: 2.5rem">
        {{ nextLanguage.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.language-selector {
  display: flex;
  align-items: center;
  z-index: 100 !important;
}

.language-selector label {
  margin: 0;
}

.language-button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  transition: background-color 0.2s;
}

.language-button:hover {
  background-color: #f5f5f5;
}
</style>