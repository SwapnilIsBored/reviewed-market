import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import { Listing } from "@/types";
import { formatPrice, conditionLabel, conditionColor, cn } from "@/lib/utils";
import { formatSubscriberCount } from "@/lib/youtube";

interface Props {
  listing: Listing;
}

export function ListingCard({ listing }: Props) {
  const creator = listing.creator;
  const discount = listing.original_price
    ? Math.round((1 - listing.price / listing.original_price) * 100)
    : null;

  return (
    <Link href={`/listing/${listing.id}`} className="card group block">
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] bg-ink-700 overflow-hidden">
        {listing.youtube_video_thumbnail ? (
          <Image
            src={listing.youtube_video_thumbnail}
            alt={listing.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-ink-500">
            <Play size={32} />
          </div>
        )}

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />

        <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between">
          <span className="flex items-center gap-1 text-[10px] text-white bg-ink-900/80 backdrop-blur-sm px-2 py-1 rounded-full">
            <Play size={9} className="fill-accent text-accent" />
            Watch review
          </span>
          {discount && (
            <span className="text-[10px] text-accent bg-accent/10 border border-accent/30 px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        <div className="absolute top-2 left-2">
          <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", conditionColor(listing.condition))}>
            {conditionLabel(listing.condition)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-sm font-medium text-ink-50 leading-snug mb-2 line-clamp-2">
          {listing.title}
        </p>

        {creator && (
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-[9px] font-medium text-accent shrink-0">
              {creator.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-ink-300 truncate">{creator.name}</p>
              {creator.youtube_subscriber_count && (
                <p className="text-[10px] text-ink-500">
                  {formatSubscriberCount(creator.youtube_subscriber_count)} subs
                </p>
              )}
            </div>
          </div>
        )}

        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-base font-medium text-ink-50">
              {formatPrice(listing.price)}
            </span>
            {listing.original_price && (
              <span className="text-xs text-ink-500 line-through ml-1.5">
                {formatPrice(listing.original_price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
