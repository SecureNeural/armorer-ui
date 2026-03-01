const SESSION_COOKIE = "armorer_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;

function encoder() {
  return new TextEncoder();
}

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function toBase64(bytes) {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

function fromBase64(base64) {
  const binary = atob(base64);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

export async function sha256Hex(input) {
  const digest = await crypto.subtle.digest("SHA-256", encoder().encode(input));
  return toHex(digest);
}

export async function hashPassword(password, saltBase64) {
  const salt = saltBase64 ? fromBase64(saltBase64) : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey(
    "raw",
    encoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: 120000 },
    key,
    256
  );

  return { salt: toBase64(salt), hash: toHex(bits) };
}

export async function verifyPassword(password, saltBase64, expectedHash) {
  const { hash } = await hashPassword(password, saltBase64);
  return hash === expectedHash;
}

export function parseCookies(request) {
  const raw = request.headers.get("cookie") ?? "";
  const cookies = {};
  for (const part of raw.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (!name) continue;
    cookies[name] = decodeURIComponent(rest.join("="));
  }
  return cookies;
}

function isSecureRequest(request) {
  const proto = request.headers.get("x-forwarded-proto");
  if (proto) return proto === "https";
  return new URL(request.url).protocol === "https:";
}

export function sessionCookieHeader(token, request) {
  const parts = [
    `${SESSION_COOKIE}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${SESSION_TTL_SECONDS}`,
  ];
  if (isSecureRequest(request)) parts.push("Secure");
  return parts.join("; ");
}

export function clearSessionCookieHeader(request) {
  const parts = [
    `${SESSION_COOKIE}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0",
  ];
  if (isSecureRequest(request)) parts.push("Secure");
  return parts.join("; ");
}

export async function createSession(db, userId, request) {
  const token = `${crypto.randomUUID()}${crypto.randomUUID().replaceAll("-", "")}`;
  const tokenHash = await sha256Hex(token);
  const expiresAt = new Date(Date.now() + SESSION_TTL_SECONDS * 1000).toISOString();
  await db
    .prepare("INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)")
    .bind(tokenHash, userId, expiresAt)
    .run();
  return sessionCookieHeader(token, request);
}

export async function getSessionUser(db, request) {
  const token = parseCookies(request)[SESSION_COOKIE];
  if (!token) return null;

  const tokenHash = await sha256Hex(token);
  const row = await db
    .prepare(
      `SELECT u.id, u.email, u.name
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token_hash = ?
         AND datetime(s.expires_at) > datetime('now')
       LIMIT 1`
    )
    .bind(tokenHash)
    .first();

  if (!row) return null;
  return { id: row.id, email: row.email, user_metadata: { name: row.name } };
}

export async function deleteSession(db, request) {
  const token = parseCookies(request)[SESSION_COOKIE];
  if (!token) return;
  const tokenHash = await sha256Hex(token);
  await db.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(tokenHash).run();
}

export function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    status: init.status ?? 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...(init.headers ?? {}),
    },
  });
}

export function error(message, status = 400) {
  return json({ error: message }, { status });
}

