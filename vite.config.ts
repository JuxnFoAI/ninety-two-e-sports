import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const isOneDrivePath = __dirname.includes("OneDrive");

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    open: true,
    port: 5173,
    strictPort: true,
    headers: {
      "Cache-Control": "no-store",
    },
    // OneDrive en Windows a veces no dispara eventos de archivo; polling evita HMR roto.
    watch: isOneDrivePath ? { usePolling: true, interval: 200 } : undefined,
  },
  preview: {
    open: true,
    port: 4173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "assets"),
    },
  },
});
