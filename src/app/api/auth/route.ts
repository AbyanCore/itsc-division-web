import { TIME_TOKEN_EXPIRED } from "@/utils/constant";
import db from "@/utils/db";
import Secure from "@/utils/secure";
import { unstable_noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  unstable_noStore();
  const { email, password } = await req.json();

  console.log(
    `LOGIN LOGGER :
      - EMAIL : ${email}
      - PASSWORD : ${(await Secure.hashPassword(password!)).toString()}
      - USER-AGENT : ${req.headers.get("user-agent")}
      - IP-ADDRESS : ${req.headers.get("x-forwarded-for") || "unknown"}`
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
      password: await Secure.hashPassword(password),
    },
  });

  if (!user) {
    return NextResponse.json({ message: "Login Failed" }, { status: 400 });
  }

  const token = await Secure.generateToken(user.uuid, user.email, user.type);
  const res = NextResponse.json(
    {
      token: token,
    },
    {
      status: 200,
      statusText: "OK",
    }
  );

  res.cookies.set({
    name: "token",
    value: token,
    maxAge: Secure.getTokenExpirationDate(),
  });

  return res;
}
