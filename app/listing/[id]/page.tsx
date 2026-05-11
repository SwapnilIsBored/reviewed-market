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
    description: "Used for a 2-week full review. Mint condition, all accessories included.",
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="rounded-2xl overflow-hidden border border-ink-700 aspect-video">
            <iframe
              src={getYouTubeEmbedUrl(listing.youtube_video_id, listing.youtube_timestamp_seconds)}
              title={listing.youtube_video_title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="flex items-start gap-2 p-3 rounded-xl bg-accent/5 border border-accent/20">
            <div className="text-accent mt-0.5">
              <ShieldCheck size={14} />
            </div>
            <p className="text-xs text-ink-400 leading-relaxed">
              This is the exact unit featured in the video above.
              No strangers, no guesswork.
            </p>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="chip text-xs capitalize">{listing.category}</span>
            <span className={cn("text-[11px] px-2.5 py-0.5 rounded-full font-medium", conditionColor(listing.condition))}>
              {conditionLabel(listing.condition)}
            </span>
          </div>
          <h1 className="text-2xl font-medium text-ink-50 mb-2 leading-snug">
            {listing.title}
          </h1>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-medium text-ink-50">
              {formatPrice(listing.price)}
            </span>
            {listing.original_price && (
              <span className="text-ink-500 line-through text-base">
                {formatPrice(listing.original_price)}
              </span>
            )}
            {discount && (
              <span className="text-xs text-accent bg-accent/10 border border-accent/30 px-2 py-0.5 rounded-full">
                {discount}% off retail
              </span>
            )}
          </div>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-ink-800 border border-ink-700 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-sm font-medium text-accent">
                {creator.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-ink-100">{creator.name}</p>
                {creator.youtube_subscriber_count && (
                  <p className="text-xs text-ink-500">
                    {formatSubscriberCount(creator.youtube_subscriber_count)} subscribers
                  </p>
                )}
              </div>
            </div>
            <a href={`https://youtube.com/@${creator.youtube_channel_name}`} target="_blank" rel="noreferrer" className="text-ink-500 hover:text-accent transition-colors">
              <ExternalLink size={14} />
            </a>
          </div>
          <div className="mb-8">
            <p className="label">About this listing</p>
            <p className="text-sm text-ink-300 leading-relaxed">{listing.description}</p>
          </div>
          <BuyButton listing={listing} />
          <p className="text-center text-xs text-ink-600 mt-3">
            Secure checkout via Razorpay
          </p>
        </div>
      </div>
    </div>
  );
}
