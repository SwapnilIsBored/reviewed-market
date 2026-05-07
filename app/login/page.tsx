"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { Youtube } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="text-2xl font-medium text-ink-50 mb-2">
            reviewed<span className="text-accent">.market</span>
          </p>
          <p className="text-sm text-ink-400">Sign in to buy or sell gear</p>
        </div>

        <div className="card p-8 space-y-4">
          {/* Google/YouTube OAuth */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-ink-600 bg-ink-700 text-sm text-ink-100 hover:bg-ink-600 transition-colors"
          >
            <Youtube size={16} className="text-red-500" />
            Continue with Google (Creator)
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-ink-700" />
            <span className="text-xs text-ink-600">or</span>
            <div className="flex-1 h-px bg-ink-700" />
          </div>

          {/* Email login */}
          <div className="space-y-3">
            <input className="input" type="email" placeholder="Email address" />
            <input className="input" type="password" placeholder="Password" />
            <button className="btn-primary w-full py-3 text-sm">
              Sign in
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-ink-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-accent hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
