import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://mealdatabase.cloud.ntu.edu.tw/api", // 目標伺服器 URL
        changeOrigin: true, // 修改請求來源，避免跨域問題
        rewrite: (path) => path.replace(/^\/api/, ""), // 移除 /api 前綴，符合後端的 API 路徑
      },
    },
  },
});
