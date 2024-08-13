import db from "@/utils/db";
import { Prisma } from "@prisma/client";

class classEnrollmentService {
  static async getClassEnrollments() {
    const data = await db.class_enrollment.findMany();
    return data;
  }

  static async getClassEnrollmentById(id: number) {
    const data = await db.class_enrollment.findUnique({
      where: {
        id,
      },
    });
    return data;
  }

  static async createClassEnrollment(data: Prisma.class_enrollmentCreateInput) {
    const result = await db.class_enrollment.create({
      data,
    });
    return result;
  }

  static async deleteClassEnrollment(id: number) {
    const result = await db.class_enrollment.delete({
      where: {
        id,
      },
    });
    return result;
  }

  static async getAvaiableUser() {
    const data = await db.user.findMany({
      where: {
        class_enrollment: {
          none: {},
        },
      },
    });
    return data;
  }

  static async getClassEnrollmentByUserUuid(userUuid: string) {
    const data = await db.class_enrollment.findFirst({
      where: {
        user_uuid: userUuid,
      },
    });
    return data;
  }

  static async getClassEnrollmentByClassId(classId: number) {
    const data = await db.class_enrollment.findMany({
      where: {
        division_id: classId,
      },
    });
    return data;
  }

  static async deleteClassEnrollmentByUserUuid(userUuid: string) {
    const result = await db.class_enrollment.deleteMany({
      where: {
        user_uuid: userUuid,
      },
    });
    return result;
  }

  static async deleteClassEnrollmentByClassId(classId: number) {
    const result = await db.class_enrollment.deleteMany({
      where: {
        division_id: classId,
      },
    });
    return result;
  }

  static async getUsersByClassId(classId: number) {
    const data = await db.user.findMany({
      where: {
        class_enrollment: {
          some: {
            division_id: classId,
          },
        },
      },
    });
    return data;
  }
}

export default classEnrollmentService;
