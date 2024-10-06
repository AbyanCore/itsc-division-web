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
    <div className="w-full h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-4 space-y-4 sm:space-y-0">
        <BackButton className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-bold py-2 px-3 rounded">
          Back
        </BackButton>
        <h1 className="font-bold text-lg">
          Manage Attendance Detail {params.id}
        </h1>
        <a
          href={`/api/s/attendance/${params.id}/export`}
          className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-bold p-2.5 rounded-md"
        >
          <DocumentArrowUpIcon className="w-4 h-4" />
        </a>
      </div>
      <div className="overflow-hidden shadow-md sm:rounded-lg sm:mx-4 mx-2">
        <div className="max-h-[75vh] relative overflow-y-auto">
          <table className="w-full text-sm text-left table-auto min-w-full">
            <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-4 py-3 sm:px-6">
                  Uuid
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6">
                  Username
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6">
                  Email
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6">
                  Type
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6">
                  Division
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6">
                  Created
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map(async (attendance_user) => (
                <tr
                  key={attendance_user.uuid}
                  className="bg-green-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-4 sm:px-6">
                    {attendance_user.uuid.split("-")[0].concat("...")}
                  </td>
                  <td className="px-4 py-4 sm:px-6">
                    {attendance_user.fullname}
                  </td>
                  <td className="px-4 py-4 sm:px-6">{attendance_user.email}</td>
                  <td className="px-4 py-4 sm:px-6 ">
                    {attendance_user.user_attendance.pop()?.attendance_type}
                  </td>
                  <td className="px-4 py-4 sm:px-6">
                    {attendance_user.division_enrollment.pop()?.division.name}
                  </td>
                  <td className="px-4 py-4 sm:px-6">
                    {attendance_user.create_at.toLocaleString("id-ID", {
                      timeZone: "Asia/Jakarta",
                    })}
                  </td>
                </tr>
              ))}
              {users_non_attendance.map(async (attendance_user) => (
                <tr
                  key={attendance_user.uuid}
                  className="bg-red-50 dark:bg-gray-800 border-b dark:brightness-50 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-4 sm:px-6">
                    {attendance_user.uuid.split("-")[0].concat("...")}
                  </td>
                  <td className="px-4 py-4 sm:px-6">
                    {attendance_user.fullname}
                  </td>
                  <td className="px-4 py-4 sm:px-6">{attendance_user.email}</td>
                  <td className="px-4 py-4 sm:px-6">NULL</td>
                  <td className="px-4 py-4 sm:px-6">
                    {attendance_user.division_enrollment.pop()?.division.name}
                  </td>
                  <td className="px-4 py-4 sm:px-6">
                    {attendance_user.create_at.toLocaleString("id-ID", {
                      timeZone: "Asia/Jakarta",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <div className="overflow-hidden shadow-md sm:rounded-lg mx-4">
        <div className="block overflow-y-auto max-h-[75vh]">
          <table className="w-full text-sm text-left"></table>
        </div>
      </div> */}
    </div>
  );
};

export default dashboardAttendanceManageDetailPage;
