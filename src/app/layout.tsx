import type { Metadata } from "next";
import "./globals.css";
import FooterGlobal from "@/component/FooterGlobal";
import { NotifyBar, NotifyProvider } from "@/context/NotifyContext";

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
    <html lang="id">
      <body>
        <NotifyProvider>
          <NotifyBar />
          {children}
          <FooterGlobal />
        </NotifyProvider>
      </body>
    </html>
  );
}
