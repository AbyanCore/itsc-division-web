import FooterGlobal from "@/component/FooterGlobal";

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main lang="en">
      <div>{children}</div>
    </main>
  );
}
