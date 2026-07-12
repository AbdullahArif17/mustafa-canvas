import {
  clearAdminSession,
  createAdminSession,
  verifyAdminPassword,
} from "../../../lib/admin-session";

export const dynamic = "force-dynamic";

const maxAttempts = 5;
const attemptWindowMs = 15 * 60 * 1000;
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function clientId(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(id: string) {
  const attempt = loginAttempts.get(id);

  if (!attempt || attempt.resetAt <= Date.now()) {
    loginAttempts.delete(id);
    return false;
  }

  return attempt.count >= maxAttempts;
}

function recordFailure(id: string) {
  const now = Date.now();
  const attempt = loginAttempts.get(id);

  if (!attempt || attempt.resetAt <= now) {
    loginAttempts.set(id, { count: 1, resetAt: now + attemptWindowMs });
    return;
  }

  attempt.count += 1;
}

export async function POST(request: Request) {
  const id = clientId(request);

  if (isRateLimited(id)) {
    return Response.json(
      { error: "Too many login attempts. Try again later." },
      { status: 429, headers: { "Cache-Control": "no-store" } }
    );
  }

  const payload = (await request.json().catch(() => null)) as {
    password?: unknown;
  } | null;
  const password =
    typeof payload?.password === "string" ? payload.password : "";

  if (!verifyAdminPassword(password)) {
    recordFailure(id);
    return Response.json(
      { error: "Invalid password." },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  loginAttempts.delete(id);
  const session = await createAdminSession();

  return Response.json(session, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function DELETE() {
  await clearAdminSession();
  return Response.json(
    { ok: true },
    { headers: { "Cache-Control": "no-store" } }
  );
}
