import BackButton from "@/component/BackButton";
import DivisionEnrollmentService from "@/service/divisionEnrollmentService";
import divisionService from "@/service/divisionService";
import userAttendanceService from "@/service/userAttendanceService";
import userService from "@/service/userService";

const dashboardAttendanceManageDetailPage = async ({
  params,
}: {
  params: any;
}) => {
  const users = await userAttendanceService.getAttendancesById(
    Number.parseInt(params.id)
  );

  async function getUser(uuid: string) {
    return await userService.getUserById(uuid);
  }

  async function getDivision(user_uuid: string) {
    return await divisionService.getDivisionById(
      (await DivisionEnrollmentService.getClassEnrollmentByUserUuid(user_uuid))!
        .division_id
    );
  }

  return (
    <div>
      <h1>Manage Attendance Detail {params.id}</h1>
      <BackButton>Back</BackButton>
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
            const user = await getUser(attendance_user.user_uuid);
            const division = await getDivision(attendance_user.user_uuid);
            return (
              <tr
                key={attendance_user.user_uuid}
                className="border-t hover:bg-gray-300 text-center transition-colors"
              >
                <td className="border">
                  {attendance_user.user_uuid.split("-")[0].concat("...")}
                </td>
                <td className="border">{user?.fullname}</td>
                <td className="border">{user?.email}</td>
                <td className="border">{attendance_user.attendance_type}</td>
                <td className="border">{division?.name}</td>
                <td className="border">
                  {attendance_user.create_at.toLocaleDateString("id")}
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
