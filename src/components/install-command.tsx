"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface InstallCommandProps {
  command: string;
  className?: string;
}

export function InstallCommand({ command, className = "" }: InstallCommandProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`group flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 font-mono text-sm ${className}`}
    >
      <span className="text-zinc-300">
        <span className="mr-2 text-zinc-600">$</span>
        {command}
      </span>
      <button
        onClick={handleCopy}
        className="ml-3 shrink-0 text-zinc-600 transition-colors hover:text-white"
        aria-label="Copy command"
      >
        {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
