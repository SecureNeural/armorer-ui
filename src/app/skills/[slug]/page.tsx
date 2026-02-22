import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Box } from "lucide-react";
import { getSkill, skills } from "@/lib/data/skills";
import { getAgent } from "@/lib/data/agents";
import { InstallCommand } from "@/components/install-command";
import { TagBadge } from "@/components/tag-badge";
import { FavoriteButton } from "@/components/favorite-button";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { favorites } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return skills.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) return { title: "Skill Not Found — Armorer" };
  return {
    title: `${skill.name} — Skill Armory — Armorer`,
    description: skill.tagline,
  };
}

export default async function SkillDetailPage({ params }: Props) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();

  const user = await getSession();
  let isFavorited = false;
  if (user) {
    const fav = db
      .select()
      .from(favorites)
      .where(
        and(
          eq(favorites.userId, user.id),
          eq(favorites.itemType, "skill"),
          eq(favorites.itemSlug, slug)
        )
      )
      .get();
    isFavorited = !!fav;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Link
        href="/skills"
        className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Skills
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-6 flex flex-wrap items-start gap-3">
            <h1 className="text-3xl font-bold">{skill.name}</h1>
            {skill.verified && (
              <span className="flex items-center gap-1 rounded-full bg-emerald-950 px-3 py-1 text-sm font-medium text-emerald-400">
                <ShieldCheck className="h-4 w-4" /> Verified
              </span>
            )}
          </div>

          <p className="mb-6 text-lg text-zinc-400">{skill.tagline}</p>

          <div className="mb-6 flex flex-wrap gap-1.5">
            {skill.tags.map((tag) => (
              <TagBadge key={tag} label={tag} />
            ))}
          </div>

          {/* Inject command */}
          <div className="mb-8 space-y-3">
            <h2 className="text-lg font-semibold">Quick Inject</h2>
            <InstallCommand command={skill.injectExample} />
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="mb-3 text-lg font-semibold">About</h2>
            <p className="leading-relaxed text-zinc-400">{skill.description}</p>
          </div>

          {/* Configuration */}
          <div className="mb-8">
            <h2 className="mb-3 text-lg font-semibold">MCP Configuration</h2>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 font-mono text-sm">
              <pre className="overflow-x-auto text-zinc-300">
                {JSON.stringify(
                  {
                    command: skill.command,
                    args: skill.args,
                    ...(skill.env ? { env: skill.env } : {}),
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>

          {skill.env && (
            <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h2 className="mb-3 text-lg font-semibold">Required Credentials</h2>
              <p className="mb-3 text-sm text-zinc-400">
                These credentials are managed securely through the Armorer Credential Vault.
              </p>
              <div className="space-y-2">
                {Object.keys(skill.env).map((key) => (
                  <div
                    key={key}
                    className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-sm text-zinc-300"
                  >
                    <Box className="h-4 w-4 text-emerald-500" />
                    {key}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <FavoriteButton
              itemType="skill"
              itemSlug={slug}
              initialFavorited={isFavorited}
              isLoggedIn={!!user}
            />
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h3 className="mb-3 font-semibold">Compatible Agents</h3>
            <div className="space-y-2">
              {skill.compatibleAgents.map((agentSlug) => {
                const agent = getAgent(agentSlug);
                if (!agent) return null;
                return (
                  <Link
                    key={agentSlug}
                    href={`/agents/${agentSlug}`}
                    className="block rounded-lg border border-zinc-800 p-3 text-sm transition-colors hover:border-zinc-700"
                  >
                    <span className="font-medium text-white">{agent.name}</span>
                    <p className="mt-0.5 text-xs text-zinc-500">{agent.tagline}</p>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h3 className="mb-3 font-semibold">Details</h3>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-zinc-500">Category</dt>
                <dd className="capitalize text-zinc-300">{skill.category}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Installs</dt>
                <dd className="text-zinc-300">{skill.pulls.toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Updated</dt>
                <dd className="text-zinc-300">{skill.updatedAt}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
