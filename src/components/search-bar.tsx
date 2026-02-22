"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  basePath: string;
  categories?: { value: string; label: string }[];
}

export function SearchBar({
  placeholder = "Search...",
  basePath,
  categories,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const currentCategory = searchParams.get("category") || "all";

  const updateSearch = useCallback(
    (q: string, cat: string) => {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (cat && cat !== "all") params.set("category", cat);
      router.push(`${basePath}${params.toString() ? `?${params}` : ""}`);
    },
    [router, basePath]
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            updateSearch(e.target.value, currentCategory);
          }}
          placeholder={placeholder}
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
        />
      </div>
      {categories && (
        <select
          value={currentCategory}
          onChange={(e) => updateSearch(query, e.target.value)}
          className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-300 outline-none transition-colors focus:border-emerald-600"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
