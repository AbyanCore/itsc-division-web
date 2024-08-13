import signin from "@/serverAction/loginAction";

const LoginPage = ({ searchParams }: { searchParams?: any }) => {
  console.log(searchParams);
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className={`bg-white shadow-2xl rounded-xl px-8 pt-6 pb-8 mb-4 transition-colors duration-300 ${
          searchParams.error != null
            ? "border-red-400 border-4 shadow-red-300"
            : ""
        }`}
        action={signin}
      >
        <h1 className="text-black font-bold text-3xl mb-2">Sign In </h1>
        <p className="text-red-500 text-xs italic">
          {searchParams.error != null ? searchParams.error : ""}
        </p>
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
