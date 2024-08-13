import { getUser, updateUser } from "@/server-action/dashboardUserAction";
import Link from "next/link";

export default async function dashboardUserCreatePage({
  params,
}: {
  params: any;
}) {
  const user = await getUser(params.uuid);

  return (
    <div className="w-screen h-screen">
      <h1 className="font-bold text-2xl w-full text-center">Edit User</h1>
      <form className="max-w-md mx-auto" action={updateUser}>
        <input type="hidden" name="uuid" value={user!.uuid} />
        <input
          name="fullname"
          type="text"
          placeholder="fullname"
          className="w-full mb-4 p-2 border rounded"
          defaultValue={user!.fullname}
          required
        />
        <input
          name="surname"
          type="text"
          placeholder="surname"
          defaultValue={user!.surname}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="email"
          defaultValue={user!.email}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          className="w-full mb-4 p-2 border rounded"
        />
        <textarea
          name="address"
          placeholder="address"
          defaultValue={user!.address}
          className="w-full mb-4 p-2 border rounded"
          rows={4}
        ></textarea>
        <select
          name="type"
          defaultValue={user!.type}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="admin">Admin</option>
          <option value="siswa">Siswa</option>
          <option value="guest">Guest</option>
          <option value="pengajar">Pengajar</option>
        </select>
        <div className="flex flex-row gap-2">
          <Link
            href="/s/dashboard/division"
            className="bg-red-500 flex-1 text-white font-bold py-2 px-4 rounded hover:bg-red-600 w-full"
          >
            Cancel
          </Link>
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
