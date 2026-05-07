"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search, Plus } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-ink-800 bg-ink-900/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 shrink-0">
          <span className="text-base font-medium text-ink-50 tracking-tight">
            reviewed
          </span>
          <span className="text-accent font-medium text-base">.market</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/browse"
            className={cn(
              "text-ink-400 hover:text-ink-100 transition-colors",
              pathname === "/browse" && "text-ink-50"
            )}
          >
            Browse
          </Link>
          <Link
            href="/browse?tab=creators"
            className="text-ink-400 hover:text-ink-100 transition-colors"
          >
            Creators
          </Link>
          <Link
            href="/how-it-works"
            className="text-ink-400 hover:text-ink-100 transition-colors"
          >
            How it works
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link href="/browse" className="text-ink-400 hover:text-ink-100 transition-colors">
            <Search size={16} />
          </Link>
          <Link href="/login" className="btn-ghost text-xs px-4 py-2 hidden sm:block">
            Log in
          </Link>
          <Link href="/dashboard/new" className="btn-primary flex items-center gap-1.5 text-xs px-4 py-2">
            <Plus size={13} />
            <span>Sell gear</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
