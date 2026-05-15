import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "@prerenderer/rollup-plugin";
import { PRERENDER_ROUTES } from "./src/lib/prerender-routes";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Prerender at build time so crawlers get per-page <title>, <meta>, canonical and JSON-LD
    // (including VideoObject) in the raw HTML — fixes "11 of 21 indexed" + "0 videos" in GSC.
    mode !== "development" &&
      prerender({
        routes: PRERENDER_ROUTES,
        renderer: "@prerenderer/renderer-puppeteer",
        rendererOptions: {
          maxConcurrentRoutes: 2,
          renderAfterTime: 1500,
          headless: "new",
          // Wait for react-helmet-async to flush head tags after hydration
          inject: { prerendered: true },
        },
        postProcess(renderedRoute: { route: string }) {
          // Ensure trailing-slash routes write to /path/index.html (matches our route definitions)
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
}));
