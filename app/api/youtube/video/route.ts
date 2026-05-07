import { NextRequest, NextResponse } from "next/server";
import { getVideoMeta } from "@/lib/youtube";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing video id" }, { status: 400 });

  const meta = await getVideoMeta(id);
  if (!meta) return NextResponse.json({ error: "Video not found" }, { status: 404 });

  return NextResponse.json(meta);
}
