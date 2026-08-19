import type { AuthService } from "./auth-service";
import type {
  AuthResult,
  LoginInput,
  RegisterInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  EmailVerificationInput,
  ChangeEmailInput,
  EmailVerificationChallenge,
} from "../types/auth-types";
import type { LoginResultData } from "./auth-service";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8888";

type LoginResponse = {
  accessToken: string;
};

type RegisterResponse = {
  id: string;
  email: string;
  message: string;
  expiresAt: string;
  resendAvailableAt: string;
};

type VerificationChallengeResponse = {
  message: string;
  email?: string;
  expiresAt?: string;
  resendAvailableAt?: string;
};

type ApiErrorResponse = {
  message?: string | string[];
};

type OAuthProvider = "google" | "line";

async function readApiError(
  response: Response,
  fallback: string,
): Promise<string> {
  const errorData = (await response
    .json()
    .catch(() => null)) as ApiErrorResponse | null;

  if (Array.isArray(errorData?.message)) {
    return errorData.message.join(", ");
  }

  return errorData?.message ?? fallback;
}

// =========================
// LOGIN
// =========================

async function login(input: LoginInput): Promise<AuthResult<LoginResultData>> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: input.email,
        password: input.password,
      }),
    });

    if (!response.ok) {
      const message = await readApiError(response, "Unable to login.");

      if (response.status === 401) {
        return {
          ok: false,
          error: {
            kind: "invalid_credentials",
            message,
          },
        };
      }

      return {
        ok: false,
        error: {
          kind: "unknown",
          message,
        },
      };
    }

    const data: LoginResponse = await response.json();

    localStorage.setItem("accessToken", data.accessToken);

    return {
      ok: true,
      data: {},
    };
  } catch {
    return {
      ok: false,
      error: {
        kind: "network",
        message: "Unable to connect to the server.",
      },
    };
  }
}

// =========================
// REGISTER
// =========================

async function register(
  input: RegisterInput,
): Promise<AuthResult<EmailVerificationChallenge>> {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        displayName: input.name,
        email: input.email,
        password: input.password,
        agreeToTerms: input.termsAccepted,
      }),
    });

    if (!response.ok) {
      const message = await readApiError(response, "Unable to register.");

      if (response.status === 409) {
        return {
          ok: false,
          error: {
            kind: "duplicate_email",
            message,
            fieldErrors: {
              email: message,
            },
          },
        };
      }

      if (response.status === 400) {
        return {
          ok: false,
          error: {
            kind: "validation",
            message,
          },
        };
      }

      return {
        ok: false,
        error: {
          kind: "unknown",
          message,
        },
      };
    }

    const data: RegisterResponse = await response.json();

    return {
      ok: true,
      data: {
        email: data.email,
        expiresAt: new Date(data.expiresAt).getTime(),
        resendAvailableAt: new Date(data.resendAvailableAt).getTime(),
      },
    };
  } catch {
    return {
      ok: false,
      error: {
        kind: "network",
        message: "Unable to connect to the server.",
      },
    };
  }
}

// =========================
// PASSWORD RECOVERY
// =========================

async function forgotPassword(input: ForgotPasswordInput): Promise<AuthResult> {
  try {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: input.email }),
    });

    if (!response.ok) {
      return {
        ok: false,
        error: {
          kind: "unknown",
          message: await readApiError(response, "Unable to request a reset code."),
        },
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: {
        kind: "network",
        message: "Unable to connect to the server.",
      },
    };
  }
}

async function resetPassword(input: ResetPasswordInput): Promise<AuthResult> {
  try {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: input.email,
        otp: input.otp,
        password: input.newPassword,
      }),
    });

    if (!response.ok) {
      return {
        ok: false,
        error: {
          kind: "unknown",
          message: await readApiError(response, "Unable to reset your password."),
        },
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: {
        kind: "network",
        message: "Unable to connect to the server.",
      },
    };
  }
}

// =========================
// VERIFY EMAIL
// =========================

