export type UserRole = "buyer" | "creator";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar_url?: string;
  youtube_channel_id?: string;
  youtube_channel_name?: string;
  youtube_subscriber_count?: number;
  created_at: string;
}

export interface Listing {
  id: string;
  creator_id: string;
  title: string;
  description: string;
  category: Category;
  condition: Condition;
  price: number;
  original_price?: number;
  youtube_video_id: string;
  youtube_video_title: string;
  youtube_video_thumbnail: string;
  youtube_timestamp_seconds?: number;
  images: string[];
  status: ListingStatus;
  created_at: string;
  creator?: User;
}

export interface Order {
  id: string;
  listing_id: string;
  buyer_id: string;
  creator_id: string;
  amount: number;
  platform_fee: number;
  creator_payout: number;
  stripe_payment_intent_id: string;
  status: OrderStatus;
  shipping_address: ShippingAddress;
  tracking_number?: string;
  created_at: string;
  listing?: Listing;
  buyer?: User;
}

export interface ShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export type Category =
  | "smartphones"
  | "laptops"
  | "audio"
  | "cameras"
  | "wearables"
  | "accessories"
  | "gaming"
  | "other";

export type Condition = "mint" | "good" | "fair";

export type ListingStatus = "active" | "sold" | "draft" | "removed";

export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface YouTubeVideoMeta {
  id: string;
  title: string;
  thumbnail: string;
  channelId: string;
  channelTitle: string;
}

export interface YouTubeChannelMeta {
  id: string;
  title: string;
  subscriberCount: number;
  thumbnailUrl: string;
}
