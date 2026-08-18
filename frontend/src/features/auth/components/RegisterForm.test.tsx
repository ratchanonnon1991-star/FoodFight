import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RegisterForm } from "./RegisterForm";
import { AuthFlowProvider } from "@/features/auth/context/auth-flow-context";
import { authService } from "@/features/auth/services/auth-runtime";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
    React.createElement("a", { href, ...rest }, children),
}));

describe("RegisterForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <AuthFlowProvider>
        <RegisterForm />
      </AuthFlowProvider>
    );

  it("renders all registration inputs and submit button", () => {
    renderComponent();

    expect(screen.getByRole("heading", { name: "Create your account" })).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument();
  });

  it("shows client-side validation errors when submitted empty", async () => {
    const user = userEvent.setup();
    renderComponent();

    const submitBtn = screen.getByRole("button", { name: /create account/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText("Full Name is required")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Password must be at least 8 characters")).toBeInTheDocument();
      expect(screen.getByText("Please confirm your password")).toBeInTheDocument();
      expect(screen.getByText("You must accept the Terms of Service and Privacy Policy")).toBeInTheDocument();
    });
  });

  it("shows duplicate email error message returned by authService", async () => {
    const user = userEvent.setup();
    vi.spyOn(authService, "register").mockResolvedValueOnce({
      ok: false,
      error: {
        kind: "duplicate_email",
        message: "This email address is already registered.",
      },
    });

    renderComponent();

    await user.type(screen.getByLabelText(/full name/i), "John Doe");
    await user.type(screen.getByLabelText(/^email address/i), "exists@example.com");
    await user.type(screen.getByLabelText(/^password/i), "Password123");
    await user.type(screen.getByLabelText(/^confirm password/i), "Password123");
    await user.click(screen.getByRole("checkbox"));

    await user.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText("This email address is already registered.")).toBeInTheDocument();
    });
  });

  it("submits valid form and navigates to verify email", async () => {
    const user = userEvent.setup();
    vi.spyOn(authService, "register").mockResolvedValueOnce({
      ok: true,
      data: {
        email: "new@example.com",
        expiresAt: Date.now() + 300000,
        resendAvailableAt: Date.now() + 45000,
      },
    });

    renderComponent();

    await user.type(screen.getByLabelText(/full name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/^email address/i), "new@example.com");
    await user.type(screen.getByLabelText(/^password/i), "Password123");
    await user.type(screen.getByLabelText(/^confirm password/i), "Password123");
    await user.click(screen.getByRole("checkbox"));

    await user.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/verify-email");
    });
  });
});
