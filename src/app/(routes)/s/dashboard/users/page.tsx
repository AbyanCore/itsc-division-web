import { deleteUser, getUsers } from "@/serverAction/dashboardUserAction";
import {
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { user } from "@prisma/client";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";

const dashboardUsersPage = async ({ searchParams }: { searchParams: any }) => {
  const search: string = searchParams.search ?? "";
  const page: number = Number.parseInt(searchParams.page) ?? 1;

  const users = (await getUsers(search, page)) as user[];

  async function handleSearch(data: FormData) {
    "use server";
    redirect(
      `/s/dashboard/users?page=${page}&search=${data.get("search")}`,
      RedirectType.replace
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center px-5">
        <form action={handleSearch} className="flex flex-row items-center">
          <input
            name="search"
            className="p-2 rounded-xl my-2 border"
            placeholder="Search"
          />
          <button type="submit" className="bg-blue-500 rounded-md p-2 m-2">
            <MagnifyingGlassIcon className="h-4 w-4 text-white" />
          </button>
        </form>
        <Link
          href="/s/dashboard/users/create"
          className="bg-blue-500 text-white font-bold p-2 rounded hover:bg-blue-600"
        >
          <PlusIcon className="h-4 w-4" />
        </Link>
      </div>
      <table className="w-full table-auto">
        <thead className="bg-slate-300">
          <tr>
            <th className="border">Uuid</th>
            <th className="border">Username</th>
            <th className="border">Email</th>
            <th className="border">Type</th>
            <th className="border">created</th>
            <th className="border">updated</th>
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.uuid}
              className="border-t hover:bg-gray-300 text-center transition-colors"
            >
              <td className="border">
                {user.uuid.split("-")[0].concat("...")}
              </td>
              <td className="border">{user.fullname}</td>
              <td className="border">{user.email}</td>
              <td className="border">{user.type}</td>
              <td className="border">
                {user.create_at.toLocaleDateString("id")}
              </td>
              <td className="border">
                {user.update_at?.toLocaleDateString("id") ?? "-"}
              </td>
              <td className="border flex justify-center gap-2 p-1">
                <Link
                  type="submit"
                  href={`/s/dashboard/users/edit/${user.uuid}`}
                  className="bg-blue-500 text-white font-bold p-2 rounded hover:bg-blue-600"
                >
                  <PencilIcon className="h-4 w-4" />
                </Link>
                <form action={deleteUser}>
                  <input type="hidden" name="uuid" value={user.uuid} />
                  <button
                    type="submit"
                    className="bg-red-500 text-white font-bold p-2 rounded hover:bg-red-600"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-row gap-2 justify-center mt-2 items-center">
        {page > 1 && (
          <Link
            href={`/s/dashboard/users?page=${page - 1}&search=${search}`}
            className="bg-red-500 text-white font-bold py-2 px-3 rounded hover:bg-red-600"
          >
            prev
          </Link>
        )}
        <p>{page}</p>
        {page < 5 && (
          <Link
            href={`/s/dashboard/users?page=${page + 1}&search=${search}`}
            className="bg-blue-500 text-white font-bold py-2 px-3 rounded hover:bg-blue-600"
          >
            next
          </Link>
        )}
      </div>
    </div>
  );
};

export default dashboardUsersPage;
