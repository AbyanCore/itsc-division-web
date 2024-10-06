import { deleteAttendance } from "@/server-action/dashboardAttendanceAction";
import attendanceService from "@/service/attendanceService";
import userAttendanceService from "@/service/userAttendanceService";
import {
  ArrowRightEndOnRectangleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { attendance } from "@prisma/client";

const dashboardAttendanceManagePage = async () => {
  const attendances: attendance[] = await attendanceService.getAttendance();

  async function getUsersAttendance(attendanceId: number) {
    return (await userAttendanceService.getAttendancesById(attendanceId))
      .length;
  }

  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-4">
        <h1 className="text-lg font-bold">Manage Attendance</h1>
        <a
          href={`/s/dashboard/attendance/manage/create`}
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold p-2.5 rounded-md"
        >
          <PlusIcon className="h-4 w-4" />
        </a>
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg mx-4">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-4 py-3 sm:px-6">
                ID
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Name
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Created At
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Time Span
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Sum
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {attendances.map((attendance: attendance) => (
              <tr
                key={attendance.id}
                className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-4 py-4 sm:px-6 font-medium whitespace-nowrap">
                  {attendance.id}
                </td>
                <td className="px-4 py-4 sm:px-6">{attendance.name}</td>
                <td className="px-4 py-4 sm:px-6">
                  {attendance.create_at.toLocaleDateString("id-ID")}
                </td>
                <td className="px-4 py-4 sm:px-6">
                  {attendance.start_at.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {attendance.end_at.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-4 py-4 sm:px-6">
                  {getUsersAttendance(attendance.id)}
                </td>
                <td className="px-4 py-4 sm:px-6">
                  <div className="flex items-center space-x-2 justify-stretch">
                    <a
                      href={`/s/dashboard/attendance/manage/${attendance.id}/detail`}
                      className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-bold p-2.5 rounded-md"
                    >
                      <ArrowRightEndOnRectangleIcon className="h-4 w-4" />
                    </a>
                    <a
                      href={`/s/dashboard/attendance/manage/${attendance.id}/edit`}
                      className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold p-2.5 rounded-md"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </a>
                    <form action={deleteAttendance}>
                      <input
                        type="hidden"
                        name="attendance_id"
                        value={attendance.id}
                      />
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
    </div>
  );
};

export default dashboardAttendanceManagePage;
