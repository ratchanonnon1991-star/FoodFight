import type { Metadata } from "next";
import { Poppins, Noto_Sans_Thai } from "next/font/google";

import { MotionProvider } from "@/components/providers/MotionProvider";
import { GoogleAuthProvider } from "@/components/providers/GoogleAuthProvider";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { UserProfileProvider } from "@/context/user-profile-context";

import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  weight: ["400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-noto-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FoodFighter",
  description: "AI-Powered Group Food Decision Application",
  icons: {
    icon: [
      { url: "/logoIcon/icon.png", type: "image/png" },
    ],
    shortcut: "/logoIcon/icon.png",
    apple: "/logoIcon/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${notoSansThai.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-text-primary font-sans">
        <LanguageProvider>
          <GoogleAuthProvider>
            <UserProfileProvider>
              <MotionProvider>{children}</MotionProvider>
            </UserProfileProvider>
          </GoogleAuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
