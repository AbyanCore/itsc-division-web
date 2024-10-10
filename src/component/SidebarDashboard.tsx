"use client";

import {
  AcademicCapIcon,
  Bars3Icon,
  CpuChipIcon,
  PresentationChartLineIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { useState } from "react";

export default function SidebarDashboard({ IsAdmin }: { IsAdmin: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  // Class for links with dynamic behavior
  const linkClass =
    "p-2 flex items-center gap-2 cursor-pointer font-semibold rounded-md hover:scale-[110%] duration-300 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-all";

  return (
    <div
      className={`p-2 bg-zinc-100 dark:bg-zinc-800 h-screen transition-all duration-500 ease-in-out ${
        isOpen ? "w-48 sm:w-48" : "w-16"
      } overflow-hidden`}
    >
      {/* Sidebar toggle button */}
      <div className="flex justify-start">
        <Bars3Icon
          className="w-10 h-10 text-gray-800 dark:text-gray-200 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* Sidebar links */}
      <div className="flex flex-col pt-5 gap-3 transition-all duration-500 ease-in-out">
        {IsAdmin ? (
          <>
            <Link href="/s/dashboard/users" className={linkClass}>
              <UsersIcon className="w-6 h-6" />
              <span
                className={`transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "opacity-100 max-w-full"
                    : "opacity-0 max-w-0 overflow-hidden"
                }`}
              >
                Users
              </span>
            </Link>

            <Link href="/s/dashboard/division" className={linkClass}>
              <UserGroupIcon className="w-6 h-6" />
              <span
                className={`transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "opacity-100 max-w-full"
                    : "opacity-0 max-w-0 overflow-hidden"
                }`}
              >
                Division
              </span>
            </Link>

            <Link href="/s/dashboard/device" className={linkClass}>
              <CpuChipIcon className="w-6 h-6" />
              <span
                className={`transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "opacity-100 max-w-full"
                    : "opacity-0 max-w-0 overflow-hidden"
                }`}
              >
                Device
              </span>
            </Link>
          </>
        ) : null}

        <Link href="/s/dashboard/attendance" className={linkClass}>
          <PresentationChartLineIcon className="w-6 h-6" />
          <span
            className={`transition-all duration-300 ease-in-out ${
              isOpen
                ? "opacity-100 max-w-full"
                : "opacity-0 max-w-0 overflow-hidden"
            }`}
          >
            Attendance
          </span>
        </Link>

        <Link href="/s/dashboard/education" className={linkClass}>
          <AcademicCapIcon className="w-6 h-6" />
          <span
            className={`transition-all duration-300 ease-in-out ${
              isOpen
                ? "opacity-100 max-w-full"
                : "opacity-0 max-w-0 overflow-hidden"
            }`}
          >
            Education
          </span>
        </Link>

        <Link href="/s/dashboard/profile" className={linkClass}>
          <UserIcon className="w-6 h-6" />
          <span
            className={`transition-all duration-300 ease-in-out ${
              isOpen
                ? "opacity-100 max-w-full"
                : "opacity-0 max-w-0 overflow-hidden"
            }`}
          >
            Profile
          </span>
        </Link>
      </div>
    </div>
  );
}
