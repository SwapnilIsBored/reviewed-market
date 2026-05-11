"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Youtube, ShoppingBag, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("buyer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) return setError("All fields required");
    if (password.length < 8) return setError("Password must be at least 8 characters");
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name, role } },
      });
      if (error) throw error;
      router.push("/browse");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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
                Sign in with Google to verify your YouTube channel.
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
              {error && <p className="text-xs text-red-400 text-center">{error}</p>}
              <input className="input" type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
              <input className="input" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className="input" type="password" placeholder="Password (min 8 chars)" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button
                onClick={handleSignup}
                disabled={loading}
                className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading && <Loader2 size={14} className="animate-spin" />}
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
