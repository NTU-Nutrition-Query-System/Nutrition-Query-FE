import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// Create chunks configuration
const commonViewFiles = [
  "./src/components/common",
  "./src/views/About.vue",
  "./src/views/Calculator.vue",
  "./src/views/HomePage.vue",
  "./src/viewsNotFound.vue",
];

// https://vite.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Preserve the original file structure
        // and use hash for file names
        entryFileNames: 'assets/[hash].js',
        chunkFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash].[ext]',
        manualChunks(id) {
          if (commonViewFiles.some((file) => id.includes(file))) {
            return "commonViews";
          }
          if (id.includes("node_modules/xlsx-js-style")) {
            return "xlsx";
          }
          if (id.includes("primevue")) {
            return "primevue";
          }
          if (id.includes("node_modules/@primeuix")) {
            return "primeuix";
          }
          if (id.includes("fontawesome")) {
            return "fontawesome";
          }
          if (id.includes("node_modules")) {
            return "vendor";
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://mealdatabase.cloud.ntu.edu.tw/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // remove /api prefix
      },
    },
  },
});
