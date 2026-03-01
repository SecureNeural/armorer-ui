export type FavoriteItemType = "agent" | "skill";

export interface Favorite {
  id: number;
  user_id: string;
  item_type: FavoriteItemType;
  item_slug: string;
  created_at: string;
}

