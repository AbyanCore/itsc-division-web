import FooterGlobal from "@/component/FooterGlobal";

export default function ContactLayout({
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
