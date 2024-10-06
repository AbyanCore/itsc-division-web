"use server";

import userService from "@/service/userService";
import filter from "@/utils/filter";
import Secure from "@/utils/secure";
import { Prisma, user_type } from "@prisma/client";
import { redirect, RedirectType } from "next/navigation";
import { z } from "zod";

// zod validation
const userPost = z.object(
  {
    email: z.string().email("Email tidak valid"),
    password: z.string(),
    fullname: z.string(),
    surname: z.string(),
    phone_number: z.string(),
    type: z.enum([
      user_type.admin,
      user_type.guest,
      user_type.siswa,
      user_type.pengajar,
    ]),
    address: z.string(),
  },
  {
    message: "Data tidak valid",
  }
);

const userUpdate = z.object(
  {
    uuid: z.string(),
    email: z.string().email("Email tidak valid").optional(),
    password: z.string().optional(),
    fullname: z.string().optional(),
    surname: z.string().optional(),
    phone_number: z.string().optional(),
    type: z
      .enum([
        user_type.admin,
        user_type.guest,
        user_type.siswa,
        user_type.pengajar,
      ])
      .optional(),
    address: z.string().optional(),
  },
  {
    message: "Data tidak valid",
  }
);

// execution function

export async function getUsers(search: string, page: number) {
  const data = await userService.getUserFilter(
    {
      OR: [
        { email: { contains: search, mode: "insensitive" } },
        { uuid: { contains: search, mode: "insensitive" } },
        { fullname: { contains: search, mode: "insensitive" } },
      ],
    },
    (page - 1) * 10,
    10
  );
  return data;
}

export async function updateUser(data: FormData) {
  const validate = filter.dataValidation(userUpdate, {
    uuid: data.get("uuid"),
    email: data.get("email"),
    password: data.get("password"),
    fullname: data.get("fullname"),
    surname: data.get("surname"),
    phone_number: data.get("phone_number"),
    type: data.get("type"),
    address: data.get("address"),
  });

  if (!validate.success) return console.error(validate.error);

  if (Object.hasOwn(validate.data, "password"))
    validate.data.password = await Secure.hashPassword(
      validate.data.password as string
    );
  const res = validate.data as Prisma.userUpdateInput;

  await userService.updateUser(validate.data.uuid as string, res);
  redirect("/s/dashboard/users", RedirectType.replace);
}

export async function getUser(uuid: string) {
  const data = await userService.getUserById(uuid);
  return data;
}

export async function deleteUser(data: FormData) {
  const validate = z.string().safeParse(data.get("uuid"));

  if (!validate.success) return console.error(validate.error);
  const res = validate.data;

  await userService.deleteUser(res);
  redirect("/s/dashboard/users", RedirectType.replace);
}

export async function createUser(data: FormData) {
  const validate = filter.dataValidation(userPost, {
    email: data.get("email"),
    password: data.get("password"),
    fullname: data.get("fullname"),
    surname: data.get("surname"),
    phone_number: data.get("phone_number"),
    type: data.get("type"),
    address: data.get("address"),
  });

  if (!validate.success) return console.error(validate.error);
  const res = validate.data as Prisma.userCreateInput;

  res.password = await Secure.hashPassword(res.password);

  await userService.createUser(res);
  redirect("/s/dashboard/users", RedirectType.replace);
}
