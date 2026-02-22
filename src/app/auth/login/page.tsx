"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/components/auth-provider";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const err = await signIn(
      formData.get("email") as string,
      formData.get("password") as string
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
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="mt-1 text-sm text-zinc-400">Sign in to your Armorer account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg border border-red-800 bg-red-950 p-3 text-sm text-red-400">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-zinc-400">Email</label>
            <input id="email" name="email" type="email" required className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600" placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm text-zinc-400">Password</label>
            <input id="password" name="password" type="password" required className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200 disabled:opacity-50">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-emerald-400 hover:text-emerald-300">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