async function verifyEmail(input: EmailVerificationInput): Promise<AuthResult> {
  try {
    const response = await fetch(`${API_URL}/auth/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: input.email,
        code: input.code,
      }),
    });

    if (!response.ok) {
      const message = await readApiError(response, "Unable to verify email.");

      if (response.status === 401) {
        const isExpired = message.toLowerCase().includes("expired");

        return {
          ok: false,
          error: {
            kind: isExpired ? "expired_code" : "invalid_code",
            message,
          },
        };
      }

      if (response.status === 400) {
        return {
          ok: false,
          error: {
            kind: "validation",
            message,
          },
        };
      }

      return {
        ok: false,
        error: {
          kind: "unknown",
          message,
        },
      };
    }

    return {
      ok: true,
    };
  } catch {
    return {
      ok: false,
      error: {
        kind: "network",
        message: "Unable to connect to the server.",
      },
    };
  }
}

// =========================
// RESEND VERIFICATION
// =========================

async function resendVerificationCode(
  email: string,
): Promise<AuthResult<EmailVerificationChallenge>> {
  try {
    const response = await fetch(`${API_URL}/auth/resend-verification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (!response.ok) {
      const message = await readApiError(
        response,
        "Unable to resend verification code.",
      );

      return {
        ok: false,
        error: {
          kind: "unknown",
          message,
        },
      };
    }

    const data: VerificationChallengeResponse = await response.json();

    const now = Date.now();

    return {
      ok: true,
      data: {
        email,
        expiresAt: data.expiresAt
          ? new Date(data.expiresAt).getTime()
          : now + 5 * 60 * 1000,

        resendAvailableAt: data.resendAvailableAt
          ? new Date(data.resendAvailableAt).getTime()
          : now + 60 * 1000,
      },
    };
  } catch {
    return {
      ok: false,
      error: {
        kind: "network",
        message: "Unable to connect to the server.",
      },
    };
  }
}

// =========================
// CHANGE VERIFICATION EMAIL
// =========================

async function changeVerificationEmail(
  input: ChangeEmailInput,
): Promise<AuthResult<EmailVerificationChallenge>> {
  try {
    const response = await fetch(`${API_URL}/auth/change-verification-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentEmail: input.currentEmail,
        newEmail: input.newEmail,
      }),
    });

    if (!response.ok) {
      const message = await readApiError(response, "Unable to change email.");

      if (response.status === 409) {
        return {
          ok: false,
          error: {
            kind: "duplicate_email",
            message,
            fieldErrors: {
              newEmail: message,
            },
          },
        };
      }

      if (response.status === 400) {
        return {
          ok: false,
          error: {
            kind: "validation",
            message,
          },
        };
      }

      return {
        ok: false,
        error: {
          kind: "unknown",
          message,
        },
      };
    }

    const data: VerificationChallengeResponse = await response.json();

    if (!data.email || !data.expiresAt || !data.resendAvailableAt) {
      return {
        ok: false,
        error: {
          kind: "unknown",
          message: "Verification information was not returned by the server.",
        },
      };
    }

    return {
      ok: true,
      data: {
        email: data.email,
        expiresAt: new Date(data.expiresAt).getTime(),
        resendAvailableAt: new Date(data.resendAvailableAt).getTime(),
      },
    };
  } catch {
    return {
      ok: false,
      error: {
        kind: "network",
        message: "Unable to connect to the server.",
      },
    };
  }
}

// =========================
// GOOGLE / LINE
// =========================

async function authenticateWithOAuth(
  provider: OAuthProvider,
  idToken: string,
): Promise<AuthResult> {
  try {
    const response = await fetch(`${API_URL}/auth/${provider}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken,
      }),
    });

    if (!response.ok) {
      const providerName = provider === "google" ? "Google" : "LINE";

      const message = await readApiError(
        response,
        `Unable to authenticate with ${providerName}.`,
      );

      return {
        ok: false,
        error: {
          kind: "unknown",
          message,
        },
      };
    }

    const data: LoginResponse = await response.json();

    localStorage.setItem("accessToken", data.accessToken);

    return {
      ok: true,
    };
  } catch {
    return {
      ok: false,
      error: {
        kind: "network",
        message: "Unable to connect to the server.",
      },
    };
  }
}

async function beginGoogleAuth(idToken: string): Promise<AuthResult> {
  return authenticateWithOAuth("google", idToken);
}

async function beginLineAuth(idToken: string): Promise<AuthResult> {
  return authenticateWithOAuth("line", idToken);
}

// =========================
// SERVICE
// =========================

export const apiAuthService: AuthService = {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerificationCode,
  changeVerificationEmail,
  beginGoogleAuth,
  beginLineAuth,
};
