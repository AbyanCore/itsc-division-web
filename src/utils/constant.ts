export const TIME_TOKEN_EXPIRED = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
export const APP_VERSION = "v1.9-beta";
export const SECURITY_KEY = process.env.SECURITY_KEY ?? "secret";
