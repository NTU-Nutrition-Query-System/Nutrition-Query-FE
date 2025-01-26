<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { defineProps, ref } from 'vue';
import Dropdown from "primevue/dropdown";

// Receive items from parent
const props = defineProps({
    languages: {
        type: Array as () => Array<{ label: string; route?: string }>,
        required: true
    },
});

const { locale } = useI18n();
const currentLocale = ref(locale.value);
const changeLocale = () => {
  locale.value = currentLocale.value;
};
</script>

<template>
    <div>
        <div class="language-selector">
            <label for="language-select" style="margin-right: 0.5rem">{{ $t("select_language") }}</label>
            <Dropdown
                id="language-select"
                :options="languages"
                optionLabel="label"
                optionValue="value"
                v-model="currentLocale"
                @change="changeLocale"
                placeholder="Select Language"
                class="language-dropdown"
                style="height: 2.5rem"
            />
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
</style>