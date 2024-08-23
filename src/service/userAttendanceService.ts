import db from "@/utils/db";
import { attendance_type } from "@prisma/client";

class userAttendanceService {
  static async makeAttendance(
    userUuid: string,
    attendanceId: number,
    type: attendance_type
  ) {
    const data = await db.user_attendance.create({
      data: {
        user_uuid: userUuid,
        attendance_id: attendanceId,
        attendance_type: type,
      },
    });
    return data;
  }

  static async getAttendancesById(attendanceId: number) {
    const data = await db.user_attendance.findMany({
      where: {
        attendance_id: attendanceId,
      },
    });
    return data;
  }

  static async checkAttendance(userUuid: string, attendanceId: number) {
    const data = await db.user_attendance.findFirst({
      where: {
        user_uuid: userUuid,
        attendance_id: attendanceId,
      },
    });
    return data;
  }
}

export default userAttendanceService;
