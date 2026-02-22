"use client";

import { Heart } from "lucide-react";
import { useState, useTransition } from "react";

interface FavoriteButtonProps {
  itemType: "agent" | "skill";
  itemSlug: string;
  initialFavorited: boolean;
  isLoggedIn: boolean;
}

export function FavoriteButton({
  itemType,
  itemSlug,
  initialFavorited,
  isLoggedIn,
}: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [isPending, startTransition] = useTransition();

  if (!isLoggedIn) return null;

  const toggle = () => {
    startTransition(async () => {
      const res = await fetch("/api/favorites", {
        method: favorited ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemType, itemSlug }),
      });
      if (res.ok) setFavorited(!favorited);
    });
  };

  return (
    <button
      onClick={toggle}
      disabled={isPending}
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
