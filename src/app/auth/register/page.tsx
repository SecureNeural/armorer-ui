"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/components/auth-provider";

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;

    if (password !== confirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    const err = await signUp(
      formData.get("name") as string,
      formData.get("email") as string,
      password
    );

    setLoading(false);
    if (err) {
      setError(err);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Shield className="mx-auto mb-4 h-10 w-10 text-emerald-500" />
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="mt-1 text-sm text-zinc-400">Join Armorer to save and track your agents</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg border border-red-800 bg-red-950 p-3 text-sm text-red-400">{error}</div>
          )}
          <div>
            <label htmlFor="name" className="mb-1 block text-sm text-zinc-400">Name</label>
            <input id="name" name="name" type="text" required className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600" placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-zinc-400">Email</label>
            <input id="email" name="email" type="email" required className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600" placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm text-zinc-400">Password</label>
            <input id="password" name="password" type="password" required minLength={8} className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600" placeholder="••••••••" />
          </div>
          <div>
            <label htmlFor="confirm" className="mb-1 block text-sm text-zinc-400">Confirm Password</label>
            <input id="confirm" name="confirm" type="password" required minLength={8} className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 disabled:opacity-50">
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-emerald-400 hover:text-emerald-300">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
