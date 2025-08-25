import eslintPluginPrettier from "eslint-plugin-prettier";
import unusedImports from "eslint-plugin-unused-imports";

export default [
    {
        files: ["src/**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "module",
        },
        plugins: {
            prettier: eslintPluginPrettier,
            "unused-imports": unusedImports,
        },
        rules: {
            "prettier/prettier": "warn",
            "no-console": "warn",
            "no-unused-vars": "off",
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_",
                },
            ],
        },
    },
];
