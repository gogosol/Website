import { test, expect, type Page } from "@playwright/test";
import routes from "../routes.json";

for (const route of routes) {
  test(`${route} loads with valid navigation, metadata, and images @smoke`, async ({ page, request }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page).toHaveTitle(/QCertify/i);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://qcertify.io${route === "/" ? "" : route}`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /\S.{60,}/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /QCertify/i);

    const links = await page.locator("a[href]").evaluateAll((elements) =>
      elements.map((element) => (element as HTMLAnchorElement).href),
    );
    for (const href of new Set(links)) {
      const url = new URL(href);
      if (url.origin !== new URL(page.url()).origin) continue;
      if (url.pathname === new URL(page.url()).pathname && url.hash) {
        expect(await page.evaluate((id) => !!document.getElementById(id), decodeURIComponent(url.hash.slice(1))), href).toBe(true);
      } else if (!url.pathname.startsWith("/api/")) {
        expect((await request.get(url.href)).ok(), href).toBe(true);
      }
    }
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0), {
        message: `Image should load: ${await image.getAttribute("src")}`,
      }).toBe(true);
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(overflow, "Page should fit the viewport").toBe(false);
    expect(errors, "Uncaught browser and console errors").toEqual([]);
  });
}

test("public routes have distinct page titles and descriptions @smoke", async ({ request }) => {
  const titles: string[] = [];
  const descriptions: string[] = [];
  for (const route of routes) {
    const html = await (await request.get(route)).text();
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    expect(title, `Title for ${route}`).toBeTruthy();
    expect(description, `Description for ${route}`).toBeTruthy();
    titles.push(title!);
    descriptions.push(description!);
  }
  expect(new Set(titles).size).toBe(routes.length);
  expect(new Set(descriptions).size).toBe(routes.length);
});

test("mobile navigation supports Escape, focus return, and route changes @smoke", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 1440) > 1080, "Mobile navigation is shown below 1080px.");
  await page.goto("/");
  const open = page.getByRole("button", { name: "Open navigation", exact: true });
  await open.click();
  const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(navigation).toBeVisible();
  await expect(page.getByRole("button", { name: "Close navigation", exact: true })).toHaveAttribute("aria-expanded", "true");
  await navigation.getByRole("link", { name: "Platform", exact: true }).focus();
  await page.keyboard.press("Escape");
  await expect(navigation).toBeHidden();
  await expect(open).toBeFocused();
  await open.click();
  await navigation.getByRole("link", { name: "Platform", exact: true }).click();
  await expect(page).toHaveURL(/\/platform$/);
  await expect(navigation).toBeHidden();
  await open.click();
  await expect(navigation.getByRole("link", { name: "Platform", exact: true })).toHaveAttribute("aria-current", "page");
});

test("platform follows Discover, Define policy, Enforce and Verify with labelled conceptual visuals @smoke", async ({ page }) => {
  await page.goto("/platform");
  const steps = page.getByRole("navigation", { name: "Platform steps", exact: true });
  for (const name of ["Discover", "Define policy", "Enforce", "Verify"]) await expect(steps.getByRole("link", { name: new RegExp(name) })).toBeVisible();
  await steps.getByRole("link", { name: /Enforce/ }).click();
  await expect(page).toHaveURL(/\/platform#enforce$/);
  for (const id of ["discovery", "policy", "enforce", "verify"]) {
    const section = page.locator(`#${id}`);
    await expect(section.getByRole("img").first()).toHaveAccessibleName(/Illustration/);
    await expect(section.getByText(/Conceptual (illustration|view)/i).first()).toBeVisible();
  }
});

test("public pages show no product Console captures @smoke", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    const sources = await page.locator("img").evaluateAll((images) => images.map((image) => (image as HTMLImageElement).currentSrc || (image as HTMLImageElement).src));
    expect(sources.filter((source) => /console-|screenshot|capture/i.test(source)), `${route} images`).toEqual([]);
    await expect(page.getByRole("tablist", { name: /Console views/ })).toHaveCount(0);
  }
});

