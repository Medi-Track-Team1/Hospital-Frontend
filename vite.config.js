import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // This helps with TS path resolution
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@lib": path.resolve(__dirname, "src/lib"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8081", // Your Spring Boot server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
