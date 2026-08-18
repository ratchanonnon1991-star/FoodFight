import { expect, test } from "@playwright/test";

test.describe("Frontend Smoke Tests", () => {
  test("loads the Home page successfully", async ({ page }) => {
    await page.goto("/");

    const heading = page.getByRole("heading", { name: "FoodFighter", level: 1 });
    await expect(heading).toBeVisible();

    const main = page.getByRole("main");
    const getStartedLink = main.getByRole("link", { name: "Get Started" });
    await expect(getStartedLink).toBeVisible();

    const loginLink = main.getByRole("link", { name: "Log in" });
    await expect(loginLink).toBeVisible();
  });

  test("loads the Login page successfully", async ({ page }) => {
    await page.goto("/login");

    const heading = page.getByRole("heading", { name: "Welcome back", level: 1 });
    await expect(heading).toBeVisible();

    const emailInput = page.getByLabel(/email/i);
    await expect(emailInput).toBeVisible();

    const passwordInput = page.getByLabel(/^password/i);
    await expect(passwordInput).toBeVisible();

    const submitButton = page.getByRole("button", { name: /^log in/i });
    await expect(submitButton).toBeVisible();
  });

  test("loads the Register page successfully", async ({ page }) => {
    await page.goto("/register");

    const heading = page.getByRole("heading", { name: "Create your account", level: 1 });
    await expect(heading).toBeVisible();

    const nameInput = page.getByLabel(/name/i);
    await expect(nameInput).toBeVisible();

    const emailInput = page.getByLabel(/email/i);
    await expect(emailInput).toBeVisible();

    const submitButton = page.getByRole("button", { name: /create account/i });
    await expect(submitButton).toBeVisible();
  });

  test("loads the Design System Showcase page successfully", async ({ page }) => {
    await page.goto("/design-system");

    const heading = page.getByRole("heading", { name: "Design System Reference", level: 1 });
    await expect(heading).toBeVisible();

    const nav = page.getByRole("navigation", { name: "Design System Navigation" });
    await expect(nav).toBeVisible();
  });
});
