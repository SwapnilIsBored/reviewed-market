import Link from "next/link";
import { ArrowRight, ShieldCheck, PlayCircle, BadgePercent } from "lucide-react";
import { ListingCard } from "@/components/ui/ListingCard";
import { Listing } from "@/types";

// Mock data — replace with Supabase fetch
const FEATURED_LISTINGS: Listing[] = [
  {
    id: "1",
    creator_id: "c1",
    title: "Samsung Galaxy S24 Ultra",
    description: "Used for a 2-week review. Mint condition, all accessories included.",
    category: "smartphones",
    condition: "mint",
    price: 72000,
    original_price: 129999,
    youtube_video_id: "dQw4w9WgXcQ",
    youtube_video_title: "Samsung Galaxy S24 Ultra Full Review",
    youtube_video_thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    youtube_timestamp_seconds: 120,
    images: [],
    status: "active",
    created_at: new Date().toISOString(),
    creator: {
      id: "c1",
      email: "creator@example.com",
      name: "Mrwhosetheboss",
      role: "creator",
      youtube_channel_name: "Mrwhosetheboss",
      youtube_subscriber_count: 18200000,
      created_at: new Date().toISOString(),
    },
  },
  {
    id: "2",
    creator_id: "c2",
    title: "Sony WH-1000XM5",
    description: "Reviewed for a comparison video. Works perfectly.",
    category: "audio",
    condition: "mint",
    price: 22000,
    original_price: 34990,
    youtube_video_id: "dQw4w9WgXcQ",
    youtube_video_title: "Best ANC Headphones 2024 — Full Comparison",
    youtube_video_thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    images: [],
    status: "active",
    created_at: new Date().toISOString(),
    creator: {
      id: "c2",
      email: "creator2@example.com",
      name: "Dave2D",
      role: "creator",
      youtube_channel_name: "Dave2D",
      youtube_subscriber_count: 3400000,
      created_at: new Date().toISOString(),
    },
  },
  {
    id: "3",
    creator_id: "c3",
    title: "MacBook Pro 14\" M3 Pro",
    description: "Used for one month of testing. Excellent condition.",
    category: "laptops",
    condition: "good",
    price: 145000,
    original_price: 199900,
    youtube_video_id: "dQw4w9WgXcQ",
    youtube_video_title: "MacBook Pro M3 — Is it worth it?",
    youtube_video_thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    images: [],
    status: "active",
    created_at: new Date().toISOString(),
    creator: {
      id: "c3",
      email: "creator3@example.com",
      name: "Linus Tech Tips",
      role: "creator",
      youtube_channel_name: "Linus Tech Tips",
      youtube_subscriber_count: 15800000,
      created_at: new Date().toISOString(),
    },
  },
  {
    id: "4",
    creator_id: "c4",
    title: "DJI Osmo Pocket 3",
    description: "Featured in a travel vlog. Gimbal works flawlessly.",
    category: "cameras",
    condition: "mint",
    price: 28500,
    original_price: 44900,
    youtube_video_id: "dQw4w9WgXcQ",
    youtube_video_title: "DJI Osmo Pocket 3 — Best Vlog Camera?",
    youtube_video_thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    images: [],
    status: "active",
    created_at: new Date().toISOString(),
    creator: {
      id: "c4",
      email: "creator4@example.com",
      name: "MKBHD",
      role: "creator",
      youtube_channel_name: "Marques Brownlee",
      youtube_subscriber_count: 18900000,
      created_at: new Date().toISOString(),
    },
  },
];

const FEATURES = [
  {
    icon: PlayCircle,
    title: "Every listing has a review",
    desc: "Watch the product in action before you buy — from the creator who owned it.",
  },
  {
    icon: ShieldCheck,
    title: "Creator-verified authenticity",
    desc: "YouTube OAuth ensures every seller is a real verified channel. No fakes.",
  },
  {
    icon: BadgePercent,
    title: "Reviewer-grade gear, secondhand prices",
    desc: "Creators use products once or twice. You get near-new condition at a fraction of retail.",
  },
];

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6">

      {/* Hero */}
      <section className="pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 text-xs text-ink-400 border border-ink-700 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          The only marketplace where listings come with reviews
        </div>

        <h1
          className="text-5xl md:text-7xl leading-[1.05] font-medium mb-6 tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Buy gear from the
          <br />
          <em className="not-italic text-accent">creator who reviewed it</em>
        </h1>

        <p className="text-ink-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Tech YouTubers sell gear they&apos;ve already featured in videos.
          Every listing links to the review. Watch it, then buy it.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/browse" className="btn-primary flex items-center gap-2 px-7 py-3 text-sm">
            Browse listings <ArrowRight size={15} />
          </Link>
          <Link href="/signup" className="btn-ghost px-7 py-3 text-sm">
            Sell as a creator
          </Link>
        </div>

        {/* Trust bar */}
        <div className="mt-16 flex items-center justify-center gap-8 text-xs text-ink-500 flex-wrap">
          <span>Verified YouTube channels only</span>
          <span className="w-px h-3 bg-ink-700" />
          <span>10% platform fee, rest to creator</span>
          <span className="w-px h-3 bg-ink-700" />
          <span>Stripe-secured payments</span>
          <span className="w-px h-3 bg-ink-700" />
          <span>Shiprocket delivery across India</span>
        </div>
      </section>

      {/* Featured listings */}
      <section className="pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs text-ink-500 uppercase tracking-widest mb-1">Latest drops</p>
            <h2 className="section-heading">Fresh listings</h2>
          </div>
          <Link href="/browse" className="text-xs text-ink-400 hover:text-accent transition-colors flex items-center gap-1">
            View all <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURED_LISTINGS.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="pb-20 border-t border-ink-800 pt-16">
        <div className="text-center mb-12">
          <p className="text-xs text-ink-500 uppercase tracking-widest mb-2">The concept</p>
          <h2 className="text-3xl font-medium" style={{ fontFamily: "var(--font-display)" }}>
            Better than eBay. Here&apos;s why.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-6">
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <Icon size={16} className="text-accent" />
              </div>
              <h3 className="text-sm font-medium text-ink-50 mb-2">{title}</h3>
              <p className="text-sm text-ink-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA — Creator */}
      <section className="pb-24">
        <div className="rounded-3xl border border-ink-700 bg-ink-800 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs text-ink-500 uppercase tracking-widest mb-2">For creators</p>
            <h2 className="text-3xl font-medium mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Your review gear is<br />
              <em className="not-italic text-accent">just sitting there</em>
            </h2>
            <p className="text-ink-400 text-sm max-w-md leading-relaxed">
              You reviewed it. Your audience trusts you. Now let them buy the exact unit you used — with your video as the proof of condition. List in under 2 minutes.
            </p>
          </div>
          <div className="shrink-0">
            <Link href="/signup" className="btn-primary px-8 py-3.5 text-sm">
              Start selling →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
