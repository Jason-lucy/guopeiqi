import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      onwarn(warning, report) {
        // React Server Component markers have no effect in this client-only Vite build.
        if (warning.code === "MODULE_LEVEL_DIRECTIVE" && warning.id?.includes("/node_modules/framer-motion/")) return;
        report(warning);
      },
    },
  },
});
