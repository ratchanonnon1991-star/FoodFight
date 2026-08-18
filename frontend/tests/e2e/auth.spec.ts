import { expect, test, type Page } from "@playwright/test";

async function enterOtpCode(page: Page, code: string) {
  for (let i = 0; i < code.length; i++) {
    await page.getByLabel(`Digit ${i + 1} of 6`).fill(code[i]);
  }
}

test.describe("Authentication E2E Regression", () => {
  test("complete registration and verification happy path", async ({ page }) => {
    await page.goto("/register");

    const uniqueEmail = `test.user.${Date.now()}@example.com`;

    await page.getByLabel(/full name/i).fill("Test User");
    await page.getByLabel(/^email address/i).fill(uniqueEmail);
    await page.getByLabel(/^password/i).fill("Password123");
    await page.getByLabel(/^confirm password/i).fill("Password123");
    await page.getByRole("checkbox").check();

    await page.getByRole("button", { name: /create account/i }).click();

    // Transition to /verify-email
    await expect(page).toHaveURL(/\/verify-email/);
    const verifyHeading = page.getByRole("heading", { name: "Verify your email", level: 1 });
    await expect(verifyHeading).toBeVisible();

    // Enter valid mock OTP code
    await enterOtpCode(page, "123456");
    await page.getByRole("button", { name: /verify otp/i }).click();

    // Transition to /verification-success
    await expect(page).toHaveURL(/\/verification-success/);
    const successHeading = page.getByRole("heading", { name: "Email verified!", level: 1 });
    await expect(successHeading).toBeVisible();
  });

  test("rejects duplicate email during registration", async ({ page }) => {
    await page.goto("/register");

    await page.getByLabel(/full name/i).fill("Duplicate User");
    await page.getByLabel(/^email address/i).fill("exists@example.com");
    await page.getByLabel(/^password/i).fill("Password123");
    await page.getByLabel(/^confirm password/i).fill("Password123");
    await page.getByRole("checkbox").check();

    await page.getByRole("button", { name: /create account/i }).click();

    const errorMessage = page.getByText("This email address is already registered.");
    await expect(errorMessage).toBeVisible();
    await expect(page).toHaveURL(/\/register/);
  });

  test("displays error for invalid OTP code during verification", async ({ page }) => {
    await page.goto("/register");

    await page.getByLabel(/full name/i).fill("Invalid OTP Tester");
    await page.getByLabel(/^email address/i).fill(`invalid-otp-${Date.now()}@example.com`);
    await page.getByLabel(/^password/i).fill("Password123");
    await page.getByLabel(/^confirm password/i).fill("Password123");
    await page.getByRole("checkbox").check();

    await page.getByRole("button", { name: /create account/i }).click();
    await expect(page).toHaveURL(/\/verify-email/);

    // Enter wrong OTP
    await enterOtpCode(page, "000000");
    await page.getByRole("button", { name: /verify otp/i }).click();

    const errorAlert = page.getByText("Invalid verification code. Please check and try again.");
    await expect(errorAlert).toBeVisible();
    await expect(page).toHaveURL(/\/verify-email/);
  });

  test("displays error for expired OTP code during verification", async ({ page }) => {
    await page.goto("/register");

    await page.getByLabel(/full name/i).fill("Expired OTP Tester");
    await page.getByLabel(/^email address/i).fill(`expired-otp-${Date.now()}@example.com`);
    await page.getByLabel(/^password/i).fill("Password123");
    await page.getByLabel(/^confirm password/i).fill("Password123");
    await page.getByRole("checkbox").check();

    await page.getByRole("button", { name: /create account/i }).click();
    await expect(page).toHaveURL(/\/verify-email/);

    // Enter expired mock OTP
    await enterOtpCode(page, "999999");
    await page.getByRole("button", { name: /verify otp/i }).click();

    const errorAlert = page.getByText("Verification code has expired. Please request a new code.");
    await expect(errorAlert).toBeVisible();
    await expect(page).toHaveURL(/\/verify-email/);
  });

  test("shows session fallback when accessing /verify-email without active challenge", async ({ page }) => {
    await page.goto("/verify-email");

    const fallbackHeading = page.getByRole("heading", { name: "Verification session not found" });
    await expect(fallbackHeading).toBeVisible();

    const registerLink = page.getByRole("link", { name: /register/i });
    await expect(registerLink).toBeVisible();
  });

  test("successful login redirects to Home page", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel(/email address/i).fill("valid@example.com");
    await page.getByLabel(/^password/i).fill("Password123");

    await page.getByRole("button", { name: /^log in/i }).click();

    await expect(page).toHaveURL("/");
    const homeHeading = page.getByRole("heading", { name: "FoodFighter", level: 1 });
    await expect(homeHeading).toBeVisible();
  });

  test("displays error when login fails with invalid credentials", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel(/email address/i).fill("wrong@example.com");
    await page.getByLabel(/^password/i).fill("WrongPassword1");

    await page.getByRole("button", { name: /^log in/i }).click();

    const errorAlert = page.getByText("Invalid email or password.");
    await expect(errorAlert).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });
});
