import db from "@/utils/db";
import { Prisma } from "@prisma/client";

class attendanceService {
  static async getAttendance() {
    return await db.attendance.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }

  static async getAttendanceById(id: number) {
    return await db.attendance.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async createAttendance(data: Prisma.attendanceCreateInput) {
    await db.attendance.create({
      data: data,
    });
  }

  static async updateAttendance(
    id: number,
    data: Prisma.attendanceUpdateInput
  ) {
    await db.attendance.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  static async deleteAttendance(id: number) {
    await db.attendance.delete({
      where: {
        id: id,
      },
    });
  }

  static async getActiveAttendance() {
    return await db.attendance.findFirst({
      where: {
        start_at: {
          lte: new Date(),
        },
        end_at: {
          gte: new Date(),
        },
      },
    });
  }
}

export default attendanceService;
