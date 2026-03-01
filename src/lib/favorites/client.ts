import type { Favorite, FavoriteItemType } from "./types";

function toQuery(params: Record<string, string>) {
  return new URLSearchParams(params).toString();
}

export async function fetchFavorites(): Promise<Favorite[]> {
  const res = await fetch("/api/favorites", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load favorites");
  const data = (await res.json()) as { favorites?: Favorite[] };
  return data.favorites ?? [];
}

export async function fetchFavoriteState(
  itemType: FavoriteItemType,
  itemSlug: string
): Promise<boolean> {
  const res = await fetch(
    `/api/favorites?${toQuery({ itemType, itemSlug })}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to load favorite state");
  const data = (await res.json()) as { favorited?: boolean };
  return !!data.favorited;
}

export async function addFavorite(
  itemType: FavoriteItemType,
  itemSlug: string
) {
  const res = await fetch("/api/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemType, itemSlug }),
  });
  if (!res.ok) throw new Error("Failed to save favorite");
}

export async function removeFavorite(
  itemType: FavoriteItemType,
  itemSlug: string
) {
  const res = await fetch("/api/favorites", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemType, itemSlug }),
  });
  if (!res.ok) throw new Error("Failed to remove favorite");
}
