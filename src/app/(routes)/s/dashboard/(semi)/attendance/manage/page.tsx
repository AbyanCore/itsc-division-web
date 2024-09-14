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
    <div>
      <div className="flex flex-row justify-between p-2">
        <h1>Manage Attendance</h1>
        <a
          href={`/s/dashboard/attendance/manage/create`}
          className="bg-blue-500 text-white font-bold p-2 rounded hover:bg-blue-600"
        >
          <PlusIcon className="h-4 w-4" />
        </a>
      </div>
      <table className="w-full table-auto">
        <thead className="bg-slate-300">
          <tr>
            <th className="border">id</th>
            <th className="border">Name</th>
            <th className="border">Create at</th>
            <th className="border">Time Span</th>
            <th className="border">Sum</th>
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody>
          {attendances.map((attendance: attendance) => (
            <tr
              key={attendance.id}
              className="border-t hover:bg-gray-300 text-center transition-colors"
            >
              <td className="border">{attendance.id}</td>
              <td className="border">{attendance.name}</td>
              <td className="border">
                {attendance.create_at.toLocaleDateString("id-ID")}
              </td>
              <td className="border">
                {attendance.start_at.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {" - "}
                {attendance.end_at.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td className="border">{getUsersAttendance(attendance.id)}</td>
              <td className="border flex justify-center gap-2 p-1">
                <a
                  href={`/s/dashboard/attendance/manage/${attendance.id}/detail`}
                  className="bg-orange-500 text-white font-bold p-2 rounded hover:bg-orange-600"
                >
                  <ArrowRightEndOnRectangleIcon className="h-4 w-4" />
                </a>
                <a
                  href={`/s/dashboard/attendance/manage/${attendance.id}/edit`}
                  className="bg-blue-500 text-white font-bold p-2 rounded hover:bg-blue-600"
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
                    className="bg-red-500 text-white font-bold p-2 rounded hover:bg-red-600"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default dashboardAttendanceManagePage;
