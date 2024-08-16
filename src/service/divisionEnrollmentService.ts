import db from "@/utils/db";
import { Prisma } from "@prisma/client";

class DivisionEnrollmentService {
  static async getDivisionEnrollments() {
    const data = await db.division_enrollment.findMany();
    return data;
  }

  static async createDivisionEnrollment(
    data: Prisma.division_enrollmentCreateInput
  ) {
    const result = await db.division_enrollment.create({
      data,
    });
    return result;
  }

  static async getAvaiableUser() {
    const data = await db.user.findMany({
      where: {
        NOT: {
          OR: [
            {
              type: "admin",
            },
            {
              type: "guest",
            },
          ],
        },
        division_enrollment: {
          none: {},
        },
      },
    });
    return data;
  }

  static async getClassEnrollmentByUserUuid(userUuid: string) {
    const data = await db.division_enrollment.findFirst({
      where: {
        user_uuid: userUuid,
      },
    });
    return data;
  }

  static async getClassEnrollmentByClassId(classId: number) {
    const data = await db.division_enrollment.findMany({
      where: {
        division_id: classId,
      },
    });
    return data;
  }

  static async deleteClassEnrollmentByUserUuid(userUuid: string) {
    const result = await db.division_enrollment.deleteMany({
      where: {
        user_uuid: userUuid,
      },
    });
    return result;
  }

  static async getUsersByClassId(classId: number) {
    const data = await db.user.findMany({
      where: {
        division_enrollment: {
          some: {
            division_id: classId,
          },
        },
      },
    });
    return data;
  }
}

export default DivisionEnrollmentService;
