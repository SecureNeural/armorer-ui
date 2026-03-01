import { clearSessionCookieHeader, deleteSession, json } from "../../_lib/auth.js";

export async function onRequestPost(context) {
  const db = context.env.DB;
  if (!db) return json({ error: "Missing D1 binding 'DB'" }, { status: 500 });
  await deleteSession(db, context.request);
  return json(
    { ok: true },
    { headers: { "set-cookie": clearSessionCookieHeader(context.request) } }
  );
}

