import BackButton from "@/component/BackButton";
import { getProfile, updateProfile } from "@/server-action/dashboardProfileAction";
import cookieService from "@/service/cookieService";
import Secure from "@/utils/secure";

export default async function dashboardProfileEditPage({
  params,searchParams
}: {
  params: any;
  searchParams: any;
}) {
  const user = await getProfile(Secure.extractPayload(cookieService.get("token")!).sub);  
  const isError: boolean = searchParams.error != null;

  return (
    <div className="w-screen h-screen">
      <h1 className="font-bold text-2xl w-full text-center">Edit Profile</h1>
      <form className="max-w-md mx-auto" action={updateProfile}>
        {isError && (
          <p className="text-red-500 rounded">{searchParams.error}</p>
        )}
        <input type="hidden" name="uuid" value={user!.uuid} />
        <input
          name="password"
          type="password"
          placeholder="password"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          name="password_confirmation"
          type="password"
          placeholder="retype password"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          name="phone_number"
          type="text"
          placeholder="phone number"
          defaultValue={user!.phone_number}
          className="w-full mb-4 p-2 border rounded"
        />
        <textarea
          name="address"
          placeholder="address"
          defaultValue={user!.address}
          className="w-full mb-4 p-2 border rounded"
          rows={4}
        ></textarea>
        <div className="flex flex-row gap-2">
          <BackButton className="bg-red-500 flex-1 text-white font-bold py-2 px-4 rounded hover:bg-red-600 w-full">
            Back
          </BackButton>
          <button
            type="submit"
            className="bg-blue-500 flex-2 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 w-full"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
}