test("architecture lab redraws scenarios and outcomes with pointer and keyboard @smoke", async ({ page }) => {
  await page.goto("/architecture");
  const scenarios = page.getByRole("tablist", { name: "Network scenarios", exact: true });
  const sites = scenarios.getByRole("tab", { name: "Site to site", exact: true });
  const application = scenarios.getByRole("tab", { name: "Critical application", exact: true });
  const partner = scenarios.getByRole("tab", { name: "Partner federation", exact: true });
  const outcomes = page.getByRole("radiogroup", { name: "Policy outcome", exact: true });
  const mode2 = outcomes.getByRole("radio", { name: "Mode 2 · IPsec", exact: true });
  const mode1 = outcomes.getByRole("radio", { name: "Mode 1 · TLS mediation", exact: true });
  const block = outcomes.getByRole("radio", { name: "Block", exact: true });
  await expect(sites).toHaveAttribute("aria-selected", "true");
  await expect(mode2).toHaveAttribute("aria-checked", "true");
  await expect(mode1).toHaveAttribute("aria-disabled", "true");
  const sitesPanel = page.getByRole("tabpanel", { name: "Site to site", exact: true });
  await expect(sitesPanel).toContainText("Protection begins when the first gateway encapsulates the packet");
  await expect(sitesPanel).toContainText("Each gateway authenticates to its configured peer");
  await expect(sitesPanel.getByRole("group").first()).toHaveAccessibleName(/Site to site: Mode 2 IPsec/);
  await mode1.click({ force: true });
  await expect(mode2).toHaveAttribute("aria-checked", "true");
  await sites.focus();
  await sites.press("ArrowRight");
  await expect(application).toBeFocused();
  await expect(application).toHaveAttribute("aria-selected", "true");
  await expect(mode1).toHaveAttribute("aria-checked", "true");
  const applicationPanel = page.getByRole("tabpanel", { name: "Critical application", exact: true });
  await expect(applicationPanel).toContainText("There are two TLS legs");
  await expect(applicationPanel).toContainText("Clients trust the inspection root you distribute");
  await mode1.focus();
  await mode1.press("ArrowRight");
  await expect(outcomes.getByRole("radio", { name: "Passthrough", exact: true })).toBeFocused();
  await block.click();
  await expect(block).toHaveAttribute("aria-checked", "true");
  await expect(applicationPanel).toContainText("denied at the first gateway");
  await application.press("ArrowRight");
  await expect(partner).toHaveAttribute("aria-selected", "true");
  await expect(block).toHaveAttribute("aria-checked", "true");
  await mode2.click();
  const partnerPanel = page.getByRole("tabpanel", { name: "Partner federation", exact: true });
  await expect(partnerPanel).toContainText("Two control planes");
  await expect(partnerPanel).toContainText("manages only its own gateway");
  await partnerPanel.getByRole("button", { name: /control plane/i }).first().click();
  await expect(partnerPanel).toContainText("Customer-controlled control plane.");
});

test("the exposure model evaluates x + y > z without predicting a date @smoke", async ({ page }) => {
  await page.goto("/resources#exposure");
  const lifetime = page.getByRole("slider", { name: /Confidentiality lifetime/ });
  const migration = page.getByRole("slider", { name: /Migration time/ });
  const arrival = page.getByRole("slider", { name: /Assumed arrival/ });
  const verdict = page.locator("#exposure").getByRole("status").filter({ hasText: /x \+ y =/ });
  await expect(lifetime).toHaveValue("10");
  await expect(migration).toHaveValue("5");
  await expect(arrival).toHaveValue("12");
  await expect(verdict).toContainText("x + y = 15 is greater than z = 12");
  await expect(verdict).toContainText("up to 3 years");
  await arrival.focus();
  for (let step = 0; step < 6; step++) await arrival.press("ArrowRight");
  await expect(verdict).toContainText("x + y = 15 is less than z = 18");
  await expect(verdict).toContainText("margin of 3 years");
  await lifetime.focus();
  for (let step = 0; step < 3; step++) await lifetime.press("ArrowRight");
  await expect(verdict).toContainText("x + y = 18 equals z = 18");
  await expect(page.getByText(/An assumption to test, not a forecast/)).toBeVisible();
});

test("public pages carry no lab narrative, no booking promise and no Mode 2 ML-DSA claim @smoke", async ({ request }) => {
  const forbidden = [/lab[- ]validated/i, /lab[- ]proven/i, /lab capture/i, /QCertify.s lab/i, /controlled lab/i, /release 2026/i, /production[- ]approved/i, /enterprise[- ]certified/i, /not yet available/i, /in this release/i, /qualification/i, /devtunnels/i, /mascot/i, /\bbook (a|your) (technical )?demo\b/i, /ML-DSA signatures between the two gateways/i];
  for (const route of routes) {
    const html = await (await request.get(route)).text();
    // Block-level closing tags become segment breaks, so table cells and list items are read separately.
    const text = html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<\/(p|li|td|th|h[1-6]|dd|dt|div|caption|summary|figcaption|title|desc|text|button)>/gi, " ¶ ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ");
    for (const pattern of forbidden) expect(text, `${route} must not match ${pattern}`).not.toMatch(pattern);
    // Wording rule from docs/rebuild/product-evidence.md (internal): no sentence pairs Mode 2 with ML-DSA.
    for (const sentence of text.split(/¶|(?<=[.!?])\s+/)) {
      if (/Mode 2/.test(sentence)) expect(sentence, `${route}: Mode 2 sentence`).not.toMatch(/ML-DSA/);
    }
  }
});

test("demo links preselect the request type, including older goal links @smoke", async ({ page }) => {
  await page.goto("/demo?intent=deployment");
  await expect(page.getByRole("radio", { name: /To discuss a pilot or deployment/ })).toBeChecked();
  await expect(page.getByRole("button", { name: "Request a deployment conversation", exact: true })).toBeVisible();
  await page.goto("/demo?goal=launch-pilot");
  await expect(page.getByRole("radio", { name: /To discuss a pilot or deployment/ })).toBeChecked();
  await page.goto("/demo?goal=site-to-site");
  await expect(page.getByRole("radio", { name: /A technical demo/ })).toBeChecked();
  await expect(page.getByLabel(/Area of interest/)).toHaveValue("site-to-site");
});

