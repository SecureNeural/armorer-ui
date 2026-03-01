"use client";

import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "./auth-provider";
import {
  addFavorite,
  fetchFavoriteState,
  removeFavorite,
} from "@/lib/favorites/client";

interface FavoriteButtonProps {
  itemType: "agent" | "skill";
  itemSlug: string;
}

export function FavoriteButton({ itemType, itemSlug }: FavoriteButtonProps) {
  const { user } = useAuth();
  const [favorited, setFavorited] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchFavoriteState(itemType, itemSlug)
      .then((nextState) => setFavorited(nextState))
      .catch(() => setFavorited(false))
      .finally(() => setLoading(false));
  }, [user, itemType, itemSlug]);

  if (!user) return null;
  if (loading) return <div className="h-9 w-16 animate-pulse rounded-lg bg-zinc-800" />;

  const toggle = async () => {
    if (!user) return;
    if (favorited) {
      await removeFavorite(itemType, itemSlug);
      setFavorited(false);
      return;
    }
    await addFavorite(itemType, itemSlug);
    setFavorited(true);
  };

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-colors ${
        favorited
          ? "border-red-800 bg-red-950 text-red-400"
          : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-white"
      }`}
    >
      <Heart className={`h-4 w-4 ${favorited ? "fill-current" : ""}`} />
      {favorited ? "Saved" : "Save"}
    </button>
  );
}
