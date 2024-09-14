import { z } from "zod";

class filter {
  static filterActionMetadata(data: any) {
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => !key.startsWith("$ACTION_"))
    );
  }

  static dataFormIntegrity<T>(
    data: FormData,
    schema: { [K in keyof T]: any }
  ): T | null {
    try {
      let parsed = {} as T;
      let isValid = true;

      for (const key in schema) {
        if (schema.hasOwnProperty(key)) {
          const value = data.get(key);

          if (value === null || value === undefined) {
            console.error(
              `Nilai untuk kunci '${key}' tidak boleh null atau undefined.`
            );
            isValid = false;
          } else {
            parsed[key as keyof T] = value as unknown as T[keyof T];
          }
        }
      }

      return isValid ? parsed : null;
    } catch (error) {
      console.error("Terjadi kesalahan saat memvalidasi data:", error);
      return null;
    }
  }

  static dataFormMapper<T>(data: FormData, schema: { [K in keyof T]: any }): T {
    let parsed = {} as T;

    for (const key in schema) {
      if (schema.hasOwnProperty(key)) {
        const value = data.get(key);
        parsed[key as keyof T] = value as unknown as T[keyof T];
      }
    }
    return parsed;
  }

  static dataValidation(zodSchema: z.ZodSchema, data: any) {
    return zodSchema.safeParse(data);
  }
}

export default filter;
