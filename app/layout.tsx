import type React from "react";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";
import AppWalletProvider from "@/components/wallet-provider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Solynx | Decentralized Deployment Platform",
  description:
    "Deploy your Web3 applications with confidence on the Solynx decentralized platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AppWalletProvider>
        <body className={`${spaceGrotesk.className} antialiased`}>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 pl-64">{children}</main>
          </div>
        </body>
      </AppWalletProvider>
    </html>
  );
}
