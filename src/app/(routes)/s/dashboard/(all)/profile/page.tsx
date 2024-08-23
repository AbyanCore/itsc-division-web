import Secure from "@/utils/secure";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const dashboardProfilePage = () => {
  const { sub, email } = Secure.extractPayload(cookies().get("token")!.value);

  async function logout() {
    "use server";
    cookies().set("token", "", {
      maxAge: 0,
    });

    redirect("/login");
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="p-5 shadow-md rounded-xl">
        <h1>Email : {email}</h1>
        <h2>Id : {sub}</h2>
        <form action={logout}>
          <button type="submit">Logout</button>
        </form>
      </div>
    </div>
  );
};

export default dashboardProfilePage;
