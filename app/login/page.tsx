"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Youtube, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) return setError("All fields required");
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push("/browse");
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
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
          <p className="text-sm text-ink-400">Sign in to your account</p>
        </div>

        <div className="card p-8 space-y-4">
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

          <div className="space-y-3">
            {error && <p className="text-xs text-red-400 text-center">{error}</p>}
            <input className="input" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button
              onClick={handleLogin}
              disabled={loading}
              className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading && <Loader2 size={14} className="animate-spin" />}
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
