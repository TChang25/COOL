import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/COOL/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:8080", // forward /api requests to Spring Boot
    },
  },
});
