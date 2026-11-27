import { readFileSync } from "node:fs";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const isOneDrivePath = __dirname.includes("OneDrive");

const appVersion = JSON.parse(
  readFileSync(path.resolve(__dirname, "package.json"), "utf8"),
).version as string;

/** Libraries that change less often than app code get their own cacheable chunk. */
const VENDOR_CHUNKS: Record<string, RegExp> = {
  react:
    /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/,
  motion:
    /[\\/]node_modules[\\/](motion|motion-dom|motion-utils|framer-motion)[\\/]/,
  gsap: /[\\/]node_modules[\\/]gsap[\\/]/,
};

const vendorChunk = (id: string): string | undefined =>
  Object.keys(VENDOR_CHUNKS).find((name) => VENDOR_CHUNKS[name].test(id));

const htmlVersionCacheBust = (): Plugin => ({
  name: "html-version-cache-bust",
  transformIndexHtml(html) {
    return html.replaceAll("__APP_VERSION__", appVersion);
  },
});

export default defineConfig({
  plugins: [react(), tailwindcss(), htmlVersionCacheBust()],
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
  build: {
    rollupOptions: {
      output: {
        manualChunks: vendorChunk,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "assets"),
    },
  },
});
