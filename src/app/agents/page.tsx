import { Suspense } from "react";
import { SearchBar } from "@/components/search-bar";
import { AgentCard } from "@/components/agent-card";
import { searchAgents, agentCategories } from "@/lib/data/agents";

interface Props {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export const metadata = {
  title: "Agent Catalog — Armorer",
  description: "Browse and install secure AI agents. Every agent is sandboxed, monitored, and hardened by Armorer.",
};

export default async function AgentsPage({ searchParams }: Props) {
  const params = await searchParams;
  const results = searchAgents(params.q || "", params.category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Agent Catalog</h1>
        <p className="mt-2 text-zinc-400">
          Browse {results.length} agents — every one sandboxed and monitored by Armorer
        </p>
      </div>

      <Suspense>
        <SearchBar
          placeholder="Search agents..."
          basePath="/agents"
          categories={agentCategories}
        />
      </Suspense>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((agent) => (
          <AgentCard key={agent.slug} agent={agent} />
        ))}
      </div>

      {results.length === 0 && (
        <div className="mt-12 text-center text-zinc-500">
          <p className="text-lg">No agents found</p>
          <p className="mt-1 text-sm">Try a different search term or category</p>
        </div>
      )}
    </div>
  );
}
