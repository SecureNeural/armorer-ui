"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { SkillCard } from "@/components/skill-card";
import { skills, skillCategories } from "@/lib/data/skills";

export default function SkillsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const results = skills.filter((s) => {
    const matchesCategory = category === "all" || s.category === category;
    if (!query) return matchesCategory;
    const q = query.toLowerCase();
    return (
      matchesCategory &&
      (s.name.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.tags.some((t) => t.includes(q)))
    );
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Skill Armory</h1>
        <p className="mt-2 text-zinc-400">
          {results.length} security-verified MCP skills — inject into any agent with one command
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills..."
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-300 outline-none transition-colors focus:border-emerald-600"
        >
          {skillCategories.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((skill) => (
          <SkillCard key={skill.slug} skill={skill} />
        ))}
      </div>

      {results.length === 0 && (
        <div className="mt-12 text-center text-zinc-500">
          <p className="text-lg">No skills found</p>
          <p className="mt-1 text-sm">Try a different search term or category</p>
        </div>
      )}
    </div>
  );
}
