import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { favorites } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";

export async function POST(req: Request) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { itemType, itemSlug } = await req.json();
  if (!itemType || !itemSlug) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existing = db
    .select()
    .from(favorites)
    .where(
      and(
        eq(favorites.userId, user.id),
        eq(favorites.itemType, itemType),
        eq(favorites.itemSlug, itemSlug)
      )
    )
    .get();

  if (existing) {
    return NextResponse.json({ success: true, favorited: true });
  }

  db.insert(favorites).values({ userId: user.id, itemType, itemSlug }).run();
  return NextResponse.json({ success: true, favorited: true });
}

export async function DELETE(req: Request) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { itemType, itemSlug } = await req.json();
  if (!itemType || !itemSlug) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  db.delete(favorites)
    .where(
      and(
        eq(favorites.userId, user.id),
        eq(favorites.itemType, itemType),
        eq(favorites.itemSlug, itemSlug)
      )
    )
    .run();

  return NextResponse.json({ success: true, favorited: false });
}
