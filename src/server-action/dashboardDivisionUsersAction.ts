"use server";

import DivisionEnrollmentService from "@/service/divisionEnrollmentService";
import filter from "@/utils/filter";
import { Prisma } from "@prisma/client";
import { redirect, RedirectType } from "next/navigation";
import { z } from "zod";

// zod validation
const addRemoveUserClass = z.object({
  user_uuid: z.string(),
  division_id: z.coerce.number().positive().int(),
});

// execution function

export async function getUserAvaiable(search: string) {
  return (await DivisionEnrollmentService.getAvaiableUser()).filter(
    (user) =>
      user.fullname.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.uuid.toLowerCase().includes(search.toLowerCase())
  );
}

export async function getUserAssigned(search: string, divisonid: number) {
  return (await DivisionEnrollmentService.getUsersByClassId(divisonid)).filter(
    (user) =>
      user.fullname.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.uuid.toLowerCase().includes(search.toLowerCase())
  );
}

export async function AddUserToClass(data: FormData) {
  const validate = filter.dataValidation(addRemoveUserClass, {
    user_uuid: data.get("user_uuid"),
    division_id: data.get("division_id"),
  });

  if (!validate.success) return console.error(validate.error);

  const { user_uuid, division_id } = validate.data;

  await DivisionEnrollmentService.createDivisionEnrollment({
    user: {
      connect: {
        uuid: user_uuid,
      },
    },
    division: {
      connect: {
        id: division_id,
      },
    },
  });

  redirect(`/s/dashboard/division/${division_id}/users`, RedirectType.replace);
}

export async function RemoveUserFromClass(data: FormData) {
  const validate = filter.dataValidation(addRemoveUserClass,{
    user_uuid: data.get("user_uuid"),
    division_id: data.get("division_id"),
  });

  if (!validate.success) return console.error(validate.error);

  const {user_uuid,division_id} = validate.data;

  await DivisionEnrollmentService.deleteClassEnrollmentByUserUuid(user_uuid!);

  redirect(`/s/dashboard/division/${division_id}/users`, RedirectType.replace);
}
