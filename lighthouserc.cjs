const { chromium } = require("@playwright/test");
const routes = require("./tests/routes.json");

module.exports = {
  ci: {
    collect: {
      url: routes.map((route) => `http://127.0.0.1:3101${route}`),
      startServerCommand: "node scripts/serve-quality.mjs 3101",
      startServerReadyPattern: "Ready in",
      startServerReadyTimeout: 120000,
      chromePath: chromium.executablePath(),
      numberOfRuns: 3,
      settings: { chromeFlags: "--headless" },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9, aggregationMethod: "median" }],
        "categories:accessibility": ["error", { minScore: 0.95, aggregationMethod: "median" }],
        "categories:seo": ["error", { minScore: 0.95, aggregationMethod: "median" }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2500, aggregationMethod: "median" }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1, aggregationMethod: "median" }],
      },
    },
    upload: { target: "filesystem", outputDir: ".artifacts/lighthouse" },
  },
};
