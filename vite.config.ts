import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    base: "/typey-type",
    build: {
      sourcemap: true,
      outDir: "build",
    },
    plugins: [
      react(),
      // svgr options: https://react-svgr.com/docs/options/
      // svgr({ svgrOptions: { icon: true } }),
      svgr(),
      tsconfigPaths(),
    ],
  };
});
