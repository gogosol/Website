const { chromium } = require("@playwright/test");
const routes = require("./tests/routes.json");

module.exports = {
  defaults: {
    standard: "WCAG2AA",
    runners: ["htmlcs"],
    timeout: 60000,
    wait: 2000,
    chromeLaunchConfig: { executablePath: chromium.executablePath(), headless: true },
  },
  urls: routes.map((route) => `http://127.0.0.1:3102${route}`),
};
