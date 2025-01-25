"use client";
import { useNotify } from "@/hook/NotifyHook";
import { useRouter } from "next/navigation";

const LoginPage = ({ searchParams }: { searchParams?: any }) => {
  const router = useRouter();
  const Notify = useNotify();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")!.toString();
    const password = data.get("password")!.toString();

    const res = await fetch("/api/auth", {
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const responseData = await res.json();

    if (res.status == 200) {
      if (
        searchParams.redirectTo == null ||
        searchParams.redirectTo == "" ||
        searchParams.redirectTo == undefined
      ) {
        Notify.addNotify({
          message: "Login Success you will be redirected to /s",
          type: "success",
          timeout: 3000,
        });
        router.push("/s");
      } else {
        Notify.addNotify({
          message:
            "Login Success you will be redirected to " +
            searchParams.redirectTo,
          type: "success",
          timeout: 3000,
        });

        await new Promise((resolve) => setTimeout(resolve, 3000));

        router.push(searchParams.redirectTo);
      }
    } else {
      Notify.addNotify({
        message: "Login Failed",
        type: "error",
      });
      router.push(
        `/login?error=${responseData.message} ${
          searchParams.redirectTo
            ? `&redirectTo=${searchParams.redirectTo}`
            : ""
        }`
      );
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className={`bg-white shadow-2xl rounded-xl px-8 pt-6 pb-8 mb-4 transition-colors duration-300 ${
          searchParams.error != null
            ? "border-red-400 border-4 shadow-red-300"
            : ""
        }`}
        onSubmit={handleSubmit}
      >
        <h1 className="text-black font-bold text-3xl mb-2">Sign In </h1>
        <small className="text-red-500 italic">
          {searchParams.error != null ? searchParams.error : ""}
        </small>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="text"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
