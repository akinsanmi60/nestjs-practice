module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "@typescript-eslint",
    "prettier",
  ],
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-console": [
      1,
      {
        allow: ["clear", "info", "error", "dir", "trace", "log"],
      },
    ],
    "no-nested-ternary": "off",
    "no-unused-vars": [0, {}],
    newIsCap: 0,
    "new-cap": "off",
    "linebreak-style": 0,
    "global-require": 0,
    "no-underscore-dangle": "off",
    "prettier/prettier": [
      "off",
      { endOfLine: "auto" },
      { usePrettierrc: true },
      { printWidth: 120 },
    ],
  },
};
