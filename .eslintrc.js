module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    project: "./tsconfig.*?.json",
    sourceType: "module",
    createDefaultProgram: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  // ignorePatterns: ["**/*"],
  plugins: ["@typescript-eslint"],
  rules: { "@typescript-eslint/no-explicit-any": 2 },
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
