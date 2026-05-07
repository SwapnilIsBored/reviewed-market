import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { extractVideoId, getVideoMeta } from "@/lib/youtube";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const condition = searchParams.get("condition");
  const limit = parseInt(searchParams.get("limit") || "20");

  const db = supabaseAdmin();
  let query = db
    .from("listings")
    .select("*, creator:users(*)")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (category) query = query.eq("category", category);
  if (condition) query = query.eq("condition", condition);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title, description, category, condition,
      price, original_price, youtube_video_url,
      youtube_video_title, youtube_video_thumbnail, timestamp,
      creator_id,
    } = body;

    const videoId = extractVideoId(youtube_video_url);
    if (!videoId) return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });

    // Verify video exists and belongs to creator's channel
    const videoMeta = await getVideoMeta(videoId);
    if (!videoMeta) return NextResponse.json({ error: "Video not found" }, { status: 404 });

    // Parse timestamp string (e.g. "2:30") to seconds
    let timestampSeconds: number | null = null;
    if (timestamp) {
      const parts = timestamp.split(":").map(Number);
      if (parts.length === 2) timestampSeconds = parts[0] * 60 + parts[1];
      if (parts.length === 3) timestampSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
    }

    const db = supabaseAdmin();
    const { data, error } = await db
      .from("listings")
      .insert({
        creator_id,
        title,
        description,
        category,
        condition,
        price: parseInt(price),
        original_price: original_price ? parseInt(original_price) : null,
        youtube_video_id: videoId,
        youtube_video_title: youtube_video_title || videoMeta.title,
        youtube_video_thumbnail: youtube_video_thumbnail || videoMeta.thumbnail,
        youtube_timestamp_seconds: timestampSeconds,
        status: "active",
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
