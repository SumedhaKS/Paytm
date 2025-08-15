import "@repo/ui/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Providers } from "./providers";
import { AppBarClient } from "../components/AppBarClient";
const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PayTM",
  description: "Simple wallet app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={geist.className}>
          <div className="min-w-screen min-h-screen bg-[#ebe6e6]">
            <AppBarClient />
            {children}
          </div>
        </body>
      </Providers>
    </html>
  );
}
