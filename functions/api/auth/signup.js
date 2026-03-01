import { createSession, error, hashPassword, json } from "../../_lib/auth.js";

export async function onRequestPost(context) {
  const db = context.env.DB;
  if (!db) return json({ error: "Missing D1 binding 'DB'" }, { status: 500 });

  let body;
  try {
    body = await context.request.json();
  } catch {
    return error("Invalid JSON body");
  }

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!name) return error("Name is required");
  if (!email || !email.includes("@")) return error("Valid email is required");
  if (password.length < 8) return error("Password must be at least 8 characters");

  const exists = await db.prepare("SELECT id FROM users WHERE email = ? LIMIT 1").bind(email).first();
  if (exists) return error("An account with this email already exists", 409);

  const { salt, hash } = await hashPassword(password);
  const userId = crypto.randomUUID();
  await db
    .prepare(
      "INSERT INTO users (id, email, name, password_hash, password_salt) VALUES (?, ?, ?, ?, ?)"
    )
    .bind(userId, email, name, hash, salt)
    .run();

  const setCookie = await createSession(db, userId, context.request);
  return json(
    { user: { id: userId, email, user_metadata: { name } } },
    { headers: { "set-cookie": setCookie } }
  );
}

