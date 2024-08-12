"use server";

import userService from "@/service/userService";
import Secure from "@/utils/secure";
import { Prisma, user, user_type } from "@prisma/client";
import { redirect, RedirectType } from "next/navigation";

export async function getUsers(filter: Prisma.userWhereInput, page: number) {
  const data = await userService.getUserFilter(filter, (page - 1) * 10, 10);
  return data;
}

export async function updateUser(data: FormData) {
  // form data to json
  const params = new URLSearchParams(data as any);
  const res = Object.fromEntries(params) as Partial<user>;

  if (Object.hasOwn(res, "password"))
    res.password = Secure.hashPassword(res.password as string);

  const result = await userService.updateUser(res.uuid as string, res);

  if (!result) {
    throw new Error("Failed to update user");
  }

  redirect("/s/dashboard/users", RedirectType.replace);
}

export async function fetchUser(uuid: string) {
  const data = await userService.getUserById(uuid);
  return data;
}

export async function deleteUser(uuid: string) {
  await userService.deleteUser(uuid);
  redirect("/s/dashboard/users", RedirectType.replace);
}

export async function createUser(data: FormData) {
  const result = await userService.createUser({
    fullname: data.get("fullname") as string,
    surname: data.get("surname") as string,
    email: data.get("email") as string,
    password: Secure.hashPassword(data.get("password") as string),
    address: data.get("address") as string,
    type: user_type.guest,
  });

  if (!result) {
    throw new Error("Failed to create user");
  }

  redirect("/s/dashboard/users", RedirectType.replace);
}
