import Link from "next/link";
import { Download, Star } from "lucide-react";
import { SecurityBadge, RiskBadge, TagBadge } from "./tag-badge";
import type { Agent } from "@/lib/data/agents";

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link
      href={`/agents/${agent.slug}`}
      className="group block rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-zinc-700 hover:bg-zinc-900"
    >
      <div className="mb-3 flex items-start justify-between">
        <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400">
          {agent.name}
        </h3>
        <div className="flex items-center gap-2">
          <SecurityBadge status={agent.securityStatus} />
        </div>
      </div>

      <p className="mb-4 line-clamp-2 text-sm text-zinc-400">{agent.tagline}</p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {agent.tags.slice(0, 4).map((tag) => (
          <TagBadge key={tag} label={tag} />
        ))}
        {agent.tags.length > 4 && (
          <span className="text-xs text-zinc-600">+{agent.tags.length - 4}</span>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-zinc-800 pt-3 text-xs text-zinc-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Download className="h-3 w-3" /> {formatNumber(agent.pulls)}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3" /> {agent.stars}
          </span>
        </div>
        <RiskBadge level={agent.riskLevel} />
      </div>
    </Link>
  );
}
