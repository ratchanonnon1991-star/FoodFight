import { expect, test } from "@playwright/test";

const ROUTES = [
  { path: "/", name: "home" },
  { path: "/login", name: "login" },
  { path: "/register", name: "register" },
  { path: "/design-system", name: "design-system" },
] as const;

test.describe("Visual Regression Baselines", () => {
  test.beforeEach(async ({ page }) => {
    // Hide Next.js dev server overlay indicators in test environments
    await page.addInitScript(() => {
      const injectDevStyle = () => {
        const style = document.createElement("style");
        style.setAttribute("data-test-visual-cleanup", "true");
        style.innerHTML = `
          nextjs-portal,
          [data-nextjs-portal],
          [data-nextjs-toast],
          [data-nextjs-dialog-overlay],
          #__next-build-watcher,
          [data-next-badge],
          [data-nextjs-dev-tools-button],
          [data-nextjs-dev-tools-badge],
          [data-nextjs-dev-overlay] {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;
          }
        `;
        document.head.appendChild(style);
      };
      if (document.head) {
        injectDevStyle();
      } else {
        document.addEventListener("DOMContentLoaded", injectDevStyle);
      }
    });
  });

  test.describe("Mobile Viewport (390x844)", () => {
    test.use({ viewport: { width: 390, height: 844 } });

    for (const route of ROUTES) {
      test(`captures baseline for ${route.name} at 390px`, async ({ page }) => {
        await page.goto(route.path);
        await page.waitForLoadState("domcontentloaded");
        await page.evaluate(() => document.fonts.ready);

        await expect(page).toHaveScreenshot(`${route.name}-mobile-390.png`, {
          animations: "disabled",
          fullPage: true,
        });
      });
    }
  });

  test.describe("Desktop Viewport (1440x900)", () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    for (const route of ROUTES) {
      test(`captures baseline for ${route.name} at 1440px`, async ({ page }) => {
        await page.goto(route.path);
        await page.waitForLoadState("domcontentloaded");
        await page.evaluate(() => document.fonts.ready);

        await expect(page).toHaveScreenshot(`${route.name}-desktop-1440.png`, {
          animations: "disabled",
          fullPage: true,
        });
      });
    }
  });
});
