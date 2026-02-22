import { Suspense } from "react";
import { SearchBar } from "@/components/search-bar";
import { SkillCard } from "@/components/skill-card";
import { searchSkills, skillCategories } from "@/lib/data/skills";

interface Props {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export const metadata = {
  title: "Skill Armory — Armorer",
  description:
    "Browse security-verified MCP skills. Inject any skill into any agent with one command.",
};

export default async function SkillsPage({ searchParams }: Props) {
  const params = await searchParams;
  const results = searchSkills(params.q || "", params.category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Skill Armory</h1>
        <p className="mt-2 text-zinc-400">
          {results.length} security-verified MCP skills — inject into any agent with one command
        </p>
      </div>

      <Suspense>
        <SearchBar
          placeholder="Search skills..."
          basePath="/skills"
          categories={skillCategories}
        />
      </Suspense>

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
