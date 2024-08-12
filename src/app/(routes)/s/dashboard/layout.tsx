import SidebarDashboard from "@/component/SidebarDashboard";
import userService from "@/service/userService";
import Secure from "@/utils/secure";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get("token")?.value!;
  const IsAdmin = (await userService.getUserByToken(token))?.type === "admin";

  return (
    <main className="flex flex-row w-screen h-screen">
      <SidebarDashboard IsAdmin={IsAdmin} />
      <div className="pl-3 w-full h-full">{children}</div>
    </main>
  );
}
