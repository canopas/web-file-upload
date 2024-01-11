import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./src/app/index.ts"),
      name: "@canopassoftware/react-file-upload",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react"],
    },
  },
});
