import { getSessionUser, json } from "../../_lib/auth.js";

export async function onRequest(context) {
  const db = context.env.DB;
  if (!db) return json({ error: "Missing D1 binding 'DB'" }, { status: 500 });
  const user = await getSessionUser(db, context.request);
  return json({ user });
}

