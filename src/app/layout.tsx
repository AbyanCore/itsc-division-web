import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FooterGlobal from "@/component/FooterGlobal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ITSC DIVISI",
  description: "web ITSC Division",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <FooterGlobal />
      </body>
    </html>
  );
}