async function fillDemo(page: Page) {
  await page.getByLabel("Name", { exact: true }).fill("Website test");
  await page.getByLabel("Work email", { exact: true }).fill("qa@example.com");
  await page.getByLabel("Organisation", { exact: true }).fill("Example company");
}

const FORM = "Contact QCertify about QuantumHalon";

test("demo form validates fields without contacting the service @smoke", async ({ page }) => {
  let requests = 0;
  await page.route("**/api/contact", (route) => { requests++; return route.abort(); });
  await page.goto("/demo");
  await page.getByRole("button", { name: "Request a technical demo", exact: true }).click();
  await expect(page.locator('[aria-invalid="true"]')).toHaveCount(3);
  await expect(page.getByLabel("Name", { exact: true })).toBeFocused();
  await expect(page.getByText("Enter your name.", { exact: true })).toBeVisible();
  await fillDemo(page);
  await page.getByLabel("Work email", { exact: true }).fill("invalid-email");
  await page.getByRole("button", { name: "Request a technical demo", exact: true }).click();
  await expect(page.getByLabel("Work email", { exact: true })).toBeFocused();
  await expect(page.getByText("Enter a valid email address, such as name@company.com.", { exact: true })).toBeVisible();
  expect(requests).toBe(0);
});

test("demo form preserves input after failure and confirms a successful retry @smoke", async ({ page }) => {
  let requests = 0;
  await page.route("**/api/contact", (route) => {
    requests++;
    expect(route.request().postDataJSON()).toMatchObject({ intent: "deployment", name: "Website test", email: "qa@example.com", company: "Example company", interest: "not-sure", website: "" });
    return route.fulfill({
      status: requests === 1 ? 503 : 200,
      contentType: "application/json",
      body: JSON.stringify(requests === 1 ? { ok: false, message: "Test service unavailable. Please try again." } : { ok: true, message: "Test request received." }),
    });
  });
  await page.goto("/demo");
  await page.getByRole("radio", { name: /To discuss a pilot or deployment/ }).check();
  await fillDemo(page);
  await page.getByRole("button", { name: "Request a deployment conversation", exact: true }).click();
  await expect(page.getByRole("form", { name: FORM }).getByRole("alert")).toHaveText("Test service unavailable. Please try again.");
  await expect(page.getByLabel("Name", { exact: true })).toHaveValue("Website test");
  await expect(page.getByLabel("Work email", { exact: true })).toHaveValue("qa@example.com");
  await expect(page.getByLabel("Organisation", { exact: true })).toHaveValue("Example company");
  await expect(page.getByRole("radio", { name: /To discuss a pilot or deployment/ })).toBeChecked();
  await page.getByRole("button", { name: "Request a deployment conversation", exact: true }).click();
  await expect(page.getByText("Test request received.", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Thank you. Your request is with us.", exact: true })).toBeFocused();
  expect(requests).toBe(2);
});

test("demo form never shows success when the service reports a failure in a 200 response @smoke", async ({ page }) => {
  await page.route("**/api/contact", (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: false, message: "Not delivered." }) }));
  await page.goto("/demo");
  await fillDemo(page);
  await page.getByRole("button", { name: "Request a technical demo", exact: true }).click();
  await expect(page.getByRole("form", { name: FORM }).getByRole("alert")).toHaveText("Not delivered.");
  await expect(page.getByRole("heading", { name: "Thank you. Your request is with us." })).toHaveCount(0);
});

test("demo submission disables controls until the request completes @smoke", async ({ page }) => {
  let release: (() => void) | undefined;
  const waiting = new Promise<void>((resolve) => { release = resolve; });
  await page.route("**/api/contact", async (route) => {
    await waiting;
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, message: "Test request received." }) });
  });
  await page.goto("/demo");
  await fillDemo(page);
  await page.getByRole("button", { name: "Request a technical demo", exact: true }).click();
  try {
    await expect(page.getByRole("button", { name: "Sending request…", exact: true })).toBeDisabled();
    await expect(page.getByLabel("Work email", { exact: true })).toBeDisabled();
    await expect(page.getByRole("form", { name: FORM })).toHaveAttribute("aria-busy", "true");
  } finally {
    release?.();
  }
  await expect(page.getByText("Test request received.", { exact: true })).toBeVisible();
});

test("demo form handles an interrupted connection without losing input @smoke", async ({ page }) => {
  await page.route("**/api/contact", (route) => route.abort("failed"));
  await page.goto("/demo");
  await fillDemo(page);
  await page.getByRole("button", { name: "Request a technical demo", exact: true }).click();
  await expect(page.getByRole("form", { name: FORM }).getByRole("alert")).toContainText("We could not confirm delivery.");
  await expect(page.getByLabel("Organisation", { exact: true })).toHaveValue("Example company");
  await expect(page.getByRole("button", { name: "Request a technical demo", exact: true })).toBeEnabled();
});
