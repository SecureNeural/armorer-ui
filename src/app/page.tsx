import Link from "next/link";
import { Shield, Lock, Eye, Wrench, ArrowRight, Terminal } from "lucide-react";
import { AgentCard } from "@/components/agent-card";
import { SkillCard } from "@/components/skill-card";
import { InstallCommand } from "@/components/install-command";
import { agents } from "@/lib/data/agents";
import { skills } from "@/lib/data/skills";

const featuredAgents = agents.slice(0, 6);
const featuredSkills = skills.slice(0, 4);

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-24 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-800 bg-emerald-950/50 px-4 py-1.5 text-sm text-emerald-400">
            <Shield className="h-4 w-4" />
            The Ollama for AI Agents
          </div>
          <h1 className="mx-auto max-w-3xl text-balance text-5xl font-bold tracking-tight md:text-6xl">
            Run any agent.
            <br />
            <span className="text-emerald-400">Securely.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Browse, install, and run AI agents with built-in security. One command to sandbox,
            monitor, and manage credentials — so you can focus on building, not worrying.
          </p>
          <div className="mx-auto mt-8 max-w-lg">
            <InstallCommand command="armorer install openclaw" />
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link
              href="/agents"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
            >
              Explore Agents <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://github.com/SecureNeural/Armorer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
            >
              <Terminal className="h-4 w-4" /> View CLI
            </a>
          </div>
        </div>
      </section>

      {/* Terminal Demo */}
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mx-auto max-w-2xl rounded-xl border border-zinc-800 bg-black p-6 font-mono text-sm shadow-2xl">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-zinc-600">Terminal</span>
            </div>
            <div className="space-y-1 text-zinc-300">
              <p>
                <span className="text-emerald-400">$</span> armorer install openclaw
              </p>
              <p className="text-zinc-600">
                [Armorer] Scanning repository for security risks...
              </p>
              <p className="text-zinc-600">
                [Armorer] Running AI Security Interview...
              </p>
              <p className="text-amber-400">
                [!] High-risk flags: Docker socket mount, privileged mode
              </p>
              <p className="text-zinc-600">
                [Armorer] Applying SANDBOXED risk profile
              </p>
              <p className="text-zinc-600">
                [Armorer] Injecting credentials from Vault...
              </p>
              <p className="text-emerald-400">
                [OK] OpenClaw installed and hardened successfully
              </p>
              <p className="mt-2">
                <span className="text-emerald-400">$</span> armorer run openclaw
              </p>
              <p className="text-emerald-400">
                [Armorer] Starting with real-time oversight enabled
              </p>
              <p className="text-zinc-500 animate-pulse">█</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-zinc-800">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="mb-4 text-center text-3xl font-bold">Security built in, not bolted on</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-zinc-400">
            Every agent runs through Armorer&apos;s multi-layered security pipeline. No exceptions.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-950">
                <Lock className="h-5 w-5 text-emerald-500" />
              </div>
              <h3 className="mb-2 font-semibold">Credential Vault</h3>
              <p className="text-sm text-zinc-400">
                API keys stored in your OS keyring. Never in .env files, never in Docker inspect.
                Enter once, use everywhere.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-950">
                <Eye className="h-5 w-5 text-emerald-500" />
              </div>
              <h3 className="mb-2 font-semibold">Real-time Oversight</h3>
              <p className="text-sm text-zinc-400">
                The Superior Observer monitors every agent action. Leaked secrets are redacted
                before the agent can read them back.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-950">
                <Wrench className="h-5 w-5 text-emerald-500" />
              </div>
              <h3 className="mb-2 font-semibold">Skill Armory</h3>
              <p className="text-sm text-zinc-400">
                Verified MCP skills you can inject into any agent. Define once, use everywhere. No
                manual JSON editing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Agents */}
      <section className="border-b border-zinc-800">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Popular Agents</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Secure-by-default agents, ready to install
              </p>
            </div>
            <Link
              href="/agents"
              className="flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredAgents.map((agent) => (
              <AgentCard key={agent.slug} agent={agent} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="border-b border-zinc-800">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Skill Armory</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Security-verified MCP skills for your agents
              </p>
            </div>
            <Link
              href="/skills"
              className="flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredSkills.map((skill) => (
              <SkillCard key={skill.slug} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h2 className="text-3xl font-bold">Ready to secure your agents?</h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Get started in seconds. Install the CLI, pick an agent, and let Armorer handle the
            security.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <InstallCommand command="pip install armorer" />
          </div>
          <div className="mt-6">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
            >
              Create Account <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
