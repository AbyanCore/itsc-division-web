"use client";

import { user } from "@prisma/client";
import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "@/serverAction/dashboardUserAction";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";

const dashboardUsersPage = () => {
  const [users, setUsers] = useState<user[]>([]);
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  function fetchUsers() {
    getUsers(
      {
        OR: [
          { email: { contains: search } },
          { uuid: { contains: search } },
          { fullname: { contains: search } },
        ],
      },
      1
    ).then((data) => {
      setUsers(data);
    });
  }

  useEffect(() => {
    fetchUsers();
  }, [search]);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center px-5">
        <input
          className="p-2 rounded-xl my-2"
          placeholder="Serach"
          onChange={handleSearch}
          value={search}
        />
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/s/dashboard/users/create")}
            className="bg-blue-500 text-white font-bold p-2 rounded hover:bg-blue-600"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border">ID</th>
            <th className="border">Username</th>
            <th className="border">Email</th>
            <th className="border">Type</th>
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.uuid}
              className="border-t hover:bg-gray-300 text-center transition-colors"
            >
              <td className="border">{user.uuid}</td>
              <td className="border">{user.fullname}</td>
              <td className="border">{user.email}</td>
              <td className="border">{user.type}</td>
              <td className="border flex justify-center gap-2 p-1">
                <button
                  onClick={() =>
                    router.push(`/s/dashboard/users/edit/${user.uuid}`)
                  }
                  className="bg-blue-500 text-white font-bold p-2 rounded hover:bg-blue-600"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteUser(user.uuid).then(() => fetchUsers())}
                  className="bg-red-500 text-white font-bold p-2 rounded hover:bg-red-600"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default dashboardUsersPage;
