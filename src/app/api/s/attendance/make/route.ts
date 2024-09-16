import attendanceService from "@/service/attendanceService";
import userAttendanceService from "@/service/userAttendanceService";
import db from "@/utils/db";
import { attendance_type } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const data = await req.json();
  const key = req.headers.get("Authorization");

  // check key
  if (!key) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // check token
  const device = await db.iot_device.findFirst({
    where: {
      token: key,
    },
  });

  if (!device) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // verify signature
  const [encodedHeader, encodedPayload, signature] = data.split(".");

  const payload = JSON.parse(atob(encodedPayload));

  const secretKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(device.token),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const signatureBuffer = Uint8Array.from(atob(signature), (c) =>
    c.charCodeAt(0)
  );

  const isValid = await crypto.subtle.verify(
    "HMAC",
    secretKey,
    signatureBuffer,
    new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`)
  );

  if (!isValid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // find active attendance
  const active_attendance = await attendanceService.getActiveAttendance();

  if (!active_attendance) {
    return NextResponse.json(
      { error: "No active attendance" },
      { status: 404 }
    );
  }

  // check user is already attendance
  const user_attendance = await userAttendanceService.checkAttendance(
    data.user_uuid,
    active_attendance.id
  );

  if (user_attendance) {
    return NextResponse.json(
      { error: "User already attendance" },
      { status: 400 }
    );
  }

  // make attendance
  const result = await userAttendanceService.makeAttendance(
    data.user_uuid,
    active_attendance.id,
    attendance_type.hadir
  );

  return NextResponse.json(result, {
    status: 200,
  });
}
