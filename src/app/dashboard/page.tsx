import { redirect } from "next/navigation";
import Link from "next/link";
import { Heart, Shield, Wrench, ArrowRight } from "lucide-react";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { favorites } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getAgent } from "@/lib/data/agents";
import { getSkill } from "@/lib/data/skills";

export const metadata = {
  title: "Dashboard — Armorer",
};

export default async function DashboardPage() {
  const user = await getSession();
  if (!user) redirect("/auth/login");

  const userFavorites = await db
    .select()
    .from(favorites)
    .where(eq(favorites.userId, user.id));

  const savedAgents = userFavorites
    .filter((f) => f.itemType === "agent")
    .map((f) => ({ ...f, item: getAgent(f.itemSlug) }))
    .filter((f) => f.item);

  const savedSkills = userFavorites
    .filter((f) => f.itemType === "skill")
    .map((f) => ({ ...f, item: getSkill(f.itemSlug) }))
    .filter((f) => f.item);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-zinc-400">Welcome back, {user.name}</p>
      </div>

      {/* Quick Start */}
      <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="mb-4 text-lg font-semibold">Quick Start</h2>
        <div className="rounded-lg bg-black p-4 font-mono text-sm text-zinc-300">
          <p>
            <span className="text-zinc-600">$</span> pip install armorer
          </p>
          <p>
            <span className="text-zinc-600">$</span> armorer install openclaw
          </p>
          <p>
            <span className="text-zinc-600">$</span> armorer run openclaw
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Saved Agents */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Shield className="h-5 w-5 text-emerald-500" /> Saved Agents
            </h2>
            <Link
              href="/agents"
              className="flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300"
            >
              Browse <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          {savedAgents.length > 0 ? (
            <div className="space-y-2">
              {savedAgents.map((f) => (
                <Link
                  key={f.itemSlug}
                  href={`/agents/${f.itemSlug}`}
                  className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:border-zinc-700"
                >
                  <Heart className="h-4 w-4 shrink-0 fill-red-500 text-red-500" />
                  <div>
                    <p className="font-medium">{f.item!.name}</p>
                    <p className="text-sm text-zinc-500">{f.item!.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-zinc-800 p-8 text-center text-sm text-zinc-500">
              No saved agents yet.{" "}
              <Link href="/agents" className="text-emerald-400 hover:underline">
                Browse the catalog
              </Link>
            </div>
          )}
        </div>

        {/* Saved Skills */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Wrench className="h-5 w-5 text-emerald-500" /> Saved Skills
            </h2>
            <Link
              href="/skills"
              className="flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300"
            >
              Browse <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          {savedSkills.length > 0 ? (
            <div className="space-y-2">
              {savedSkills.map((f) => (
                <Link
                  key={f.itemSlug}
                  href={`/skills/${f.itemSlug}`}
                  className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:border-zinc-700"
                >
                  <Heart className="h-4 w-4 shrink-0 fill-red-500 text-red-500" />
                  <div>
                    <p className="font-medium">{f.item!.name}</p>
                    <p className="text-sm text-zinc-500">{f.item!.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-zinc-800 p-8 text-center text-sm text-zinc-500">
              No saved skills yet.{" "}
              <Link href="/skills" className="text-emerald-400 hover:underline">
                Browse the armory
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
