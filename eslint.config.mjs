// @ts-check

import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import reactRefresh from "eslint-plugin-react-refresh";
import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";

import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import storybook from "eslint-plugin-storybook";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tseslint from "typescript-eslint";
// import vitest from "@vitest/eslint-plugin";

const reactSettings = {
  react: {
    version: "detect",
  },
};

const importResolverSettings = {
  "import/resolver": {
    // Using this setting requires installing and configuring the TypeScript resolver:
    // https://github.com/import-js/eslint-import-resolver-typescript#configuration
    typescript: true,
    node: true,
  },
};

const jsConfig = defineConfig({
  files: [
    "src/**/*.{mjs,js,jsx,ts,tsx}",
    "eslint.config.mjs",
    ".storybook/*.{ts,tsx}",
    "vite.config.ts",
  ],
  extends: [js.configs.recommended, importPlugin.flatConfigs.recommended],
  settings: { ...importResolverSettings },
  rules: {
    "no-extra-boolean-cast": "warn",
    "eqeqeq": "warn",

    // eslint v9 new eslint:recommended rules:
    "no-constant-binary-expression": "off",
    "no-empty-static-block": "off",
    "no-new-native-nonconstructor": "off",
    "no-unused-private-class-members": "off",

    // Turn off slow and redundant rules with TypeScript:
    // <https://github.com/typescript-eslint/typescript-eslint/blob/1d15881d73cf120ba1aeaa763597a521d403d036/docs/troubleshooting/typed-linting/Performance.mdx#eslint-plugin-import>
    "import/named": "off",
    "import/namespace": "off",
    "import/default": "off",
    "import/no-named-as-default-member": "off",
    "import/no-unresolved": "off",
    // Note: turning off import/no-unresolved assumes that `"@typescript-eslint/no-require-imports": "error"` is set (via recommended config)

    // These rules are potentially slow but don't have TypeScript equivalents:
    // <https://github.com/typescript-eslint/typescript-eslint/blob/1d15881d73cf120ba1aeaa763597a521d403d036/docs/troubleshooting/typed-linting/Performance.mdx#eslint-plugin-import>
    "import/no-named-as-default": "off",
    // "import/no-cycle": "off",
    // "import/no-unused-modules": "off",
    // "import/no-deprecated": "off",
  },
});

const tsConfig = defineConfig({
  files: ["src/**/*.{ts,tsx}", ".storybook/*.{ts,tsx}", "vite.config.ts"],
  extends: [
    importPlugin.flatConfigs.typescript,
    tseslint.configs.strictTypeChecked,
  ],
  settings: { ...importResolverSettings },
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",

    // We use this instead of tsconfig.json noUnusedLocals:
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        args: "all",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],

    // Disable tseslint.configs.recommendedTypeChecked rules with lots of errors until we can gradually address them:
    // 320 errors:
    "@typescript-eslint/no-unsafe-member-access": "off",
    // 300 errors:
    "@typescript-eslint/no-unsafe-assignment": "off",
    // 214 errors:
    "@typescript-eslint/require-await": "off",
    // 113 errors:
    "@typescript-eslint/no-unsafe-call": "off",
    // 87 errors:
    "@typescript-eslint/no-unsafe-argument": "off",
    // 24 errors:
    "@typescript-eslint/no-unsafe-return": "off",
    // 7 errors:
    "@typescript-eslint/no-redundant-type-constituents": "off",
    // 5 errors:
    "@typescript-eslint/await-thenable": "off",
    // 5 errors:
    "@typescript-eslint/restrict-template-expressions": "off",
    // 4 errors:
    "@typescript-eslint/no-base-to-string": "off",
    // 4 errors:
    "@typescript-eslint/no-duplicate-type-constituents": "off",
    // 4 errors:
    "@typescript-eslint/no-floating-promises": "off",
    // 2 errors:
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
    // 1 errors:
    "@typescript-eslint/no-unsafe-unary-minus": "off",
    // 1 errors:
    "@typescript-eslint/restrict-plus-operands": "off",

    // Note: you must disable the base rule as it can report incorrect errors
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "error",

    // Turn off slow recommended type checked rule (maybe toggle it on occasionally):
    "@typescript-eslint/no-misused-promises": "off",

    // Disable tseslint.configs.strictTypeChecked rules with lots of errors until we can (and if we want to) gradually address them:
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/no-deprecated": "off",
    "@typescript-eslint/no-misused-spread": "off",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
    "@typescript-eslint/no-unnecessary-condition": "off",
    "@typescript-eslint/no-unnecessary-template-expression": "off",
    "@typescript-eslint/no-unnecessary-type-arguments": "off",
    "@typescript-eslint/no-unnecessary-type-conversion": "off",
    "@typescript-eslint/return-await": "off",
    "@typescript-eslint/use-unknown-in-catch-callback-variable": "off",

    // Some rules from the tseslint.configs.stylisticTypeChecked set:
    "@typescript-eslint/no-inferrable-types": "warn",
    // Some rules from the tseslint.configs.stylisticTypeChecked set that I might turn on in the future:
    // "@typescript-eslint/consistent-indexed-object-style": "warn",
    // "@typescript-eslint/prefer-for-of": "warn",
    // "@typescript-eslint/prefer-includes": "warn"
    // "@typescript-eslint/prefer-nullish-coalescing": "warn"
    // "@typescript-eslint/prefer-optional-chain": "warn"
  },
});

