"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { AgentCard } from "@/components/agent-card";
import { agents, agentCategories } from "@/lib/data/agents";

export default function AgentsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const results = agents.filter((a) => {
    const matchesCategory = category === "all" || a.category === category;
    if (!query) return matchesCategory;
    const q = query.toLowerCase();
    return (
      matchesCategory &&
      (a.name.toLowerCase().includes(q) ||
        a.tagline.toLowerCase().includes(q) ||
        a.tags.some((t) => t.includes(q)))
    );
  });

  const showFeaturedAlternatives = !query && category === "all";
  const featuredAlternatives = showFeaturedAlternatives
    ? agents.filter((a) => a.tags.includes("openclaw-alternative") && a.slug !== "openclaw")
    : [];
  const featuredSlugs = new Set(featuredAlternatives.map((a) => a.slug));
  const gridResults =
    showFeaturedAlternatives && featuredAlternatives.length > 0
      ? results.filter((a) => !featuredSlugs.has(a.slug))
      : results;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Agent Catalog</h1>
        <p className="mt-2 text-zinc-400">
          Browse {results.length} agents — every one sandboxed and monitored by Armorer
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search agents..."
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-300 outline-none transition-colors focus:border-emerald-600"
        >
          {agentCategories.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>

      {featuredAlternatives.length > 0 && (
        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-semibold">Popular OpenClaw Alternatives</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Product-style self-hosted alternatives with Docker support (not workflow frameworks)
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredAlternatives.map((agent) => (
              <AgentCard key={agent.slug} agent={agent} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gridResults.map((agent) => (
          <AgentCard key={agent.slug} agent={agent} />
        ))}
      </div>

      {gridResults.length === 0 && (
        <div className="mt-12 text-center text-zinc-500">
          <p className="text-lg">No agents found</p>
          <p className="mt-1 text-sm">Try a different search term or category</p>
        </div>
      )}
    </div>
  );
}
