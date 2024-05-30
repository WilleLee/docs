/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    tsconfigPaths(),
  ],
  server: {
    port: 3001,
    proxy: {
      "/api": {
        target: "https://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/api/, "");
        },
      },
    },
  },
  test: {
    environment: "jsdom",
  },
});
