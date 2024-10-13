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
    <div className="w-full h-full flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="p-6 shadow-lg rounded-xl bg-white dark:bg-gray-800 transition-all">
        <img
          src="/static/images/profile.webp"
          alt="Profile Picture"
          className="aspect-square w-60 rounded-md mb-4 object-cover"
        />
        <h1 className="text-lg font-bold">{email}</h1>
        <small className="text-md font-semibold text-gray-600 dark:text-gray-300 blur-sm hover:blur-0 duration-300">
          {sub}
        </small>
        <div className="flex flex-row gap-3 w-full mt-3">
          <form action={logout} className="flex-1">
            <button
              type="submit"
              className="bg-red-500 text-white py-2 px-4 rounded-md w-full text-center font-bold hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          </form>
          <a
            href="/s/dashboard/profile/edit"
            className="bg-orange-500 text-white py-2 px-4 rounded-md w-full text-center font-bold hover:bg-orange-600 transition-all"
          >
            Edit
          </a>
        </div>
      </div>
    </div>
  );
};

export default dashboardProfilePage;
