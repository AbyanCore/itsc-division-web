import { deleteUser, getUsers } from "@/serverAction/dashboardUserAction";
import {
  ArrowsUpDownIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { user } from "@prisma/client";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";

const dashboardUsersPage = async ({
  searchParams,
}: {
  searchParams: {
    search: string;
    page: number;
    reverse: number;
  };
}) => {
  const search: string = searchParams.search ?? "";
  const page: number = searchParams.page ?? 1;
  const reverse: number = searchParams.reverse ?? 0;

  const users =
    reverse == 1
      ? ((await getUsers(search, page)) as user[]).reverse()
      : ((await getUsers(search, page)) as user[]);

  async function handleSearch(data: FormData) {
    "use server";

    redirect(
      `/s/dashboard/users?page=${page}&search=${data.get("search")}`,
      RedirectType.replace
    );
  }

  async function handleReverse(data: FormData) {
    "use server";

    redirect(
      `/s/dashboard/users?page=${page}&search=${search}&reverse=${
        reverse == 1 ? 0 : 1
      }`,
      RedirectType.replace
    );
  }

  return (
    <div className="w-full h-[100vh] sm:h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex flex-wrap sm:flex-row justify-center sm:justify-between items-center px-4 py-4 space-y-4 sm:space-y-0">
        <form
          action={handleSearch}
          className="flex flex-row items-center w-full sm:w-auto"
        >
          <input
            name="search"
            className="p-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Search"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 ml-2 p-2.5 rounded-md"
          >
            <MagnifyingGlassIcon className="h-4 w-4 text-white" />
          </button>
        </form>
        <div className="flex flex-row items-center gap-2">
          <form action={handleReverse}>
            <button className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-bold p-2.5 rounded-md">
              <ArrowsUpDownIcon className="h-4 w-4" />
            </button>
          </form>
          <a
            href="/s/dashboard/users/create"
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold p-2.5 rounded-md"
          >
            <PlusIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="overflow-hidden shadow-md sm:rounded-lg mx-4">
        <div className="max-h-[75vh] relative overflow-y-auto">
          <table className="w-full text-sm text-left table-auto min-w-full">
            <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-4 py-3 sm:px-6">
                  UUID
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6">
                  Username
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6">
                  Email
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6">
                  Type
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6">
                  Created
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6">
                  Updated
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.uuid}
                  className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-4 sm:px-6 font-medium whitespace-nowrap">
                    {user.uuid.split("-")[0].concat("...")}
                  </td>
                  <td className="px-4 py-4 sm:px-6">{user.fullname}</td>
                  <td className="px-4 py-4 sm:px-6">{user.email}</td>
                  <td className="px-4 py-4 sm:px-6">{user.type}</td>
                  <td className="px-4 py-4 sm:px-6">
                    {user.create_at.toLocaleDateString("id")}
                  </td>
                  <td className="px-4 py-4 sm:px-6">
                    {user.update_at?.toLocaleDateString("id") ?? "-"}
                  </td>
                  <td className="px-4 py-4 sm:px-6">
                    <div className="flex items-center space-x-2">
                      <a
                        href={`/s/dashboard/users/edit/${user.uuid}`}
                        className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold p-2.5 rounded-md"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </a>
                      <form action={deleteUser}>
                        <input type="hidden" name="uuid" value={user.uuid} />
                        <button
                          type="submit"
                          className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-bold p-2.5 rounded-md"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-row gap-2 justify-center mt-6 items-center">
        {page > 1 && (
          <Link
            href={`/s/dashboard/users?page=${
              Number(page) - 1
            }&search=${search}`}
            className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-bold py-2 px-3 rounded"
          >
            {"<<"}
          </Link>
        )}
        <p className="border-2 border-gray-300 dark:border-gray-700 p-1 px-3 rounded-md font-bold text-lg">
          {page}
        </p>
        {users.length >= 10 && (
          <Link
            href={`/s/dashboard/users?page=${
              Number(page) + 1
            }&search=${search}`}
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-2 px-3 rounded"
          >
            {">>"}
          </Link>
        )}
      </div>
    </div>
  );
};

export default dashboardUsersPage;
