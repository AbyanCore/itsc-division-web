import db from "@/utils/db";
import { Prisma } from "@prisma/client";

class iotdeviceService {
  static async getIotDevices() {
    const data = await db.iot_device.findMany();
    return data;
  }

  static async createIotDevice(data: Prisma.iot_deviceCreateInput) {
    const result = await db.iot_device.create({
      data,
    });
    return result;
  }

  static async deleteIotDevice(id: number) {
    const result = await db.iot_device.delete({
      where: {
        id,
      },
    });
    return result;
  }
}

export default iotdeviceService;
