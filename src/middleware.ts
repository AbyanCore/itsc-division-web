import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Secure from "./utils/secure";

export default async function middleware(req: NextRequest) {
  const path = req.url.split(req.nextUrl.host)[1];
  const token = req.cookies.get("token");

  const isVerify = await Secure.verifyToken(token?.value);
  const isAdmin = Secure.IsAdmin(token?.value);

  // secure
  if (path.startsWith("/s") && !(await Secure.verifyToken(token?.value))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (
    (path.startsWith("/s/dashboard/division") ||
      path.startsWith("/s/dashboard/users") ||
      path.startsWith("/s/dashboard/attendance/manage")) &&
    !isAdmin &&
    isVerify
  ) {
    return NextResponse.redirect(new URL("/s/dashboard", req.url));
  }

  if (path.startsWith("/login") && (await Secure.verifyToken(token?.value))) {
    return NextResponse.redirect(new URL("/s", req.url));
  }

  return NextResponse.next();
}
