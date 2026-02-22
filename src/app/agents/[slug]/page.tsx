import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Download,
  Star,
  ShieldCheck,
  AlertTriangle,
  Box,
} from "lucide-react";
import { getAgent, agents } from "@/lib/data/agents";
import { skills } from "@/lib/data/skills";
import { InstallCommand } from "@/components/install-command";
import { SecurityBadge, RiskBadge, TagBadge } from "@/components/tag-badge";
import { FavoriteButton } from "@/components/favorite-button";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { favorites } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return agents.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) return { title: "Agent Not Found — Armorer" };
  return {
    title: `${agent.name} — Armorer`,
    description: agent.tagline,
  };
}

export default async function AgentDetailPage({ params }: Props) {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) notFound();

  const user = await getSession();
  let isFavorited = false;
  if (user) {
    const fav = db
      .select()
      .from(favorites)
      .where(
        and(
          eq(favorites.userId, user.id),
          eq(favorites.itemType, "agent"),
          eq(favorites.itemSlug, slug)
        )
      )
      .get();
    isFavorited = !!fav;
  }

  const compatibleSkills = skills.filter((s) => s.compatibleAgents.includes(agent.slug));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Link
        href="/agents"
        className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Agents
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="mb-6 flex flex-wrap items-start gap-3">
            <h1 className="text-3xl font-bold">{agent.name}</h1>
            <SecurityBadge status={agent.securityStatus} />
            <RiskBadge level={agent.riskLevel} />
          </div>

          <p className="mb-6 text-lg text-zinc-400">{agent.tagline}</p>

          <div className="mb-6 flex flex-wrap gap-1.5">
            {agent.tags.map((tag) => (
              <TagBadge key={tag} label={tag} />
            ))}
          </div>

          <div className="mb-8 flex items-center gap-4 text-sm text-zinc-500">
            <span className="flex items-center gap-1">
              <Download className="h-4 w-4" /> {agent.pulls.toLocaleString()} installs
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4" /> {agent.stars} stars
            </span>
            <span>Updated {agent.updatedAt}</span>
          </div>

          {/* Install commands */}
          <div className="mb-8 space-y-3">
            <h2 className="text-lg font-semibold">Installation</h2>
            <InstallCommand command={agent.installCommand} />
            <InstallCommand command={agent.runCommand} />
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="mb-3 text-lg font-semibold">About</h2>
            <p className="leading-relaxed text-zinc-400">{agent.description}</p>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h2 className="mb-3 text-lg font-semibold">Features</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {agent.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-zinc-400"
                >
                  <Box className="h-4 w-4 shrink-0 text-emerald-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Security */}
          <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <ShieldCheck className="h-5 w-5 text-emerald-500" /> Security Assessment
            </h2>
            <p className="text-sm leading-relaxed text-zinc-400">{agent.securityNotes}</p>
            {agent.riskLevel === "high" || agent.riskLevel === "critical" ? (
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-800 bg-amber-950/50 p-3 text-sm text-amber-400">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                This agent has elevated risk. Armorer enforces strict sandboxing, command
                allow-lists, and real-time monitoring.
              </div>
            ) : null}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <div className="space-y-3">
              <FavoriteButton
                itemType="agent"
                itemSlug={slug}
                initialFavorited={isFavorited}
                isLoggedIn={!!user}
              />
              {agent.repoUrl && (
                <a
                  href={agent.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 py-2 text-sm text-zinc-300 transition-colors hover:text-white"
                >
                  <ExternalLink className="h-4 w-4" /> View Source
                </a>
              )}
            </div>
          </div>

          {compatibleSkills.length > 0 && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <h3 className="mb-3 font-semibold">Compatible Skills</h3>
              <div className="space-y-2">
                {compatibleSkills.map((skill) => (
                  <Link
                    key={skill.slug}
                    href={`/skills/${skill.slug}`}
                    className="block rounded-lg border border-zinc-800 p-3 text-sm transition-colors hover:border-zinc-700"
                  >
                    <span className="font-medium text-white">{skill.name}</span>
                    <p className="mt-0.5 text-xs text-zinc-500">{skill.tagline}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
