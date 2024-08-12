import db from "@/utils/db";
import Secure from "@/utils/secure";
import { Prisma } from "@prisma/client";

class userService {
  static async getUserFilter(
    filter: Prisma.userWhereInput,
    skip?: number,
    take?: number
  ) {
    return await db.user.findMany({
      where: filter,
      skip,
      take,
    });
  }

  static async getUserByToken(token: string) {
    const payload = Secure.extractPayload(token);

    return this.getUserById(payload.sub);
  }

  static async getUserById(uuid: string) {
    return await db.user.findFirst({
      where: {
        uuid,
      },
    });
  }

  static async getUserByEmail(email: string) {
    return await db.user.findFirst({
      where: {
        email,
      },
    });
  }

  static async getUsers(skip?: number, take?: number) {
    return await db.user.findMany({
      skip,
      take,
    });
  }

  static async createUser(data: Prisma.userCreateInput) {
    return await db.user.create({
      data,
    });
  }

  static async updateUser(uuid: string, data: Prisma.userUpdateInput) {
    return await db.user.update({
      where: {
        uuid,
      },
      data,
    });
  }

  static async deleteUser(uuid: string) {
    return await db.user.delete({
      where: {
        uuid,
      },
    });
  }
}

export default userService;
