import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Secure from "./utils/secure";
import { user_type } from "@prisma/client";

const getUserPermission = async (req: NextRequest) => {
  const token = req.cookies.get("token");

  if (!(await Secure.verifyToken(token?.value))) {
    throw new Error("Invalid token");
  }
  const data = Secure.extractPayload(token!.value);

  return {
    role: data.role,
    email: data.email,
  };
};

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const protectedPath = new Map<string, string[]>([
    ["/s/dashboard", [user_type.admin, user_type.siswa, user_type.pengajar]],
    ["/s/dashboard/division", [user_type.admin]],
    ["/s/dashboard/device", [user_type.admin]],
    ["/s/dashboard/users", [user_type.admin]],
    ["/s/dashboard/attendance/manage", [user_type.admin]],
  ]);

  const requiredRoles: string[] = Array.from(protectedPath.entries())
    .filter(([key]) => pathname.startsWith(key))
    .flatMap(([, val]) => val);

  if (requiredRoles.length === 0) {
    return NextResponse.next();
  }

  try {
    const { role, email } = await getUserPermission(req);

    console.log(
      `TRAKING :
      - EMAIL : ${email}
      - ROLE : ${role}
      - PATH : ${pathname}
      - REQUIRED : ${requiredRoles}`
    );

    if (requiredRoles.includes(role)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/s/dashboard", req.url));
  } catch (error) {
    const response = NextResponse.redirect(
      new URL(`/login?redirectTo=${pathname}`, req.url)
    );
    response.cookies.delete("token");
    return response;
  }
}
