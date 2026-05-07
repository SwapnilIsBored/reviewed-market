"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Youtube, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types";

export default function SignupPage() {
  const [role, setRole] = useState<UserRole>("buyer");

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="text-2xl font-medium text-ink-50 mb-2">
            reviewed<span className="text-accent">.market</span>
          </p>
          <p className="text-sm text-ink-400">Create your account</p>
        </div>

        <div className="card p-8">
          {/* Role toggle */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <button
              onClick={() => setRole("buyer")}
              className={cn(
                "flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs transition-all",
                role === "buyer"
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-ink-700 text-ink-400 hover:border-ink-500"
              )}
            >
              <ShoppingBag size={16} />
              I want to buy
            </button>
            <button
              onClick={() => setRole("creator")}
              className={cn(
                "flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs transition-all",
                role === "creator"
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-ink-700 text-ink-400 hover:border-ink-500"
              )}
            >
              <Youtube size={16} />
              I&apos;m a creator
            </button>
          </div>

          {role === "creator" ? (
            <div className="space-y-4">
              <p className="text-xs text-ink-400 text-center leading-relaxed">
                Sign in with Google to verify your YouTube channel. Only verified channels can list gear.
              </p>
              <button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-ink-700 border border-ink-600 text-sm text-ink-100 hover:bg-ink-600 transition-colors"
              >
                <Youtube size={16} className="text-red-500" />
                Connect YouTube channel
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <input className="input" type="text" placeholder="Full name" />
              <input className="input" type="email" placeholder="Email address" />
              <input className="input" type="password" placeholder="Password (min 8 chars)" />
              <button className="btn-primary w-full py-3 text-sm">
                Create account
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-ink-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-accent hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
