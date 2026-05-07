import { YouTubeVideoMeta, YouTubeChannelMeta } from "@/types";

const API_KEY = process.env.YOUTUBE_API_KEY;
const BASE = "https://www.googleapis.com/youtube/v3";

export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ];
  for (const p of patterns) {
    const match = url.match(p);
    if (match) return match[1];
  }
  return null;
}

export async function getVideoMeta(videoId: string): Promise<YouTubeVideoMeta | null> {
  try {
    const res = await fetch(
      `${BASE}/videos?part=snippet&id=${videoId}&key=${API_KEY}`
    );
    const data = await res.json();
    if (!data.items?.length) return null;
    const item = data.items[0];
    return {
      id: videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
    };
  } catch {
    return null;
  }
}

export async function getChannelMeta(channelId: string): Promise<YouTubeChannelMeta | null> {
  try {
    const res = await fetch(
      `${BASE}/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`
    );
    const data = await res.json();
    if (!data.items?.length) return null;
    const item = data.items[0];
    return {
      id: channelId,
      title: item.snippet.title,
      subscriberCount: parseInt(item.statistics.subscriberCount || "0"),
      thumbnailUrl: item.snippet.thumbnails.default.url,
    };
  } catch {
    return null;
  }
}

export function formatSubscriberCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toString();
}

export function getYouTubeEmbedUrl(videoId: string, startSeconds?: number): string {
  const base = `https://www.youtube.com/embed/${videoId}`;
  return startSeconds ? `${base}?start=${startSeconds}` : base;
}
