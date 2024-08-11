import db from "@/utils/db";
import Secure from "@/utils/secure";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // validate
  if (!email || !password) {
    return NextResponse.json(
      { message: "Invalid username or password" },
      { status: 400 }
    );
  }

  // execute
  const user = await db.user.findFirst({
    where: {
      email: email,
      password: password,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "Login Failed" }, { status: 400 });
  }

  const res = NextResponse.json(
    { token: Secure.generateToken(user.uuid, user.email) },
    {
      status: 200,
      statusText: "OK",
    }
  );

  return res;
}
