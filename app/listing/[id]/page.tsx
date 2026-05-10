import Link from "next/link";
import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";
import { formatPrice, conditionLabel, conditionColor, cn } from "@/lib/utils";
import { formatSubscriberCount, getYouTubeEmbedUrl } from "@/lib/youtube";
import { Listing } from "@/types";
import { BuyButton } from "@/components/ui/BuyButton";

async function getListing(id: string): Promise<Listing> {
  return {
    id,
    creator_id: "c1",
    title: "Samsung Galaxy S24 Ultra",
    description:
      "Used for a 2-week full review. Every feature tested extensively. Phone is in absolutely mint condition — no scratches, original box and all accessories included. Screen protector applied from day one.",
    category: "smartphones",
    condition: "mint",
    price: 72000,
    original_price: 129999,
    youtube_video_id: "dQw4w9WgXcQ",
    youtube_video_title: "Samsung Galaxy S24 Ultra — Full Review",
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
  };
}

export default async function ListingPage({ params }: { params: { id: string } }) {
  const listing = await getListing(params.id);
  const creator = listing.creator!;
  const discount = listing.original_price
    ? Math.round((1 - listing.price / listing.original_price) * 100)
    : null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Link href="/browse" className="flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-200 transition-colors mb-8">
        <ArrowLeft size={14} /> Back to browse
      </Link>