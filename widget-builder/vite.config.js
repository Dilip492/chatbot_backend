import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, "src/widget/index.js"),
      name: "ChatWidget",
      formats: ["iife"],
      fileName: () => "widget.js",
    },
  },
});