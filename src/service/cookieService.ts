"use server";

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

class cookieService {
  static get(name: string) {
    return cookies().get(name)?.value;
  }

  static set(name: string, value: string, options?: Partial<ResponseCookie>) {
    cookies().set(name, value, options);
  }

  static delete(name: string) {
    cookies().delete(name);
  }

  static has(name: string) {
    return cookies().has(name);
  }
}

export default cookieService;
