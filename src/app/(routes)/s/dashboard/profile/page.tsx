import Secure from "@/utils/secure";
import { cookies } from "next/headers";

const dashboardProfilePage = () => {
  const { sub, email } = Secure.extractPayload(cookies().get("token")!.value);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="p-5 shadow-md rounded-xl">
        <h1>Email : {email}</h1>
        <h2>Id : {sub}</h2>
      </div>
    </div>
  );
};

export default dashboardProfilePage;
