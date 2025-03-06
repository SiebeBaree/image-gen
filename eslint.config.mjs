import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import stylistic from "@stylistic/eslint-plugin";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
// @ts-ignore
import reactHooks from "eslint-plugin-react-hooks";
// @ts-ignore
import nextPlugin from "@next/eslint-plugin-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const config = [
    { ignores: [".next", "node_modules", "eslint.config.mjs"] },
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    pluginJs.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    pluginReact.configs.flat.recommended,
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: __dirname,
            },
        },
        plugins: {
            react: pluginReact,
            prettier: prettier,
            "react-hooks": reactHooks,
            "@typescript-eslint": tsPlugin,
            "@stylistic": stylistic,
            "@next/next": nextPlugin,
        },
        rules: {
            ...pluginJs.configs.recommended.rules,
            ...tsPlugin.configs?.["recommended-type-checked"]?.rules,
            ...tsPlugin.configs?.["stylistic-type-checked"]?.rules,
            ...reactHooks.configs.recommended.rules,
            ...pluginReact.configs["jsx-runtime"].rules,
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs["core-web-vitals"].rules,
            "react-hooks/exhaustive-deps": "off",

            "no-console": "warn",
            "no-debugger": "error",
            "no-duplicate-imports": "error",
            "no-cond-assign": "error",
            "prefer-const": "error",
            "no-var": "error",
            "no-unused-expressions": "error",

            "@stylistic/semi": ["error", "always"],
            "@stylistic/quotes": ["error", "double"],
            "@stylistic/no-extra-semi": "error",
            "@stylistic/no-trailing-spaces": "error",

            "prettier/prettier": "error",

            "react/prop-types": "off",

            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/array-type": "off",
            "@typescript-eslint/consistent-type-definitions": "off",
            "@typescript-eslint/consistent-type-imports": [
                "warn",
                {
                    prefer: "type-imports",
                    fixStyle: "inline-type-imports",
                },
            ],
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/require-await": "off",
            "@typescript-eslint/no-misused-promises": [
                "error",
                {
                    checksVoidReturn: {
                        attributes: false,
                    },
                },
            ],
            "@typescript-eslint/restrict-template-expressions": "off",
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/no-confusing-void-expression": "off",
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
];

export default config;
