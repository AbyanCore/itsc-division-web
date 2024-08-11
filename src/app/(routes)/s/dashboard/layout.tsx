import SidebarDashboard from "@/component/SidebarDashboard";
import { headers } from "next/headers";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = headers();
  const current_title = headerList
    .get("referer")
    ?.split("/")
    .pop()
    ?.toUpperCase();

  return (
    <main className="flex flex-row w-screen h-screen">
      <SidebarDashboard />
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-row justify-between p-2">
          <h1 className="font-bold text-2xl text-center w-full">
            {current_title}
          </h1>
        </div>
        <div className="flex-1 p-2">{children}</div>
      </div>
    </main>
  );
}
