import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function IsAuthenticated(req: NextRequest) {
  const token = req.cookies.get("token");
  if (!token) {
    return false;
  }

  return true;
}

export default function middleware(req: NextRequest) {
  const path = req.url.split(req.nextUrl.host)[1];

  // secure
  if (path.startsWith("/s") && !IsAuthenticated(req)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
