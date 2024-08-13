import {
  AddUserToClass,
  getUserAssigned,
  getUserAvaiable,
  RemoveUserFromClass,
} from "@/server-action/dashboardDivisionUsersAction";
import { UserMinusIcon, UserPlusIcon } from "@heroicons/react/16/solid";
import { user } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
        <h1 className="w-full text-center font-bold">Avaiable User</h1>
        <table className="border table-auto w-full">
          <thead>
            <tr>
              <th>Fullname</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {avaiableUser.map((user) => {
              return (
                <tr key={user.uuid}>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>
                    <form action={AddUserToClass}>
                      <input type="hidden" name="user_uuid" value={user.uuid} />
                      <input
                        type="hidden"
                        name="division_id"
                        value={division_id}
                      />
                      <button>
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

      <div className="flex-1">
        <h1 className="w-full text-center font-bold">Assigned User</h1>
        <table className="border table-auto w-full">
          <thead>
            <tr>
              <th>Fullname</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignedUser.map((user) => {
              return (
                <tr key={user.uuid}>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>
                    <form action={RemoveUserFromClass}>
                      <input type="hidden" name="user_uuid" value={user.uuid} />
                      <input
                        type="hidden"
                        name="division_id"
                        value={division_id}
                      />
                      <button>
                        <UserMinusIcon className="h-4 w-4" />
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
