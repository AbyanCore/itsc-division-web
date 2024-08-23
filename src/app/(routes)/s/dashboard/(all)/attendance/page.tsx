import { makeAttendance } from "@/server-action/dashboardAttendanceAction";
import attendanceService from "@/service/attendanceService";
import DivisionEnrollmentService from "@/service/divisionEnrollmentService";
import divisionService from "@/service/divisionService";
import userAttendanceService from "@/service/userAttendanceService";
import userService from "@/service/userService";
import { attendance, attendance_type, division } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const dsahboardAttendancePage = async () => {
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
          className="p-1 px-3 rounded-md bg-green-200"
          action={makeAttendance}
        >
          <input type="hidden" name="attendance_id" value={attendanceId} />
          <input type="hidden" name="user_uuid" value={user!.uuid} />
          <input type="hidden" name="type" value={attendance_type.hadir} />
          <button>Absen</button>
        </form>
        <form
          className="p-1 px-3 rounded-md bg-orange-200"
          action={makeAttendance}
        >
          <input type="hidden" name="attendance_id" value={attendanceId} />
          <input type="hidden" name="user_uuid" value={user!.uuid} />
          <input type="hidden" name="type" value={attendance_type.izin} />
          <button>Izin</button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className="font-bold text-xl p-3">Divisi {division?.name}</div>
      <div className="flex flex-col gap-3 p-2">
        {attendances.reverse().map((attendance) => (
          <div
            key={attendance.id}
            className="w-full bg-zinc-50 p-3 rounded-xl shadow-md hover:bg-zinc-200 transition-colors duration-150"
          >
            <h1 className="font-bold text-lg">{attendance.name}</h1>
            <p className="font-mono">{attendance.description}</p>
            <time className="font-thin">
              {new Date().toLocaleDateString("id-ID")}{" "}
              {attendance.start_at.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              {" - "}
              {attendance.end_at.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </time>
            {checkAttendance(attendance.id)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default dsahboardAttendancePage;
