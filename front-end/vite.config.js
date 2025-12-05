// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig ( {
//   base: '/COOL/',
//   plugins : [ react ( ) ] ,
// } )

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/COOL/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // Spring Boot
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
