import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const adminSessionDurationSeconds = 30 * 60;

const adminSessionCookie = "mustafa_admin_session";
const sessionVersion = "v1";

function adminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

function secureCompare(left: string, right: string) {
  const leftDigest = createHash("sha256").update(left).digest();
  const rightDigest = createHash("sha256").update(right).digest();

  return timingSafeEqual(leftDigest, rightDigest);
}

function sign(expiresAt: number) {
  return createHmac("sha256", adminPassword())
    .update(`${sessionVersion}.${expiresAt}`)
    .digest("base64url");
}

function createToken(expiresAt: number) {
  return `${sessionVersion}.${expiresAt}.${sign(expiresAt)}`;
}

function readToken(token: string | undefined) {
  if (!token || !adminPassword()) {
    return null;
  }

  const [version, expiresAtValue, signature] = token.split(".");
  const expiresAt = Number(expiresAtValue);

  if (
    version !== sessionVersion ||
    !signature ||
    !Number.isSafeInteger(expiresAt) ||
    expiresAt <= Date.now()
  ) {
    return null;
  }

  return secureCompare(signature, sign(expiresAt)) ? { expiresAt } : null;
}

export function verifyAdminPassword(password: string) {
  const expectedPassword = adminPassword();
  return Boolean(expectedPassword) && secureCompare(password, expectedPassword);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return readToken(cookieStore.get(adminSessionCookie)?.value);
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!process.env.ADMIN_PASSWORD) {
    return {
      ok: false as const,
      status: 503,
      message: "ADMIN_PASSWORD is not configured.",
    };
  }

  if (!session) {
    return {
      ok: false as const,
      status: 401,
      message: "Your admin session has expired. Sign in again.",
    };
  }

  return { ok: true as const, status: 200, message: "OK", session };
}

export async function createAdminSession() {
  const expiresAt = Date.now() + adminSessionDurationSeconds * 1000;
  const cookieStore = await cookies();

  cookieStore.set(adminSessionCookie, createToken(expiresAt), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: adminSessionDurationSeconds,
    expires: new Date(expiresAt),
    priority: "high",
  });

  return { expiresAt };
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(adminSessionCookie);
}
