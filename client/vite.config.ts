import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `@use "@/shared/styles/abstracts/variables" as *\n@use "@/shared/styles/abstracts/mixins" as *\n`,
      },
    },
  },
});
