import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      listing_id,
      buyer_id,
      creator_id,
      amount,
    } = body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(sign)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const db = supabaseAdmin();

    await db.from("listings").update({ status: "sold" }).eq("id", listing_id);

    await db.from("orders").insert({
      listing_id,
      buyer_id,
      creator_id,
      amount,
      platform_fee: Math.round(amount * 0.1),
      creator_payout: Math.round(amount * 0.9),
      stripe_payment_intent_id: razorpay_payment_id,
      status: "paid",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}