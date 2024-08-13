"use server";

import axiosGlobal from "@/utils/axios";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export default async function signin(data: FormData) {
  const email = data.get("email")?.toString();
  const password = data.get("password")?.toString();

  await axiosGlobal
    .post("/api/auth", { email, password })
    .then((res) => {
      if (res.status === 200) {
        cookies().set("token", res.data.token, {
          maxAge: 60 * 60 * 24,
          path: "/",
          httpOnly: true,
        });
      }
    })
    .catch(() => {
      redirect(
        "/login?error=Invalid Username or Password",
        RedirectType.replace
      );
    });

  redirect("/s");
}
