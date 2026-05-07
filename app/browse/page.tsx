"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { ListingCard } from "@/components/ui/ListingCard";
import { CATEGORIES, cn } from "@/lib/utils";
import { Listing, Category, Condition } from "@/types";

// Mock data — replace with Supabase query
const ALL_LISTINGS: Listing[] = [
  {
    id: "1", creator_id: "c1", title: "Samsung Galaxy S24 Ultra",
    description: "Mint from a 2-week review.", category: "smartphones",
    condition: "mint", price: 72000, original_price: 129999,
    youtube_video_id: "dQw4w9WgXcQ", youtube_video_title: "S24 Ultra Full Review",
    youtube_video_thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    images: [], status: "active", created_at: new Date().toISOString(),
    creator: { id: "c1", email: "", name: "Mrwhosetheboss", role: "creator", youtube_channel_name: "Mrwhosetheboss", youtube_subscriber_count: 18200000, created_at: "" },
  },
  {
    id: "2", creator_id: "c2", title: "Sony WH-1000XM5",
    description: "Used for comparison video.", category: "audio",
    condition: "mint", price: 22000, original_price: 34990,
    youtube_video_id: "dQw4w9WgXcQ", youtube_video_title: "Best ANC Headphones 2024",
    youtube_video_thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    images: [], status: "active", created_at: new Date().toISOString(),
    creator: { id: "c2", email: "", name: "Dave2D", role: "creator", youtube_channel_name: "Dave2D", youtube_subscriber_count: 3400000, created_at: "" },
  },
  {
    id: "3", creator_id: "c3", title: 'MacBook Pro 14" M3 Pro',
    description: "One month of testing.", category: "laptops",
    condition: "good", price: 145000, original_price: 199900,
    youtube_video_id: "dQw4w9WgXcQ", youtube_video_title: "MacBook Pro M3 Review",
    youtube_video_thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    images: [], status: "active", created_at: new Date().toISOString(),
    creator: { id: "c3", email: "", name: "Linus Tech Tips", role: "creator", youtube_channel_name: "Linus Tech Tips", youtube_subscriber_count: 15800000, created_at: "" },
  },
  {
    id: "4", creator_id: "c4", title: "DJI Osmo Pocket 3",
    description: "Featured in a travel vlog.", category: "cameras",
    condition: "mint", price: 28500, original_price: 44900,
    youtube_video_id: "dQw4w9WgXcQ", youtube_video_title: "Best Vlog Camera 2024",
    youtube_video_thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    images: [], status: "active", created_at: new Date().toISOString(),
    creator: { id: "c4", email: "", name: "MKBHD", role: "creator", youtube_channel_name: "Marques Brownlee", youtube_subscriber_count: 18900000, created_at: "" },
  },
  {
    id: "5", creator_id: "c5", title: "Apple Watch Ultra 2",
    description: "Worn for 3 weeks during testing.", category: "wearables",
    condition: "good", price: 58000, original_price: 89900,
    youtube_video_id: "dQw4w9WgXcQ", youtube_video_title: "Apple Watch Ultra 2 Review",
    youtube_video_thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    images: [], status: "active", created_at: new Date().toISOString(),
    creator: { id: "c5", email: "", name: "iJustine", role: "creator", youtube_channel_name: "iJustine", youtube_subscriber_count: 7200000, created_at: "" },
  },
  {
    id: "6", creator_id: "c6", title: "ASUS ROG Ally",
    description: "Gaming handheld, barely used.", category: "gaming",
    condition: "mint", price: 42000, original_price: 59999,
    youtube_video_id: "dQw4w9WgXcQ", youtube_video_title: "ROG Ally — 3 Months Later",
    youtube_video_thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    images: [], status: "active", created_at: new Date().toISOString(),
    creator: { id: "c6", email: "", name: "JerryRigEverything", role: "creator", youtube_channel_name: "JerryRigEverything", youtube_subscriber_count: 9100000, created_at: "" },
  },
];

const CONDITIONS: { value: Condition | "all"; label: string }[] = [
  { value: "all", label: "Any condition" },
  { value: "mint", label: "Mint" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
];

export default function BrowsePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [activeCondition, setActiveCondition] = useState<Condition | "all">("all");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = ALL_LISTINGS.filter((l) => {
    const matchQ = query === "" || l.title.toLowerCase().includes(query.toLowerCase()) ||
      l.creator?.name.toLowerCase().includes(query.toLowerCase());
    const matchCat = activeCategory === "all" || l.category === activeCategory;
    const matchCond = activeCondition === "all" || l.condition === activeCondition;
    return matchQ && matchCat && matchCond;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs text-ink-500 uppercase tracking-widest mb-1">Marketplace</p>
        <h1 className="text-3xl font-medium text-ink-50">Browse gear</h1>
      </div>

      {/* Search + filter toggle */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500" />
          <input
            className="input pl-9"
            placeholder="Search by product or creator..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn("btn-ghost flex items-center gap-2 text-xs px-4", showFilters && "border-accent text-accent")}
        >
          <SlidersHorizontal size={13} />
          Filters
        </button>
      </div>

      {/* Filter row */}
      {showFilters && (
        <div className="mb-6 p-4 rounded-2xl border border-ink-700 bg-ink-800 flex flex-wrap gap-6">
          <div>
            <p className="label">Condition</p>
            <div className="flex gap-2 flex-wrap">
              {CONDITIONS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setActiveCondition(c.value)}
                  className={cn("chip text-xs", activeCondition === c.value && "chip-active")}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Category chips */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveCategory("all")}
          className={cn("chip shrink-0", activeCategory === "all" && "chip-active")}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={cn("chip shrink-0", activeCategory === cat.value && "chip-active")}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-ink-500">
          <p className="text-lg mb-2">No listings found</p>
          <p className="text-sm">Try a different search or category.</p>
        </div>
      ) : (
        <>
          <p className="text-xs text-ink-500 mb-5">{filtered.length} listings</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
