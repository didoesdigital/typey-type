import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import react from "@vitejs/plugin-react";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
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
      !process.env.VITEST
        ? checker({
            // Later, add TS check here:
            // typescript: true,
            eslint: {
              // This should match `package.json` lint script:
              lintCommand: "eslint 'src/**/*.{js,jsx,ts,tsx}'",
              watchPath: "src",
            },
          })
        : undefined,

      react(),

      // svgr options: https://react-svgr.com/docs/options/
      // svgr({ svgrOptions: { icon: true } }),
      svgr(),

      tsconfigPaths(),

      // Put the Sentry vite plugin after all other plugins
      !process.env.TYPEY_TYPE_RELEASE
        ? undefined
        : sentryVitePlugin({
            authToken: process.env.SENTRY_AUTH_TOKEN,
            org: "di-does-digital",
            project: "typey-type-for-stenographers",
            telemetry: false,
            release: {
              name:
                mode === "production"
                  ? process.env.TYPEY_TYPE_RELEASE
                  : `${process.env.TYPEY_TYPE_RELEASE}+${mode}`,
              deploy: {
                env: mode,
              },
            },

            // Enable debug information logs during build-time. Defaults to false.
            debug: true,
            // Completely disables all functionality of the plugin. Defaults to false.
            disable: false,
          }),
    ],
  };
});
