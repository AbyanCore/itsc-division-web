"use server";

import DivisionEnrollmentService from "@/service/divisionEnrollmentService";
import { redirect, RedirectType } from "next/navigation";

export async function getUserAvaiable() {
  return await DivisionEnrollmentService.getAvaiableUser();
}

export async function getUserAssigned(divisonid: number) {
  return await DivisionEnrollmentService.getUsersByClassId(divisonid);
}

export async function AddUserToClass(data: FormData) {
  const user_uuid = data.get("user_uuid")?.toString();
  const division_id = Number.parseInt(data.get("division_id")!.toString());

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
  const user_uuid = data.get("user_uuid")?.toString();
  const division_id = data.get("division_id")?.toString();

  await DivisionEnrollmentService.deleteClassEnrollmentByUserUuid(user_uuid!);

  redirect(`/s/dashboard/division/${division_id}/users`, RedirectType.replace);
}
