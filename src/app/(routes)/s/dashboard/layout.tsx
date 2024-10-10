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
    <main className="flex w-screen h-screen">
      <SidebarDashboard IsAdmin={isAdmin} />
      <div className="flex-1 h-full overflow-auto">{children}</div>
    </main>
  );
}
