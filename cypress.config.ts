/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: {},
    },
  },
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.ts", 
    baseUrl: "http://localhost:5173",
    supportFile: "cypress/support/e2e.ts",
  },
});
