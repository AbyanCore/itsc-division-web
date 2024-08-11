import { createHmac, hash } from "crypto";

export type JwtModel = {
  sub: string;
  email: string;
  iat: number;
  exp: number;
};

class Secure {
  static hashPassword(password: string): string {
    return hash("sha256", password);
  }

  static generateToken(user_id: string, email: string): string {
    const header = JSON.stringify({ alg: "HS256", typ: "JWT" });
    const payload = JSON.stringify({
      sub: user_id,
      email: email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    } as JwtModel);
    const secret = process.env.SECURITY_KEY!;

    const encodedHeader = Buffer.from(header).toString("base64url");
    const encodedPayload = Buffer.from(payload).toString("base64url");

    const signature = createHmac("sha256", secret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest("base64url");

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  static verifyToken(token: string): boolean {
    const [encodedHeader, encodedPayload, signature] = token.split(".");

    const header = JSON.parse(Buffer.from(encodedHeader, "base64").toString());
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64").toString()
    ) as JwtModel;
    const secret = process.env.SECURITY_KEY!;

    const expectedSignature = createHmac("sha256", secret)
      .update(encodedHeader + "." + encodedPayload)
      .digest("base64");

    return signature === expectedSignature && payload.exp > Date.now();
  }

  static extractPayload(token: string): JwtModel {
    const [_, encodedPayload, __] = token.split(".");
    return JSON.parse(Buffer.from(encodedPayload, "base64").toString());
  }
}

export default Secure;
