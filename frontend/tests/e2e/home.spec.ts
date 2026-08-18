import { expect, test } from "@playwright/test";

test.describe("Home Page Regression", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the public landing hero with title and description", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "FoodFighter", level: 1 });
    await expect(heading).toBeVisible();

    const subtitle = page.getByText("AI-Powered Group Meal Decision Platform");
    await expect(subtitle).toBeVisible();
  });

  test("navigates to login page via Log in button", async ({ page }) => {
    const main = page.getByRole("main");
    const loginLink = main.getByRole("link", { name: "Log in" });
    await loginLink.click();

    await expect(page).toHaveURL(/\/login/);
    const loginHeading = page.getByRole("heading", { name: "Welcome back", level: 1 });
    await expect(loginHeading).toBeVisible();
  });

  test("navigates to register page via Get Started button", async ({ page }) => {
    const main = page.getByRole("main");
    const getStartedLink = main.getByRole("link", { name: "Get Started" });
    await getStartedLink.click();

    await expect(page).toHaveURL(/\/register/);
    const registerHeading = page.getByRole("heading", { name: "Create your account", level: 1 });
    await expect(registerHeading).toBeVisible();
  });
});
