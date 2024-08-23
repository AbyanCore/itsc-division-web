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
import Link from "next/link";
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
    <div className="h-full flex flex-row">
      <div className="flex-1">
        <div className="flex flex-row justify-between w-full items-center px-2">
          <form action={handleSearch} className="flex flex-row items-center">
            <input
              name="search"
              className="p-2 rounded-xl my-2 border"
              placeholder="Search"
            />
            <button type="submit" className="bg-blue-500 p-2.5 rounded-md m-2">
              <MagnifyingGlassIcon className="h-4 w-4 text-white" />
            </button>
          </form>
          <h1 className="w-full text-center font-bold">Users</h1>
          <div className="flex flex-row gap-2">
            <BackButton className="bg-red-500 flex-1 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 w-full">
              Back
            </BackButton>
            <Link
              href="/s/dashboard/users/create"
              className="bg-blue-500 text-white font-bold p-2.5 rounded-md hover:bg-blue-600"
            >
              <PlusIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <table className="border table-auto w-full">
          <thead className="bg-zinc-300">
            <tr>
              <th>Fullname</th>
              <th>Email</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignedUser.map((user) => {
              return (
                <tr key={user.uuid}>
                  <td className="border">{user.fullname}</td>
                  <td className="border">{user.email}</td>
                  <td className="border">{user.type}</td>
                  <td className="text-center border">
                    <form action={RemoveUserFromClass}>
                      <input type="hidden" name="user_uuid" value={user.uuid} />
                      <input
                        type="hidden"
                        name="division_id"
                        value={division_id}
                      />
                      <button className="bg-red-400 p-2 rounded-md">
                        <UserMinusIcon className="h-4 w-4" />
                      </button>
                    </form>
                  </td>
                </tr>
              );
            })}
            {avaiableUser.map((user) => {
              return (
                <tr key={user.uuid}>
                  <td className="border">{user.surname}</td>
                  <td className="border">{user.email}</td>
                  <td className="border">{user.type}</td>
                  <td className="text-center border">
                    <form action={AddUserToClass}>
                      <input type="hidden" name="user_uuid" value={user.uuid} />
                      <input
                        type="hidden"
                        name="division_id"
                        value={division_id}
                      />
                      <button className="bg-green-400 p-2 rounded-md">
                        <UserPlusIcon className="h-4 w-4" />
                      </button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
