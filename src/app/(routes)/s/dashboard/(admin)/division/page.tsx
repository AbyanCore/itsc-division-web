import {
  getDivisions,
  deleteDivision,
} from "@/server-action/dashboardDivisionAction";
import { division } from "@prisma/client";
import {
  ArrowsUpDownIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UsersIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";

const dashboardDivisionsPage = async ({
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

  let divisions =
    reverse == 1
      ? ((await getDivisions(search, page)) as division[]).reverse()
      : ((await getDivisions(search, page)) as division[]);

  async function handleSearch(data: FormData) {
    "use server";

    redirect(
      `/s/dashboard/division?page=${page}&search=${data.get("search")}`,
      RedirectType.replace
    );
  }

  async function handleReverse(data: FormData) {
    "use server";

    redirect(
      `/s/dashboard/division?page=${page}&search=${search}&reverse=${
        reverse == 1 ? 0 : 1
      }`,
      RedirectType.replace
    );
  }

  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-4">
        <form action={handleSearch} className="flex items-center">
          <input
            name="search"
            className="p-2 rounded-xl my-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Search"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold p-2.5 rounded-md m-2"
          >
            <MagnifyingGlassIcon className="h-4 w-4" />
          </button>
        </form>
        <div className="flex flex-row items-center gap-2">
          <form action={handleReverse}>
            <button className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-bold p-2.5 rounded-md">
              <ArrowsUpDownIcon className="h-4 w-4" />
            </button>
          </form>
          <a
            href="/s/dashboard/division/create"
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold p-2.5 rounded-md"
          >
            <PlusIcon className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="overflow-x-auto shadow-md sm:rounded-lg mx-4">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 sm:px-6">Uuid</th>
              <th className="px-4 py-3 sm:px-6">Name</th>
              <th className="px-4 py-3 sm:px-6">Description</th>
              <th className="px-4 py-3 sm:px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {divisions.map((division) => (
              <tr
                key={division.id}
                className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-4 py-4 sm:px-6 font-medium whitespace-nowrap">
                  {division.id}
                </td>
                <td className="px-4 py-4 sm:px-6">{division.name}</td>
                <td className="px-4 py-4 sm:px-6 truncate">
                  {division.description}
                </td>
                <td className="px-4 py-4 sm:px-6">
                  <div className="flex items-center space-x-2 justify-stretch">
                    <a
                      href={`/s/dashboard/division/${division.id}/users`}
                      className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-bold p-2.5 rounded-md"
                    >
                      <UsersIcon className="h-4 w-4" />
                    </a>
                    <a
                      href={`/s/dashboard/division/${division.id}/edit`}
                      className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold p-2.5 rounded-md"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </a>
                    <form action={deleteDivision}>
                      <input type="hidden" name="id" value={division.id} />
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

      <div className="flex flex-row gap-2 justify-center mt-2 items-center">
        {page > 1 && (
          <Link
            href={`/s/dashboard/division?page=${
              Number(page) - 1
            }&search=${search}`}
            className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-bold py-2 px-3 rounded-md"
          >
            prev
          </Link>
        )}
        <p className="border-2 border-black p-1 px-3 rounded-md font-bold text-lg">
          {page}
        </p>
        {divisions.length >= 10 && (
          <Link
            href={`/s/dashboard/division?page=${
              Number(page) + 1
            }&search=${search}`}
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-md"
          >
            next
          </Link>
        )}
      </div>
    </div>
  );
};

export default dashboardDivisionsPage;
