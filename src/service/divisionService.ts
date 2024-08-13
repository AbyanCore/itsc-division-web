import db from "@/utils/db";
import { Prisma } from "@prisma/client";

class divisionService {
  static async getDivision() {
    const data = await db.division.findMany();
    return data;
  }

  static async getDivisionById(id: number) {
    const data = await db.division.findUnique({
      where: {
        id,
      },
    });
    return data;
  }

  static async createDivision(data: Prisma.divisionCreateInput) {
    const result = await db.division.create({
      data,
    });
    return result;
  }

  static async updateDivision(id: number, data: Prisma.divisionUpdateInput) {
    const result = await db.division.update({
      where: {
        id,
      },
      data,
    });
    return result;
  }

  static async deleteDivision(id: number) {
    const result = await db.division.delete({
      where: {
        id,
      },
    });
    return result;
  }
}

export default divisionService;
