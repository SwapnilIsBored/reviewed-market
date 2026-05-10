import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { supabaseAdmin } from "@/lib/supabase";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const { listing_id } = await req.json();

    const db = supabaseAdmin();
    const { data: listing } = await db
      .from("listings")
      .select("*")
      .eq("id", listing_id)
      .single();

    if (!listing) return NextResponse.json({ error: "Listing not found" }, { status: 404 });

    const order = await razorpay.orders.create({
      amount: listing.price * 100, // paise
      currency: "INR",
      receipt: `order_${listing_id}`,
      notes: { listing_id },
    });

    return NextResponse.json({ order_id: order.id, amount: order.amount });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}