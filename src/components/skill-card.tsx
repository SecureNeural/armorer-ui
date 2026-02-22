import Link from "next/link";
import { Download, ShieldCheck } from "lucide-react";
import { TagBadge } from "./tag-badge";
import type { Skill } from "@/lib/data/skills";

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <Link
      href={`/skills/${skill.slug}`}
      className="group block rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-zinc-700 hover:bg-zinc-900"
    >
      <div className="mb-3 flex items-start justify-between">
        <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400">
          {skill.name}
        </h3>
        {skill.verified && (
          <span className="flex items-center gap-1 rounded-full bg-emerald-950 px-2 py-0.5 text-xs font-medium text-emerald-400">
            <ShieldCheck className="h-3 w-3" /> Verified
          </span>
        )}
      </div>

      <p className="mb-4 line-clamp-2 text-sm text-zinc-400">{skill.tagline}</p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {skill.tags.slice(0, 4).map((tag) => (
          <TagBadge key={tag} label={tag} />
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-zinc-800 pt-3 text-xs text-zinc-500">
        <span className="flex items-center gap-1">
          <Download className="h-3 w-3" /> {formatNumber(skill.pulls)}
        </span>
        <span className="capitalize">{skill.category}</span>
      </div>
    </Link>
  );
}
