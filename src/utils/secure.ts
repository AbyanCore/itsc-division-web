import { createHmac, hash } from "crypto";
import { SECURITY_KEY, TIME_TOKEN_EXPIRED } from "@utils/constant";
import { user_type } from "@prisma/client";

export type JwtModel = {
  sub: string;
  email: string;
  role: user_type;
  iat: number;
  exp: number;
};

class Secure {
  static hashPassword(password: string): string {
    return hash("sha256", password);
  }

  static generateToken(
    user_id: string,
    email: string,
    role: user_type
  ): string {
    const header = JSON.stringify({ alg: "HS256", typ: "JWT" });
    const payload = JSON.stringify({
      sub: user_id,
      email: email,
      role: role,
      iat: Math.floor(Date.now() / 1000),
      exp: TIME_TOKEN_EXPIRED,
    } as JwtModel);
    const encodedHeader = Buffer.from(header).toString("base64url");
    const encodedPayload = Buffer.from(payload).toString("base64url");

    const signature = createHmac("sha256", SECURITY_KEY)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest("base64url");

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  static async verifyToken(token: string | null | undefined): Promise<boolean> {
    if (!token) return false;

    try {
      const [encodedHeader, encodedPayload, signature] = token.split(".");

      const payload = JSON.parse(atob(encodedPayload)) as JwtModel;

      const secretKey = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(SECURITY_KEY),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["verify"]
      );

      const signatureBuffer = Uint8Array.from(atob(signature), (c) =>
        c.charCodeAt(0)
      );

      const isValid = await crypto.subtle.verify(
        "HMAC",
        secretKey,
        signatureBuffer,
        new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`)
      );

      return isValid && payload.exp > Date.now() / 1000;
    } catch (error) {
      console.error("Error verifying token:", error);
      return false;
    }
  }

  static extractPayload(token: string): JwtModel {
    const [_, encodedPayload, __] = token.split(".");
    return JSON.parse(Buffer.from(encodedPayload, "base64url").toString());
  }

  static IsAdmin(token: string | null | undefined): boolean {
    if (!token) return false;
    const payload = Secure.extractPayload(token);
    return payload.role === "admin";
  }
}

export default Secure;
