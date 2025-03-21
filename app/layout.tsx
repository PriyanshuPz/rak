import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import NextTopLoader from "nextjs-toploader";
import AuthProvider from "@/providers/auth-provider";
import { auth } from "@/auth";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/providers/query";
import flagsmith from "flagsmith";
import { cn } from "@/lib/utils";
import FlagsMithProvider from "@/providers/flagsmith-provider";

const inter = Rubik({ subsets: ["latin"] });

const title = "Rak - Showcase Your Certificates and Achievements on IPFS";
const description =
  "Rak is a platform where users can securely upload, showcase, and verify their certificates and achievements on the InterPlanetary File System (IPFS).";

export const metadata: Metadata = {
  title: {
    template: "%s | Rak",
    default: title,
  },
  description: description,
  openGraph: {
    title: title,
    description: description,
    type: "website",
    url: "https://rak.vercel.app",
  },
  twitter: {
    title,
    description,
  },
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const session = await auth();
  await flagsmith.init({
    fetch: fetch,
    environmentID: String(process.env.NEXT_PUBLIC_FLAGSMITH_ENV), // substitute your env ID
  });
  const state = flagsmith.getState();

  return (
    <FlagsMithProvider flagsmithState={state}>
      <AuthProvider session={session}>
        <html lang="en" suppressHydrationWarning>
          <body className={cn(inter.className, "")}>
            <QueryProvider>
              <NextTopLoader
                showSpinner
                template='<div class="bar" role="bar"><div class="peg"></div></div>
                <div class="spinner" role="spinner"><div class="spinner-icon fixed bottom-0 right-0 m-2"></div></div>'
              />
              <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                {children}
                {modal}
                <Toaster />
              </ThemeProvider>
            </QueryProvider>
            <Analytics />
          </body>
        </html>
      </AuthProvider>
    </FlagsMithProvider>
  );
}
