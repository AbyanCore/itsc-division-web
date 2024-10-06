import Secure from "@/utils/secure";
import { cookies } from "next/headers";

const DashboardPage = () => {
  const payload = Secure.extractPayload(cookies().get("token")?.value!);
  return (
    <div className="dark:bg-gray-900 dark:text-white w-full h-screen shadow-xl">
      <h1 className="font-bold text-2xl w-full text-center">
        Hello, {payload.email}
      </h1>
    </div>
  );
};

export default DashboardPage;
