"use server";

import userService from "@/service/userService";
import Secure from "@/utils/secure";
import { Prisma, user, user_type } from "@prisma/client";
import { redirect, RedirectType } from "next/navigation";

export async function getUsers(search: string, page: number) {
  const data = await userService.getUserFilter(
    {
      OR: [
        { email: { contains: search } },
        { uuid: { contains: search } },
        { fullname: { contains: search } },
      ],
    },
    (page - 1) * 10,
    10
  );
  return data;
}

export async function updateUser(data: FormData) {
  const res = Object.fromEntries(data) as Partial<user>;

  if (Object.hasOwn(res, "password"))
    res.password = Secure.hashPassword(res.password as string);

  await userService.updateUser(res.uuid as string, res);

  redirect("/s/dashboard/users", RedirectType.replace);
}

export async function getUser(uuid: string) {
  const data = await userService.getUserById(uuid);
  return data;
}

export async function deleteUser(uuid: string) {
  await userService.deleteUser(uuid);
  redirect("/s/dashboard/users", RedirectType.replace);
}

export async function createUser(data: FormData) {
  const res = Object.fromEntries(data) as Partial<user>;

  await userService.createUser(res as user);

  redirect("/s/dashboard/users", RedirectType.replace);
}
