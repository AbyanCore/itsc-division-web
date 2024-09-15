import BackButton from "@/component/BackButton";
import attendanceService from "@/service/attendanceService";
import userAttendanceService from "@/service/userAttendanceService";
import { time3Offset, timeDifference } from "@/utils/time";
import { DocumentArrowUpIcon } from "@heroicons/react/16/solid";

const dashboardAttendanceManageDetailPage = async ({
  params,
}: {
  params: any;
}) => {
  const users = await userAttendanceService.getAttendancesById(
    Number.parseInt(params.id)
  );
  const users_non_attendance = await userAttendanceService.getunAttendancesById(
    Number.parseInt(params.id)
  );

  return (
    <div>
      <div className="flex flex-row justify-between p-2">
        <BackButton className="bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-600 w-fit">
          Back
        </BackButton>
        <h1>Manage Attendance Detail {params.id}</h1>
        <a
          href={`/api/s/attendance/${params.id}/export`}
          className="text-white bg-orange-400 p-2 rounded-md"
        >
          <DocumentArrowUpIcon className="w-4 h-4" />
        </a>
      </div>
      <table className="w-full table-auto">
        <thead className="bg-slate-300">
          <tr>
            <th className="border">Uuid</th>
            <th className="border">Username</th>
            <th className="border">Email</th>
            <th className="border">Type</th>
            <th className="border">Division</th>
            <th className="border">Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(async (attendance_user) => {
            return (
              <tr
                key={attendance_user.uuid}
                className="border-t hover:bg-gray-300 text-center transition-colors bg-green-50"
              >
                <td className="border">
                  {attendance_user.uuid.split("-")[0].concat("...")}
                </td>
                <td className="border">{attendance_user.fullname}</td>
                <td className="border">{attendance_user.email}</td>
                <td className="border">
                  {attendance_user.user_attendance.pop()?.attendance_type}
                </td>
                <td className="border">
                  {attendance_user.division_enrollment.pop()?.division.name}
                </td>
                <td className="border">
                  {attendance_user.create_at.toLocaleString("id-ID", {
                    timeZone: "Asia/Jakarta",
                  })}
                </td>
              </tr>
            );
          })}
          {users_non_attendance.map(async (attendance_user) => {
            return (
              <tr
                key={attendance_user.uuid}
                className="border-t hover:bg-gray-300 text-center transition-colors bg-red-50"
              >
                <td className="border">
                  {attendance_user.uuid.split("-")[0].concat("...")}
                </td>
                <td className="border">{attendance_user.fullname}</td>
                <td className="border">{attendance_user.email}</td>
                <td className="border">NULL</td>
                <td className="border">
                  {attendance_user.division_enrollment.pop()?.division.name}
                </td>
                <td className="border">
                  {attendance_user.create_at.toLocaleString("id-ID", {
                    timeZone: "Asia/Jakarta",
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default dashboardAttendanceManageDetailPage;
