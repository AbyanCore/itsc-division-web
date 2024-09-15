import type { Metadata } from "next";
import "./globals.css";
import FooterGlobal from "@/component/FooterGlobal";

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
