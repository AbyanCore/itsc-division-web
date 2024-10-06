import BackButton from "@/component/BackButton";
import {
  getProfile,
  updateProfile,
} from "@/server-action/dashboardProfileAction";
import cookieService from "@/service/cookieService";
import Secure from "@/utils/secure";

export default async function dashboardProfileEditPage({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const user = await getProfile(
    Secure.extractPayload(cookieService.get("token")!).sub
  );
  const isError: boolean = searchParams.error != null;

  return (
    <div className="w-full h-full bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="font-bold text-2xl w-full text-center mb-4 text-gray-900 dark:text-gray-100">
        Edit Profile
      </div>
      <form
        className="max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded-md shadow-md transition-colors duration-300"
        action={updateProfile}
      >
        {isError && (
          <p className="text-red-500 rounded mb-4 text-center">
            {searchParams.error}
          </p>
        )}
        <input type="hidden" name="uuid" value={user!.uuid} />
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            New Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Enter new password"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            Retype Password
          </label>
          <input
            name="password_confirmation"
            type="password"
            placeholder="Retype password"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            Phone Number
          </label>
          <input
            name="phone_number"
            type="text"
            placeholder="Enter phone number"
            defaultValue={user!.phone_number}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            Address
          </label>
          <textarea
            name="address"
            placeholder="Enter your address"
            defaultValue={user!.address}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            rows={4}
          ></textarea>
        </div>
        <div className="flex flex-row gap-2">
          <BackButton className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 dark:hover:bg-red-700 flex-1 text-center">
            Back
          </BackButton>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 dark:hover:bg-blue-700 flex-1 text-center"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
}
