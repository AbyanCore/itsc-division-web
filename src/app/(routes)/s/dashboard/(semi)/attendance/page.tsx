import { makeAttendance } from "@/server-action/dashboardAttendanceAction";
import attendanceService from "@/service/attendanceService";
import DivisionEnrollmentService from "@/service/divisionEnrollmentService";
import divisionService from "@/service/divisionService";
import userAttendanceService from "@/service/userAttendanceService";
import userService from "@/service/userService";
import { attendance, attendance_type } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const dashboardAttendancePage = async () => {
  const user = await userService.getUserByToken(cookies().get("token")!.value);

  if (user?.type === "admin") {
    redirect("/s/dashboard/attendance/manage");
  }

  const enroll_Division =
    await DivisionEnrollmentService.getClassEnrollmentByUserUuid(user!.uuid);

  if (!enroll_Division) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="font-bold">
          You are not enrolled in any division. Please contact your division
          leader.
        </h1>
      </div>
    );
  }

  const division = await divisionService.getDivisionById(
    enroll_Division!.division_id
  );
  const attendances: attendance[] = await attendanceService.getAttendance();

  async function checkAttendance(attendanceId: number) {
    const data = await userAttendanceService.checkAttendance(
      user!.uuid,
      attendanceId
    );

    if (data) {
      return <p className="font-bold">{data.attendance_type}</p>;
    }

    return (
      <div className="flex flex-row gap-2">
        <form
          className="p-1 px-3 rounded-md bg-green-500 hover:bg-green-600 text-white transition-all"
          action={makeAttendance}
        >
          <input
            type="hidden"
            id="attendance_id"
            name="attendance_id"
            value={attendanceId}
          />
          <input
            type="hidden"
            id="user_uuid"
            name="user_uuid"
            value={user!.uuid}
          />
          <input
            type="hidden"
            id="type"
            name="type"
            value={attendance_type.hadir}
          />
          <button type="submit">Present</button>
        </form>
        <form
          className="ml-10 p-1 px-3 rounded-md bg-orange-500 hover:bg-orange-600 text-white transition-all"
          action={makeAttendance}
        >
          <input
            type="hidden"
            id="attendance_id"
            name="attendance_id"
            value={attendanceId}
          />
          <input
            type="hidden"
            id="user_uuid"
            name="user_uuid"
            value={user!.uuid}
          />
          <input
            type="hidden"
            id="type"
            name="type"
            value={attendance_type.izin}
          />
          <button type="submit">Excused</button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="font-bold text-2xl p-4  rounded-md">
        Divisi {division?.name}
      </div>
      <div className="flex flex-col gap-4 p-4">
        {attendances.reverse().map((attendance) => (
          <div
            key={attendance.id}
            className="bg-zinc-50 dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:bg-zinc-200 dark:hover:bg-gray-700 transition-colors duration-150"
          >
            <h1 className="font-bold text-lg text-gray-800 dark:text-gray-100">
              {attendance.name}
            </h1>
            <p className="font-mono text-gray-600 dark:text-gray-400 mb-1">
              {attendance.description}
            </p>
            {checkAttendance(attendance.id)}
            <time className="block font-thin text-sm text-gray-500 dark:text-gray-400 -mt-3 text-end">
              {new Date().toLocaleDateString("id-ID")}{" "}
              {attendance.start_at.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {attendance.end_at.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </time>
          </div>
        ))}
      </div>
    </div>
  );
};

export default dashboardAttendancePage;
