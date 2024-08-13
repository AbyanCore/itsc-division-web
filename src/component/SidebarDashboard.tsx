"use client";

import {
  AcademicCapIcon,
  Bars3Icon,
  PresentationChartLineIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";

export default function SidebarDashboard({ IsAdmin }: { IsAdmin: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={
        isOpen
          ? "bg-zinc-100 p-2 pr-5 rounded-xl select-none"
          : "p-2 h-fit bg-zinc-100 "
      }
    >
      <div className="flex flex-row cursor-pointer">
        <Bars3Icon className="w-10 h-10 " onClick={() => setIsOpen(!isOpen)} />
      </div>
      <div className="flex flex-col w-fit h-screen pt-5 gap-3">
        {IsAdmin ? (
          <>
            <a
              href="/s/dashboard/users"
              className="p-2 ml-1 flex gap-2 cursor-pointer font-semibold rounded-md hover:scale-[110%] duration-300 bg-gray-50 hover:bg-gray-200"
            >
              <UsersIcon className="w-6 h-6" /> {isOpen ? "Users" : ""}
            </a>
            <a
              href="/s/dashboard/division"
              className="p-2 ml-1 flex gap-2 cursor-pointer font-semibold rounded-md hover:scale-[110%] duration-300 bg-gray-50 hover:bg-gray-200"
            >
              <UserGroupIcon className="w-6 h-6" /> {isOpen ? "Division" : ""}
            </a>
          </>
        ) : null}
        <a
          href="/s/dashboard/attendance"
          className="p-2 ml-1 flex gap-2 cursor-pointer font-semibold rounded-md hover:scale-[110%] duration-300 bg-gray-50 hover:bg-gray-200"
        >
          <PresentationChartLineIcon className="w-6 h-6" />
          {isOpen ? "Attendance" : ""}
        </a>
        <a
          href="/s/dashboard/education"
          className="p-2 ml-1 flex gap-2 cursor-pointer font-semibold rounded-md hover:scale-[110%] duration-300 bg-gray-50 hover:bg-gray-200"
        >
          <AcademicCapIcon className="w-6 h-6" /> {isOpen ? "Education" : ""}
        </a>
        <a
          href="/s/dashboard/profile"
          className="p-2 ml-1 flex gap-2 cursor-pointer font-semibold rounded-md hover:scale-[110%] duration-300 bg-gray-50 hover:bg-gray-200"
        >
          <UserIcon className="w-6 h-6" /> {isOpen ? "Profile" : ""}
        </a>
      </div>
    </div>
  );
}
