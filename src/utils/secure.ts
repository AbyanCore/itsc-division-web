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
  static async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    // Convert hash buffer to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }

  static async generateToken(
    userId: string,
    email: string,
    role: user_type
  ): Promise<string> {
    const header = JSON.stringify({ alg: "HS256", typ: "JWT" });
    const payload = JSON.stringify({
      sub: userId,
      email: email,
      role: role,
      iat: Math.floor(Date.now() / 1000),
      exp: TIME_TOKEN_EXPIRED,
    } as JwtModel);

    const encodedHeader = btoa(header)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    const encodedPayload = btoa(payload)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(SECURITY_KEY),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`)
    );

    const signature = btoa(
      String.fromCharCode(...new Uint8Array(signatureBuffer))
    )
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

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

      return isValid && payload.exp > Math.floor(Date.now() / 1000);
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
