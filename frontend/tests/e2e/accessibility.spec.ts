import { expect, test } from "@playwright/test";

test.describe("Accessibility Fundamentals QA", () => {
  test("maintains single H1 hierarchy and landmarks on core routes", async ({ page }) => {
    const routes = [
      { path: "/", expectedH1: "FoodFighter" },
      { path: "/login", expectedH1: "Welcome back" },
      { path: "/register", expectedH1: "Create your account" },
      { path: "/food-profile/allergies", expectedH1: "Do you have any food allergies?" },
      { path: "/design-system", expectedH1: "Design System Reference" },
    ];

    for (const { path, expectedH1 } of routes) {
      await page.goto(path);
      const h1Headings = page.getByRole("heading", { level: 1 });
      await expect(h1Headings).toHaveCount(1);
      await expect(h1Headings.first()).toHaveText(expectedH1);
    }
  });

  test("provides accessible labels and semantic controls for Login form", async ({ page }) => {
    await page.goto("/login");

    const emailInput = page.getByLabel(/^email address/i);
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute("type", "email");

    const passwordInput = page.getByLabel(/^password/i);
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveAttribute("type", "password");

    const toggleButton = page.getByRole("button", { name: "Show password" });
    await expect(toggleButton).toBeVisible();
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute("type", "text");
    await expect(page.getByRole("button", { name: "Hide password" })).toBeVisible();

    const submitBtn = page.getByRole("button", { name: /^log in/i });
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeEnabled();
  });

  test("provides accessible labels and controls for Register form", async ({ page }) => {
    await page.goto("/register");

    const nameInput = page.getByLabel(/full name/i);
    await expect(nameInput).toBeVisible();

    const emailInput = page.getByLabel(/^email address/i);
    await expect(emailInput).toBeVisible();

    const passwordInput = page.getByLabel(/^password/i);
    await expect(passwordInput).toBeVisible();

    const confirmPasswordInput = page.getByLabel(/^confirm password/i);
    await expect(confirmPasswordInput).toBeVisible();

    const termsCheckbox = page.getByRole("checkbox");
    await expect(termsCheckbox).toBeVisible();

    const submitBtn = page.getByRole("button", { name: /create account/i });
    await expect(submitBtn).toBeVisible();
  });

  test("supports logical keyboard tab order on Login page", async ({ page }) => {
    await page.goto("/login");

    // Focus email input
    const emailInput = page.getByLabel(/^email address/i);
    await emailInput.focus();
    await expect(emailInput).toBeFocused();

    // Tab to Forgot password link button in form label header
    await page.keyboard.press("Tab");
    const forgotBtn = page.getByRole("button", { name: /forgot password/i });
    await expect(forgotBtn).toBeFocused();

    // Tab to password input
    await page.keyboard.press("Tab");
    const passwordInput = page.getByLabel(/^password/i);
    await expect(passwordInput).toBeFocused();

    // Tab to show password toggle button
    await page.keyboard.press("Tab");
    const toggleButton = page.getByRole("button", { name: "Show password" });
    await expect(toggleButton).toBeFocused();

    // Tab to Log in submit button
    await page.keyboard.press("Tab");
    const submitBtn = page.getByRole("button", { name: /^log in/i });
    await expect(submitBtn).toBeFocused();
  });
});
