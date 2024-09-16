"use server";

import iotdeviceService from "@/service/iotdeviceService";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

export async function getIotDevices() {
  const data = await iotdeviceService.getIotDevices();
  return data.sort((a, b) => a.create_at.getTime() - b.create_at.getTime());
}

export async function regernerateIotDeviceToken(formData: FormData) {
  const device_id = Number(formData.get("device_id"));

  await iotdeviceService.regernerateToken(device_id);

  revalidatePath("/s/dashboard/device");
}

export async function createIotDevice(formData: FormData) {
  const name = formData.get("name") as string;

  try {
    await iotdeviceService.createIotDevice({
      name: name,
    });
  } catch (error) {
    redirect(
      "/s/dashboard/device?error=failed to create device,Device name already exist",
      RedirectType.replace
    );
  }

  revalidatePath("/s/dashboard/device");
}

export async function deleteIotDevice(formData: FormData) {
  const device_id = Number(formData.get("device_id"));

  await iotdeviceService.deleteIotDevice(device_id);

  revalidatePath("/s/dashboard/device");
}
