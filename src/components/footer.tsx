import Link from "next/link";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold">
              <Shield className="h-5 w-5 text-emerald-500" />
              <span>Armorer</span>
            </div>
            <p className="mt-3 text-sm text-zinc-500">
              The secure way to run AI agents. Install, sandbox, and monitor any agent with one
              command.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-300">Product</h3>
            <div className="flex flex-col gap-2">
              <Link href="/agents" className="text-sm text-zinc-500 hover:text-white">
                Agent Catalog
              </Link>
              <Link href="/skills" className="text-sm text-zinc-500 hover:text-white">
                Skill Armory
              </Link>
              <a
                href="https://github.com/SecureNeural/Armorer"
                className="text-sm text-zinc-500 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                CLI Tool
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-300">Resources</h3>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/SecureNeural/Armorer#readme"
                className="text-sm text-zinc-500 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentation
              </a>
              <a
                href="https://github.com/SecureNeural/Armorer"
                className="text-sm text-zinc-500 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-300">Quick Start</h3>
            <div className="rounded-lg bg-zinc-900 p-3 font-mono text-sm text-zinc-300">
              <p className="text-zinc-500">$ pip install armorer</p>
              <p>$ armorer install openclaw</p>
              <p>$ armorer run openclaw</p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-600">
          &copy; {new Date().getFullYear()} SecureNeural. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
