import { createUser } from "@/server-action/dashboardUserAction";
import Link from "next/link";

export default function dashboardUserCreatePage() {
  return (
    <div className="w-screen h-screen">
      <h1 className="font-bold text-2xl w-full text-center">Create User</h1>
      <form className="max-w-md mx-auto" action={createUser}>
        <input
          name="fullname"
          type="text"
          placeholder="fullname"
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          name="surname"
          type="text"
          placeholder="surname"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="email"
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          name="phone_number"
          type="text"
          placeholder="phone number"
          className="w-full mb-4 p-2 border rounded"
        />
        <textarea
          name="address"
          placeholder="address"
          className="w-full mb-4 p-2 border rounded"
          rows={4}
        ></textarea>
        <select
          name="type"
          defaultValue="guest"
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="admin">Admin</option>
          <option value="siswa">Siswa</option>
          <option value="guest">Guest</option>
          <option value="pengajar">Pengajar</option>
        </select>
        <div className="flex flex-row gap-2">
          <Link
            href="/s/dashboard/users"
            className="bg-red-500 flex-1 text-white font-bold py-2 px-4 rounded hover:bg-red-600 w-full"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-blue-500 flex-2 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 w-full"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
}
