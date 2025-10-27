/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
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
    test: {
      dir: "src",
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
      globals: true,
      typecheck: {
        enabled: true,
      },
    },
    plugins: [
      checker({
        // Later, add TS check here:
        // typescript: true,
        eslint: {
          // This should match `package.json` lint script:
          lintCommand: "eslint 'src/**/*.{js,jsx,ts,tsx}'",
          watchPath: "src",
        },
      }),
      react(),
      // svgr options: https://react-svgr.com/docs/options/
      // svgr({ svgrOptions: { icon: true } }),
      svgr(),
      tsconfigPaths(),
    ],
  };
});
