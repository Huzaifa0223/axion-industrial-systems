import { test, expect } from "@playwright/test";

test.describe("Axion Industrial Systems - E2E Test Suite", () => {
  test("homepage loads successfully and displays hero branding", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Axion/i);
    await expect(page.getByRole("region", { name: /Highlighted Automation Capabilities/i })).toBeVisible();
    await expect(page.getByText(/Axion Engineering Specialists/i).first()).toBeVisible();
  });

  test("mega menu opens and closes via keyboard Escape", async ({ page }) => {
    await page.goto("/");
    const productsBtn = page.getByRole("menuitem", { name: /Products/i }).first();
    await productsBtn.click();

    // Verify submenu is visible
    const submenu = page.getByRole("region", { name: /Products Submenu/i });
    await expect(submenu).toBeVisible();

    // Press Escape to dismiss
    await page.keyboard.press("Escape");
    await expect(submenu).not.toBeVisible();
  });

  test("every main nav route resolves without error", async ({ page }) => {
    const routes = [
      "/about",
      "/about/firmware",
      "/about/structure",
      "/products",
      "/products/automation-systems",
      "/solutions",
      "/solutions/industrial-iiot",
      "/projects",
      "/projects/pump-station-scada-upgrade",
      "/careers",
      "/contact",
    ];

    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("main")).toBeVisible();
    }
  });

  test("projects filter updates URL and filters items", async ({ page }) => {
    await page.goto("/projects");
    await expect(page.getByText(/Water & Wastewater/i).first()).toBeVisible();

    // Click Water sector filter
    const waterBtn = page.getByRole("button", { name: /Water & Wastewater/i });
    await waterBtn.click();

    // URL should have ?sector=water
    await expect(page).toHaveURL(/.*sector=water/);
    await expect(page.getByText(/Pump Station SCADA Upgrade/i)).toBeVisible();
  });

  test("enquiry form validates required fields and submits against mock endpoint", async ({ page }) => {
    await page.goto("/contact");

    // Click submit without filling fields
    const submitBtn = page.getByRole("button", { name: /Send Enquiry/i });
    await submitBtn.click();

    // Validation messages should appear
    await expect(page.getByText(/Full name is required/i)).toBeVisible();

    // Fill required fields
    await page.fill('input[name="fullName"]', "Test Engineer");
    await page.fill('input[name="company"]', "Global Automation Corp");
    await page.fill('input[name="email"]', "test@automation.corp");
    await page.selectOption('select[name="interest"]', { label: "Industrial Automation" });
    await page.fill('textarea[name="message"]', "Requesting engineering consultation on line integration.");
    await page.check('input[name="consent"]');

    // Submit valid form
    await submitBtn.click();

    // Success message should appear
    await expect(
      page.getByText(/Thanks — an engineer will reply within one working day/i)
    ).toBeVisible({ timeout: 5000 });
  });

  test("reduced motion disables Three.js canvas in hero", async ({ page }) => {
    // Emulate reduced motion
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    // Three.js Canvas should NOT exist in the DOM
    const canvas = page.locator("canvas");
    await expect(canvas).toHaveCount(0);
  });

  test("mobile viewport at 375px has no horizontal scroll", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);

    // There should be no horizontal overflow at 375px
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });
});
