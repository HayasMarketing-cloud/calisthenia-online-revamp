import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";
import prerender from "@prerenderer/rollup-plugin";
import { PRERENDER_ROUTES } from "./src/lib/prerender-routes";

const APP_VERSION = new Date().toISOString().slice(0, 10).replace(/-/g, ".");

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  define: {
    __APP_VERSION__: JSON.stringify(APP_VERSION),
    __APP_BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // PWA scoped ONLY to /app/* (alumni area). Disabled in dev to avoid
    // breaking the Lovable preview iframe.
    VitePWA({
      registerType: "prompt",
      injectRegister: null,
      scope: "/app/",
      base: "/app/",
      includeAssets: ["pwa-192.png", "pwa-512.png", "apple-touch-icon.png"],
      devOptions: { enabled: false },
      manifest: false,
      /* Manifest is intentionally served from /site.webmanifest and linked in
       * index.html. iOS Safari installs from the current page; keeping one
       * root-scoped manifest lets users install from calisthenia.online while
       * still opening the private app at /app/dashboard. The service worker
       * remains scoped to /app/ via `scope`/`base` above.
       */
      /*manifest: {
        name: "Calisthenia Online",
        short_name: "Calisthenia",
        description: "Tu área de entrenamiento personal de Calisthenia Online",
        start_url: "/app/dashboard",
        scope: "/app/",
        id: "/app/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#0F172A",
        theme_color: "#0F172A",
        lang: "es-ES",
        icons: [
          { src: "/pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512.png", sizes: "512x512", type: "image/png" },
          { src: "/pwa-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
        ],
      },*/
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,webp,woff2}"],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        navigateFallback: "/app/dashboard",
        navigateFallbackDenylist: [
          /^\/(?!app\/).*/,
          /^\/api\//,
          /^\/auth/,
          /^\/~oauth/,
        ],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: { cacheName: "html", networkTimeoutSeconds: 3 },
          },
          {
            urlPattern: /\/lovable-uploads\/.*\.(?:png|jpg|jpeg|webp|svg)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "uploads",
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
    // Prerender at build time so crawlers get per-page <title>, <meta>, canonical and JSON-LD
    // (including VideoObject) in the raw HTML — fixes "11 of 21 indexed" + "0 videos" in GSC.
    mode !== "development" &&
      prerender({
        routes: PRERENDER_ROUTES,
        renderer: "@prerenderer/renderer-puppeteer",
        rendererOptions: {
          maxConcurrentRoutes: 2,
          renderAfterTime: 1500,
          headless: true,
          inject: { prerendered: true },
        },
        postProcess(renderedRoute: { route: string }) {
          if (
            renderedRoute.route.length > 1 &&
            !renderedRoute.route.endsWith("/")
          ) {
            renderedRoute.route += "/";
          }
        },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "supabase": ["@supabase/supabase-js"],
          "query": ["@tanstack/react-query"],
          "charts": ["recharts"],
          "editor": ["quill", "react-quill"],
          "forms": ["react-hook-form", "@hookform/resolvers", "zod"],
          "icons": ["lucide-react"],
        },
      },
    },
  },
}));

