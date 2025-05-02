// eslint.config.js
import { defineConfig } from "eslint-define-config";
import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default defineConfig({
 plugins: {
  "@typescript-eslint": tsPlugin,
  react: reactPlugin,
  "react-hooks": hooksPlugin,
 },
 languageOptions: {
  parser: tsParser,
  parserOptions: {
   ecmaVersion: "latest",
   sourceType: "module",
   ecmaFeatures: {
    jsx: true,
   },
  },
 },
 rules: {
  ...js.configs.recommended.rules,
  ...tsPlugin.configs.recommended.rules,
  ...reactPlugin.configs.recommended.rules,
  ...hooksPlugin.configs.recommended.rules,
  "react/react-in-jsx-scope": "off",
  "react/prop-types": "off",
 },
 settings: {
  react: {
   version: "detect",
  },
 },
});
