module.exports = {
  env: {
    es6: true,
  },
  extends: ["plugin:@darraghor/nestjs-typed/recommended", "plugin:@darraghor/nestjs-typed/no-swagger"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    sourceType: "module",
    ecmaVersion: "es2019",
  },
  plugins: ["@darraghor/nestjs-typed"],
};
