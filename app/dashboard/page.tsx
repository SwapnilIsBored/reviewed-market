"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Package, TrendingUp, IndianRupee, Eye } from "lucide-react";
import { formatPrice, conditionLabel, conditionColor, cn } from "@/lib/utils";
import { Listing } from "@/types";

// Mock — replace with Supabase fetch using session user ID
const MY_LISTINGS: Listing[] = [
  {
    id: "1", creator_id: "c1", title: "Samsung Galaxy S24 Ultra",
    description: "", category: "smartphones", condition: "mint",
    price: 72000, original_price: 129999,
    youtube_video_id: "dQw4w9WgXcQ", youtube_video_title: "S24 Ultra Review",
    youtube_video_thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    images: [], status: "active", created_at: new Date().toISOString(),
  },
  {
    id: "2", creator_id: "c1", title: "Sony WH-1000XM5",
    description: "", category: "audio", condition: "mint",
    price: 22000, original_price: 34990,
    youtube_video_id: "dQw4w9WgXcQ", youtube_video_title: "Best ANC Headphones",
    youtube_video_thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    images: [], status: "sold", created_at: new Date().toISOString(),
  },
];

const STATS = [
  { label: "Active listings", value: "1", icon: Package },
  { label: "Total earnings", value: "₹19,800", icon: IndianRupee },
  { label: "Total views", value: "342", icon: Eye },
  { label: "Conversion rate", value: "12%", icon: TrendingUp },
];

type Tab = "listings" | "orders";

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>("listings");

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <p className="text-xs text-ink-500 uppercase tracking-widest mb-1">Creator</p>
          <h1 className="text-3xl font-medium text-ink-50">Dashboard</h1>
        </div>
        <Link href="/dashboard/new" className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={14} />
          New listing
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {STATS.map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
            <Icon size={14} className="text-ink-500 mb-3" />
            <p className="text-xl font-medium text-ink-50 mb-0.5">{value}</p>
            <p className="text-xs text-ink-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-ink-800 mb-6">
        {(["listings", "orders"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-2 text-sm capitalize transition-colors",
              tab === t
                ? "text-ink-50 border-b-2 border-accent -mb-px"
                : "text-ink-500 hover:text-ink-300"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Listings table */}
      {tab === "listings" && (
        <div className="space-y-3">
          {MY_LISTINGS.map((listing) => (
            <div
              key={listing.id}
              className="card p-4 flex items-center gap-4"
            >
              <div className="w-16 h-12 rounded-lg overflow-hidden bg-ink-700 shrink-0">
                {listing.youtube_video_thumbnail && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={listing.youtube_video_thumbnail}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink-100 truncate">{listing.title}</p>
                <p className="text-xs text-ink-500 capitalize">{listing.category}</p>
              </div>

              <div className="hidden md:block">
                <span className={cn("text-[11px] px-2.5 py-0.5 rounded-full font-medium", conditionColor(listing.condition))}>
                  {conditionLabel(listing.condition)}
                </span>
              </div>

              <div className="text-right shrink-0">
                <p className="text-sm font-medium text-ink-100">{formatPrice(listing.price)}</p>
                <p className="text-xs text-ink-500">
                  You get {formatPrice(Math.round(listing.price * 0.9))}
                </p>
              </div>

              <div>
                <span
                  className={cn(
                    "text-[11px] px-2.5 py-1 rounded-full font-medium",
                    listing.status === "active"
                      ? "bg-emerald-900/30 text-emerald-400"
                      : "bg-ink-700 text-ink-400"
                  )}
                >
                  {listing.status}
                </span>
              </div>

              <div className="flex gap-2">
                <Link href={`/listing/${listing.id}`} className="chip text-xs px-3 py-1">View</Link>
                <Link href={`/dashboard/edit/${listing.id}`} className="chip text-xs px-3 py-1">Edit</Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "orders" && (
        <div className="text-center py-16 text-ink-500">
          <p className="text-sm">No orders yet.</p>
          <p className="text-xs mt-1">Orders will appear here once buyers purchase your listings.</p>
        </div>
      )}
    </div>
  );
}
