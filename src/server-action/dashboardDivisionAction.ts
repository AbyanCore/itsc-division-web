"use server";

import divisionService from "@/service/divisionService";
import { division } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

export async function getDivisions() {
  const data = await divisionService.getDivision();
  return data;
}

export async function getDivision(id: number) {
  const data = await divisionService.getDivisionById(id);
  return data;
}

export async function deleteDivision(id: number) {
  await divisionService.deleteDivision(id);
  revalidatePath("/s/dashboard/division");
}

export async function createDivision(data: FormData) {
  const res = Object.fromEntries(data) as Partial<division>;

  await divisionService.createDivision(res as division);

  redirect("/s/dashboard/division", RedirectType.replace);
}

export async function updateDivision(data: FormData) {
  const res = Object.fromEntries(data) as Partial<division>;

  // revalidate data type
  res.id = Number.parseInt(res.id!.toString());

  await divisionService.updateDivision(
    Number.parseInt(res.id!.toString()),
    res
  );

  redirect("/s/dashboard/division");
}
