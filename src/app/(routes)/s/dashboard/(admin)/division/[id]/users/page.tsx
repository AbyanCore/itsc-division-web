import BackButton from "@/component/BackButton";
import {
  AddUserToClass,
  getUserAssigned,
  getUserAvaiable,
  RemoveUserFromClass,
} from "@/server-action/dashboardDivisionUsersAction";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  UserMinusIcon,
  UserPlusIcon,
} from "@heroicons/react/16/solid";
import { user } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function dashboardDivisionUsers({
  params,
  searchParams,
}: {
  params: any;
  searchParams: {
    search: string;
  };
}) {
  const division_id = params.id;
  const search = searchParams.search ?? "";

  const avaiableUser = (await getUserAvaiable(search)) as user[];
  const assignedUser = (await getUserAssigned(
    search,
    Number.parseInt(division_id)
  )) as user[];

  async function handleSearch(data: FormData) {
    "use server";

    const params = new URLSearchParams({
      search: data.get("search") as string,
    });

    redirect(`/s/dashboard/division/${division_id}/users?${params}`);
  }

  return (
    <div className="h-full flex flex-row bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex-1 p-4 overflow-x-auto flex-wrap">
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-4 space-y-4 sm:space-y-0">
          <form action={handleSearch} className="hidden sm:flex items-center">
            <input
              name="search"
              className="p-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Search"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 p-2 rounded-md ml-2"
            >
              <MagnifyingGlassIcon className="h-5 w-5 text-white" />
            </button>
          </form>
          <h1 className="font-bold text-lg text-center flex-grow">Users</h1>
          <div className="flex gap-2">
            <form action={handleSearch} className="sm:hidden flex items-center">
              <input
                name="search"
                className="p-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Search"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 p-2 rounded-md ml-2"
              >
                <MagnifyingGlassIcon className="h-5 w-5 text-white" />
              </button>
            </form>
            <BackButton className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
              Back
            </BackButton>
            <a
              href="/s/dashboard/users/create"
              className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold p-2.5 rounded-md"
            >
              <PlusIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="overflow-hidden shadow-md sm:rounded-lg sm:mx-4">
          <div className="max-h-[75vh] relative overflow-y-auto">
            <table className="w-full text-sm text-left table-auto min-w-full">
              <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 sticky top-0 z-10">
                <tr>
                  <th scope="col" className="px-4 py-3 sm:px-6">
                    Fullname
                  </th>
                  <th scope="col" className="px-4 py-3 sm:px-6">
                    Email
                  </th>
                  <th scope="col" className="px-4 py-3 sm:px-6">
                    Type
                  </th>
                  <th scope="col" className="px-4 py-3 sm:px-6">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {assignedUser.map((user) => (
                  <tr
                    key={user.uuid}
                    className="bg-green-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-4 py-4">{user.fullname}</td>
                    <td className="px-4 py-4">{user.email}</td>
                    <td className="px-4 py-4">{user.type}</td>
                    <td className="px-4 py-4 text-center">
                      <form action={RemoveUserFromClass}>
                        <input
                          type="hidden"
                          name="user_uuid"
                          value={user.uuid}
                        />
                        <input
                          type="hidden"
                          name="division_id"
                          value={division_id}
                        />
                        <button className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 p-2 rounded-md">
                          <UserMinusIcon className="h-5 w-5 text-white" />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
                {assignedUser.map((user) => (
                  <tr
                    key={user.uuid}
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-4 sm:px-6">{user.surname}</td>
                    <td className="px-4 py-4 sm:px-6">{user.email}</td>
                    <td className="px-4 py-4 sm:px-6">{user.type}</td>
                    <td className="px-4 py-4 sm:px-6 text-center">
                      <form action={AddUserToClass}>
                        <input
                          type="hidden"
                          name="user_uuid"
                          value={user.uuid}
                        />
                        <input
                          type="hidden"
                          name="division_id"
                          value={division_id}
                        />
                        <button className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 p-2 rounded-md">
                          <UserPlusIcon className="h-5 w-5 text-white" />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
