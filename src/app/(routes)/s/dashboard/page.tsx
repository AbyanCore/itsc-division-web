import Secure from "@/utils/secure";
import { cookies } from "next/headers";

const DashboardPage = () => {
  const token = cookies().get("token")?.value;
  const payload = Secure.extractPayload(token!);

  return (
    <div className="w-full">
      <h1 className="font-bold text-2xl w-full text-center">
        Hello, {payload.email}
      </h1>
    </div>
  );
};

export default DashboardPage;
