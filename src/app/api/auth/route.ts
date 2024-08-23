import db from "@/utils/db";
import Secure from "@/utils/secure";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  console.log(
    "LOGIN LOGGER",
    `
    email: ${email},
    password: ${Secure.hashPassword(password!)},
    user-agent: ${req.headers.get("user-agent")},
    ip-address: ${req.headers.get("x-forwarded-for") || "unknown"}, 
    referer: ${req.headers.get("referer") || "unknown"}
    `
  );

  if (!email || !password) {
    return NextResponse.json(
      { message: "Invalid username or password" },
      { status: 400 }
    );
  }

  const user = await db.user.findFirst({
    where: {
      email: email,
      password: Secure.hashPassword(password),
    },
  });

  if (!user) {
    return NextResponse.json({ message: "Login Failed" }, { status: 400 });
  }

  const res = NextResponse.json(
    {
      token: Secure.generateToken(user.uuid, user.email, user.type),
    },
    {
      status: 200,
      statusText: "OK",
    }
  );

  return res;
}
