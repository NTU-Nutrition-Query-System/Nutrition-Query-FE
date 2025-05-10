import type router from "@/router";
import { createI18n } from "vue-i18n";
import en from './en';
import zhTW from './zh-TW';

// Import your translation files
const messages = {
  en,
  ch: zhTW,
};

const i18n = createI18n({
  locale: "ch", // Set the default locale
  messages, // Set locale messages
});

export default i18n;
