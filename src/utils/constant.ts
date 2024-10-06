export const TIME_TOKEN_EXPIRED = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 1 day
export const APP_VERSION = "v2.1-beta";
export const CODE_UPDATE = "COLOR";
export const SECURITY_KEY = process.env.SECURITY_KEY ?? "secret";
