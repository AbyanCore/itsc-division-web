"use server"

import cookieService from "@/service/cookieService";
import userService from "@/service/userService";
import filter from "@/utils/filter";
import Secure from "@/utils/secure";
import { redirect } from "next/navigation";
import { z } from "zod";

// zod validation
const updateProfileSchema = z.object({
    password: z.string().optional(),
    password_confirmation: z.string().optional(),
    phone_number: z.string().optional(),
    address: z.string().optional(),
});


export async function getProfile(uuid: string) {
    const token = Secure.extractPayload(cookieService.get("token")!);
    if (uuid !== token.sub) {
        return redirect("/s/dashboard/profile");
    }
    
    const data: any = await userService.getUserById(uuid);
    
    // remote all sensitive data
    delete data.create_at;
    delete data.update_at;
    delete data.fullname;
    delete data.surname;
    delete data.uuid;
    delete data.type;
    delete data.type;

    return data;
}

export async function updateProfile(data: FormData) {
    const uuid = Secure.extractPayload(cookieService.get("token")!).sub;
    const parsed = filter.dataValidation(updateProfileSchema, {
        password: data.get("password"),
        password_confirmation: data.get("password_confirmation"),
        phone_number: data.get("phone_number"),
        address: data.get("address"),
    });

    // check if data is valid
    if (!parsed.success) {
        redirect("/s/dashboard/profile/edit?error=Data Tidak Valid");
    }

    // check if password is same
    if (parsed.data.password !== parsed.data.password_confirmation) {
        redirect("/s/dashboard/profile/edit?error=Password Tidak Sama");
    }

    if (Object.hasOwn(parsed.data, "password"))
      parsed.data.password = await Secure.hashPassword(
        parsed.data.password as string
      );

    const res = await userService.updateUser(uuid,{
        password: parsed.data.password,
        phone_number: parsed.data.phone_number,
        address: parsed.data.address,
    })
    
    redirect("/s/dashboard/profile");
}