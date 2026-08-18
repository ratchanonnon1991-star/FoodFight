import { expect, test } from "@playwright/test";

const VIEWPORTS = [
  { name: "mobile-compact", width: 360, height: 800 },
  { name: "mobile-primary", width: 390, height: 844 },
  { name: "mobile-large", width: 430, height: 932 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

const ROUTES = [
  { path: "/", name: "Home" },
  { path: "/login", name: "Login" },
  { path: "/register", name: "Register" },
  { path: "/design-system", name: "Design System" },
] as const;

test.describe("Responsive Layout & Overflow QA", () => {
  for (const vp of VIEWPORTS) {
    test.describe(`Viewport ${vp.name} (${vp.width}x${vp.height})`, () => {
      test.use({ viewport: { width: vp.width, height: vp.height } });

      for (const route of ROUTES) {
        test(`renders ${route.name} without horizontal overflow`, async ({ page }) => {
          await page.goto(route.path);
          await page.waitForLoadState("domcontentloaded");

          // Ensure font loading has completed
          await page.evaluate(() => document.fonts.ready);

          // Horizontal overflow check: scrollWidth must not exceed clientWidth
          const { scrollWidth, clientWidth } = await page.evaluate(() => ({
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
          }));

          // Allow at most 1px tolerance for subpixel rounding
          expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

          // Verify heading is visible
          const h1 = page.getByRole("heading", { level: 1 });
          await expect(h1).toBeVisible();
        });
      }
    });
  }
});
