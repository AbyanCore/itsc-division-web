import {
  AddUserToClass,
  getUserAssigned,
  getUserAvaiable,
  RemoveUserFromClass,
} from "@/server-action/dashboardDivisionUsersAction";
import { UserMinusIcon, UserPlusIcon } from "@heroicons/react/16/solid";
import { user } from "@prisma/client";

export default async function dashboardDivisionUsers({
  params,
}: {
  params: any;
}) {
  const division_id = params.id;

  const avaiableUser = (await getUserAvaiable()) as user[];
  const assignedUser = (await getUserAssigned(
    Number.parseInt(division_id)
  )) as user[];

  return (
    <div className="h-full flex flex-row">
      <div className="flex-1">
        <h1 className="w-full text-center font-bold">Users</h1>
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
