'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';

export function GoogleAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId && process.env.NODE_ENV !== "production") {
    console.warn(
      "NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured; Google sign-in will not work.",
    );
  }

  return (
    <GoogleOAuthProvider clientId={clientId ?? ""}>
      {children}
    </GoogleOAuthProvider>
  );
}
