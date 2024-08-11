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

export default function SidebarDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={
        isOpen ? "p-2 pr-5 shadow-xl rounded-xl select-none" : "p-2 h-fit"
      }
    >
      <div className="flex flex-row cursor-pointer">
        <Bars3Icon className="w-10 h-10" onClick={() => setIsOpen(!isOpen)} />
      </div>
      <div className="flex flex-col w-fit h-screen pt-5 gap-3">
        <a
          href="/s/dashboard/users"
          className="p-2 ml-1 flex gap-2 cursor-pointer font-semibold bg-gray-50 rounded-md hover:bg-gray-200 hover:scale-[110%] duration-300"
        >
          <UsersIcon className="w-6 h-6" /> {isOpen ? "Users" : ""}
        </a>
        <a
          href="/s/dashboard/division"
          className="p-2 ml-1 flex gap-2 cursor-pointer font-semibold bg-gray-50 rounded-md hover:bg-gray-200 hover:scale-[110%] duration-300"
        >
          <UserGroupIcon className="w-6 h-6" /> {isOpen ? "Division" : ""}
        </a>
        <a
          href="/s/dashboard/attendance"
          className="p-2 ml-1 flex gap-2 cursor-pointer font-semibold bg-gray-50 rounded-md hover:bg-gray-200 hover:scale-[110%] duration-300"
        >
          <PresentationChartLineIcon className="w-6 h-6" />
          {isOpen ? "Attendance" : ""}
        </a>
        <a
          href="/s/dashboard/education"
          className="p-2 ml-1 flex gap-2 cursor-pointer font-semibold bg-gray-50 rounded-md hover:bg-gray-200 hover:scale-[110%] duration-300"
        >
          <AcademicCapIcon className="w-6 h-6" /> {isOpen ? "Education" : ""}
        </a>
        <a
          href="/s/dashboard/profile"
          className="p-2 ml-1 flex gap-2 cursor-pointer font-semibold bg-gray-50 rounded-md hover:bg-gray-200 hover:scale-[110%] duration-300"
        >
          <UserIcon className="w-6 h-6" /> {isOpen ? "Profile" : ""}
        </a>
      </div>
    </div>
  );
}
