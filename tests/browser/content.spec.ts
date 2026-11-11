import { test, expect } from "@playwright/test";

test("audit evidence preview supports keyboard exploration and keeps scope explicit @smoke", async ({ page }) => {
  await page.goto("/trust");
  const tabs = page.getByRole("tablist", { name: "Explore audit report contents", exact: true });
  const scope = tabs.getByRole("tab", { name: "Scope", exact: true });
  const actions = tabs.getByRole("tab", { name: "Actions", exact: true });
  const events = tabs.getByRole("tab", { name: "Gateway events", exact: true });
  const integrity = tabs.getByRole("tab", { name: "Integrity", exact: true });

  await expect(scope).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel", { name: "Scope", exact: true })).toContainText("Report scope");
  await expect(page.getByText("Illustrative report anatomy", { exact: true })).toBeVisible();

  await scope.focus();
  await scope.press("ArrowRight");
  await expect(actions).toBeFocused();
  await expect(actions).toHaveAttribute("aria-selected", "true");
  await expect(scope).toHaveAttribute("tabindex", "-1");
  await expect(page.getByRole("tabpanel", { name: "Actions", exact: true })).toContainText("Actor");
  await expect(page.getByRole("tabpanel", { name: "Scope", exact: true, includeHidden: true })).toBeHidden();

  await actions.press("End");
  await expect(integrity).toBeFocused();
  await expect(page.getByRole("tabpanel", { name: "Integrity", exact: true })).toContainText("Verification material");
  await expect(page.getByText(/Integrity verification detects changes within its verification scope\./)).toBeVisible();

  await events.click();
  await expect(events).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel", { name: "Gateway events", exact: true })).toContainText("Gateway identity");
  await expect(page.getByText(/Gateway reports cover the retained telemetry window\./)).toBeVisible();

  await events.press("Home");
  await expect(scope).toBeFocused();
  await expect(page.getByRole("tabpanel", { name: "Scope", exact: true })).toBeVisible();
  await expect(page.getByText(/It contains no customer records and is not an exported product report\./)).toBeVisible();
});

test("technical FAQs can be opened and closed with the keyboard @smoke", async ({ page }) => {
  await page.goto("/resources#faq");
  const question = page.locator("#faq summary").filter({ hasText: "What does passive discovery actually see?" });
  const disclosure = question.locator("..");
  const answer = disclosure.getByRole("link", { name: "Explore passive discovery", exact: true });

  await expect(disclosure).toHaveJSProperty("open", false);
  await expect(answer).toBeHidden();
  await question.focus();
  await question.press("Enter");
  await expect(disclosure).toHaveJSProperty("open", true);
  await expect(disclosure).toContainText("It does not probe systems");
  await expect(answer).toBeVisible();
  await expect(answer).toHaveAttribute("href", "/platform#discovery");

  await question.press("Space");
  await expect(disclosure).toHaveJSProperty("open", false);
  await expect(answer).toBeHidden();
  await expect(question).toBeFocused();
});

test("use cases state their protection boundary and are reachable from the topic navigation @smoke", async ({ page }) => {
  await page.goto("/use-cases");
  await page.getByRole("navigation", { name: "Use case topics", exact: true }).getByRole("link", { name: "Site-to-site traffic", exact: true }).click();
  await expect(page).toHaveURL(/\/use-cases#site-to-site$/);
  const scenario = page.locator("#site-to-site");
  await expect(scenario).toContainText("ML-KEM key establishment");
  await expect(scenario).toContainText("IKEv2 and ESP reachability");
  await expect(scenario.getByRole("list", { name: /Blue segments are protected by QuantumHalon/ })).toBeVisible();
  await expect(page.getByText(/Scenarios are illustrative and describe no specific customer/)).toBeVisible();
});