const reactJsxConfig = defineConfig({
  files: [
    "src/**/*.{jsx,tsx}",
    ".storybook/*.tsx",
    // "src/stories/Overview.mdx"
  ],
  extends: [
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat["jsx-runtime"],
    jsxA11y.flatConfigs.recommended,
    reactRefresh.configs.vite,
    reactHooks.configs.flat.recommended,
  ],
  settings: { ...reactSettings },
  rules: {
    "react/display-name": "off",
    "react/no-unescaped-entities": "off",
    "react/prop-types": "off",
    "react-refresh/only-export-components": "warn",

    // React Compiler rules
    // Disable all of these until we can gradually address them:
    "react-hooks/immutability": "off",
    "react-hooks/purity": "off",
    "react-hooks/set-state-in-effect": "off",
    "react-hooks/static-components": "off",
    "react-hooks/use-memo": "off",
    // Disable these because they are slow:
    "react-hooks/config": "off",
    "react-hooks/error-boundaries": "off",
    "react-hooks/component-hook-factories": "off",
    "react-hooks/gating": "off",
    "react-hooks/globals": "off",
    // 'react-hooks/immutability': 'off',
    "react-hooks/preserve-manual-memoization": "off",
    // 'react-hooks/purity': 'off',
    "react-hooks/refs": "off",
    // 'react-hooks/set-state-in-effect': 'off',
    "react-hooks/set-state-in-render": "off",
    // 'react-hooks/static-components': 'off',
    "react-hooks/unsupported-syntax": "off",
    // 'react-hooks/use-memo': 'off',
    "react-hooks/incompatible-library": "off",
  },
});

const storybookConfig = defineConfig({
  files: [
    "src/**/*.stories.{jsx,tsx}",
    ".storybook/*.{ts,tsx}",
    // "src/stories/Overview.mdx"
  ],
  extends: [storybook.configs["flat/recommended"]],
});

export default defineConfig([
  globalIgnores([
    // <https://eslint.org/docs/latest/use/configure/ignore#ignoring-files>
    // ["**/node_modules/", ".git/"] are ignored by default

    // Ignore all dot files:
    "**/.*",
    // … but allow specific dot folders:
    "!**/.storybook",
    // … and allow specific dot files:
    "!**/.prettierrc.json",
    // Ignore deps files:
    "**/yarn.lock",
    // Ignore build output folders:
    "**/build/",
    "**/storybook-static/",
    // Ignore log files:
    "**/*.log",
    // Ignore top-level folders:
    "bin/",
    "design/",
    "coverage/",
    "docs/",
    // Ignore top-level files:
    "tags",
    "tsconfig.tsbuildinfo",
  ]),
  jsConfig,
  tsConfig,
  reactJsxConfig,
  storybookConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: tsParser,
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            "eslint.config.mjs",
            ".storybook/*.{ts,tsx}",
            "vite.config.ts",
          ],
        },
      },
    },
  },
]);
