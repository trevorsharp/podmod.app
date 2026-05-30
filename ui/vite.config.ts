import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@shared": fileURLToPath(new URL("../src/shared", import.meta.url)),
      "@ui": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
