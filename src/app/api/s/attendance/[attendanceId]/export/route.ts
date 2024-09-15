import userAttendanceService from "@/service/userAttendanceService";
import { NextRequest, NextResponse } from "next/server";
import * as csv from "csv";
import attendanceService from "@/service/attendanceService";
import Secure from "@/utils/secure";
import cookieService from "@/service/cookieService";

export async function GET(req: NextRequest, context: any) {
  const attendaceId = Number(context.params.attendanceId);

  // check is admin
  if (!Secure.IsAdmin(cookieService.get("token")!)) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const attendanceDetail = await attendanceService.getAttendanceById(
    attendaceId
  );

  try {
    const attendances = await userAttendanceService.getAttendancesById(
      attendaceId
    );
    const unAttendances = await userAttendanceService.getunAttendancesById(
      attendaceId
    );

    const data = [...attendances, ...unAttendances];

    const formattedData = data.map((siswa) => ({
      id: siswa.uuid,
      "Nama Siswa": siswa.fullname,
      Email: siswa.email,
      Divisi: siswa.division_enrollment[0].division.name,
      "Waktu Kehadiran":
        siswa.user_attendance[0]?.create_at.toISOString() ?? "NULL",
      "Status Kehadiran": siswa.user_attendance[0]?.attendance_type ?? "NULL",
    }));

    const columns = Object.keys(formattedData[0]);

    return new Promise((resolve, reject) => {
      csv.stringify(
        formattedData,
        {
          header: true,
          columns: columns,
        },
        (err, csvData) => {
          if (err) {
            console.error("Error generating CSV:", err);
            reject(
              NextResponse.json(
                { message: "Error generating CSV" },
                { status: 500 }
              )
            );
          } else {
            const response = new NextResponse(csvData, {
              status: 200,
              headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename="attendance_${
                  attendanceDetail?.id
                }_${attendanceDetail?.create_at.toDateString()}.csv"`,
              },
            });
            resolve(response);
          }
        }
      );
    });
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
