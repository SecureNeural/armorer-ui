import { createSession, error, json, verifyPassword } from "../../_lib/auth.js";

export async function onRequestPost(context) {
  const db = context.env.DB;
  if (!db) return json({ error: "Missing D1 binding 'DB'" }, { status: 500 });

  let body;
  try {
    body = await context.request.json();
  } catch {
    return error("Invalid JSON body");
  }

  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  if (!email || !password) return error("Email and password are required");

  const user = await db
    .prepare(
      "SELECT id, email, name, password_hash, password_salt FROM users WHERE email = ? LIMIT 1"
    )
    .bind(email)
    .first();
  if (!user) return error("Invalid email or password", 401);

  const ok = await verifyPassword(password, user.password_salt, user.password_hash);
  if (!ok) return error("Invalid email or password", 401);

  const setCookie = await createSession(db, user.id, context.request);
  return json(
    { user: { id: user.id, email: user.email, user_metadata: { name: user.name } } },
    { headers: { "set-cookie": setCookie } }
  );
}

