import Secure from "@/utils/secure";
import { cookies } from "next/headers";

const dashboardUsersLayout = ({ children }: { children: React.ReactNode }) => {
  if (Secure.hasPermission(cookies().get("token")?.value!, ["admin"], true)) {
    return <></>;
  }

  return (
    <div className="h-full flex flex-col bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
      <h1 className="w-full text-center font-bold text-xl p-2 text-zinc-800 dark:text-zinc-200">
        Education
      </h1>
      <div className="h-full w-full bg-white dark:bg-zinc-900 rounded-tl-xl pt-2 shadow-md overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default dashboardUsersLayout;
