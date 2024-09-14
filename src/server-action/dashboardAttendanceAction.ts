"use server";

import attendanceService from "@/service/attendanceService";
import userAttendanceService from "@/service/userAttendanceService";
import filter from "@/utils/filter";
import { attendance, attendance_type } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { z } from "zod";

// zod validation
const attendanceSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  start_at: z.coerce.date(),
  end_at: z.coerce.date(),
});

export async function createAttendance(data: FormData) {

  const parsed = filter.dataValidation(attendanceSchema, {
    name: data.get("name"),
    description: data.get("description"),
    start_at: data.get("start_at"),
    end_at: data.get("end_at"),
  });

  // check if data is valid
  if (!parsed.success) {
    redirect("/s/dashboard/attendance/manage/create?error=Data Tidak Valid", RedirectType.replace);
  };

  // check if start_at is before end_at
  if (parsed.data.start_at >= parsed.data.end_at) {
    redirect("/s/dashboard/attendance/manage/create?error=Waktu Selesai Harus Setelah Waktu Mulai", RedirectType.replace);
  }

  await attendanceService.createAttendance({
    name: parsed.data.name,
    description: parsed.data.description,
    start_at: parsed.data.start_at,
    end_at: parsed.data.end_at,
  });

  redirect("/s/dashboard/attendance/manage", RedirectType.replace);
}

export async function updateAttendance(data: FormData) {
  const raw = filter.filterActionMetadata(data) as Partial<attendance>;

  await attendanceService.updateAttendance(
    Number.parseInt(raw.id!.toString()),
    {
      name: raw.name! as string,
      description: raw.description! as string,
      start_at: new Date(raw.start_at!),
      end_at: new Date(raw.end_at!),
    }
  );
}

export async function deleteAttendance(data: FormData) {
  const id = Number.parseInt(data.get("attendance_id")!.toString());
  await attendanceService.deleteAttendance(id);

  revalidatePath("/s/dashboard/attendance/manage");
}

export async function getAttendances() {
  return attendanceService.getAttendance();
}

export async function getAttendance(id: number) {
  return attendanceService.getAttendanceById(id);
}

export async function makeAttendance(data: FormData) {
  const attendanceId = Number.parseInt(data.get("attendance_id")!.toString());
  const userUuid = data.get("user_uuid") as string;
  const type = data.get("type") as attendance_type;

  await userAttendanceService.makeAttendance(userUuid, attendanceId, type);

  redirect("/s/dashboard/attendance");
}
