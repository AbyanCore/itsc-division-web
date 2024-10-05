import SidebarDashboard from "@/component/SidebarDashboard";
import userService from "@/service/userService";
import Secure from "@/utils/secure";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAdmin = Secure.IsAdmin(cookies().get("token")?.value!);

  return (
    <main className="flex flex-row w-screen h-screen">
      <SidebarDashboard IsAdmin={isAdmin} />
      <div className="w-full h-full">{children}</div>
    </main>
  );
}
