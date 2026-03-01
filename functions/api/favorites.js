import { error as badRequest, getSessionUser, json } from "../_lib/auth.js";

function parseItemType(value) {
  return value === "agent" || value === "skill" ? value : null;
}

async function listFavorites(db, userId) {
  const { results } = await db
    .prepare(
      "SELECT id, user_id, item_type, item_slug, created_at FROM favorites WHERE user_id = ? ORDER BY created_at DESC"
    )
    .bind(userId)
    .all();
  return json({ favorites: results ?? [] });
}

async function getFavoriteState(db, userId, itemType, itemSlug) {
  const row = await db
    .prepare(
      "SELECT id FROM favorites WHERE user_id = ? AND item_type = ? AND item_slug = ? LIMIT 1"
    )
    .bind(userId, itemType, itemSlug)
    .first();
  return json({ favorited: !!row });
}

export async function onRequest(context) {
  const db = context.env.DB;
  if (!db) return json({ error: "Missing D1 binding 'DB'" }, { status: 500 });

  const request = context.request;
  const method = request.method.toUpperCase();
  const sessionUser = await getSessionUser(db, request);
  if (!sessionUser) return json({ error: "Unauthorized" }, { status: 401 });
  const userId = sessionUser.id;

  if (method === "GET") {
    const url = new URL(request.url);
    const itemType = url.searchParams.get("itemType");
    const itemSlug = url.searchParams.get("itemSlug");
    if (itemType || itemSlug) {
      const parsedType = parseItemType(itemType);
      if (!parsedType || !itemSlug) return badRequest("Invalid favorite lookup params");
      return getFavoriteState(db, userId, parsedType, itemSlug);
    }

    return listFavorites(db, userId);
  }

  if (method === "POST" || method === "DELETE") {
    let body;
    try {
      body = await request.json();
    } catch {
      return badRequest("Invalid JSON body");
    }

    const itemSlug = typeof body?.itemSlug === "string" ? body.itemSlug : "";
    const itemType = parseItemType(body?.itemType);

    if (!itemSlug || !itemType) {
      return badRequest("Missing or invalid favorite payload");
    }

    if (method === "POST") {
      await db
        .prepare(
          "INSERT OR IGNORE INTO favorites (user_id, item_type, item_slug) VALUES (?, ?, ?)"
        )
        .bind(userId, itemType, itemSlug)
        .run();
      return json({ ok: true });
    }

    await db
      .prepare("DELETE FROM favorites WHERE user_id = ? AND item_type = ? AND item_slug = ?")
      .bind(userId, itemType, itemSlug)
      .run();
    return json({ ok: true });
  }

  return json({ error: "Method not allowed" }, { status: 405 });
}
