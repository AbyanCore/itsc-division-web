"use client";

import { division } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UsersIcon,
} from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import {
  deleteDivision,
  getDivisions,
} from "@/server-action/dashboardDivisionAction";

const dashboardUsersPage = () => {
  const [divisions, setDivisions] = useState<division[]>([]);
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  function fetchUsers() {
    getDivisions().then((data) => {
      setDivisions(data);
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
          className="p-2 rounded-xl my-2 border"
          placeholder="Search"
          onChange={handleSearch}
          value={search}
        />
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/s/dashboard/division/create")}
            className="bg-blue-500 text-white font-bold p-2 rounded hover:bg-blue-600"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <table className="w-full table-auto">
        <thead className="bg-slate-300">
          <tr>
            <th className="border">Uuid</th>
            <th className="border">Username</th>
            <th className="border">Description</th>
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody>
          {divisions.map((division: division) => (
            <tr
              key={division.id}
              className="border-t hover:bg-gray-300 text-center transition-colors"
            >
              <td className="border">{division.id}</td>
              <td className="border">{division.name}</td>
              <td className="border truncate">{division.description}</td>
              <td className="border flex justify-center gap-2 p-1 transition-colors duration-200">
                <button
                  onClick={() =>
                    router.push(`/s/dashboard/division/${division.id}/users`)
                  }
                  className="bg-orange-500 text-white font-bold p-2 rounded hover:bg-orange-500"
                >
                  <UsersIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() =>
                    router.push(`/s/dashboard/division/${division.id}/edit`)
                  }
                  className="bg-blue-500 text-white font-bold p-2 rounded hover:bg-blue-600"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() =>
                    deleteDivision(division.id).then(() => fetchUsers())
                  }
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
