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
        <div className="flex flex-row gap-1 w-full">
          <form action={logout}>
            <button
              type="submit"
              className="bg-red-500 text-white p-2 rounded-md flex-1 text-center"
            >
              Logout
            </button>
          </form>
          <a
            href="/s/dashboard/profile/edit"
            className="bg-orange-500 p-2 rounded-md text-white flex-1 text-center"
          >
            Edit
          </a>
        </div>
      </div>
    </div>
  );
};

export default dashboardProfilePage;
