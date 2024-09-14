"use server";

import divisionService from "@/service/divisionService";
import filter from "@/utils/filter";
import { division, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { z } from "zod";

// zod schema
const divisionPost = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
})

const divisionPut = z.object({
  id: z.coerce.number().positive().int(),
  name: z.string().min(1).optional(),
  description: z.string().optional(),
})

// execution function

export async function getDivisions() {
  const data = await divisionService.getDivision();
  return data;
}

export async function getDivision(id: number) {
  const data = await divisionService.getDivisionById(id);
  return data;
}

export async function deleteDivision(id: number) {
  const validate = z.number().positive().int().safeParse(id);

  if (!validate.success) return console.error(validate.error);
  const res = validate.data;

  await divisionService.deleteDivision(res);
  revalidatePath("/s/dashboard/division");
}

export async function createDivision(data: FormData) {
  const validate = filter.dataValidation(divisionPost, {
    name: data.get("name"),
    description: data.get("description"),
  });

  if (!validate.success) return console.error(validate.error);
  const res = validate.data as Prisma.divisionCreateInput;

  await divisionService.createDivision(res);
  redirect("/s/dashboard/division", RedirectType.replace);
}

export async function updateDivision(data: FormData) {
  const validate = filter.dataValidation(divisionPut,{
    id: data.get("id"),
    name: data.get("name"),
    description: data.get("description"),
  });

  if (!validate.success) return console.error(validate.error);
  const res = validate.data as Prisma.divisionUpdateInput;

  await divisionService.updateDivision(
    validate.data.id,
    res
  );

  redirect("/s/dashboard/division");
}
