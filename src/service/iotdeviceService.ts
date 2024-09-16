import db from "@/utils/db";
import { Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

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

  static async regernerateToken(device_id: number) {
    const result = await db.iot_device.update({
      where: {
        id: device_id,
      },
      data: {
        token: randomUUID(),
      },
    });
  }
}

export default iotdeviceService;
