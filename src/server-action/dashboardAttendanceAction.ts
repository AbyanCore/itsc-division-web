"use server";

import attendanceService from "@/service/attendanceService";
import userAttendanceService from "@/service/userAttendanceService";
import { attendance, attendance_type } from "@prisma/client";
import { redirect } from "next/navigation";

export async function createAttendance(data: FormData) {
  const raw = Object.fromEntries(data) as Partial<attendance>;

  await attendanceService.createAttendance({
    name: raw.name! as string,
    description: raw.description! as string,
    start_at: new Date(raw.start_at!),
    end_at: new Date(raw.end_at!),
  });
}

export async function updateAttendance(data: FormData) {
  const raw = Object.fromEntries(data) as Partial<attendance>;

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
