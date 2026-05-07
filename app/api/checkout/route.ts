import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { calculateFees } from "@/lib/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { listing_id, buyer_id, shipping_address } = await req.json();

    const db = supabaseAdmin();
    const { data: listing } = await db
      .from("listings")
      .select("*, creator:users(*)")
      .eq("id", listing_id)
      .single();

    if (!listing) return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    if (listing.status !== "active") return NextResponse.json({ error: "Listing no longer available" }, { status: 400 });

    const { platformFee } = calculateFees(listing.price);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            unit_amount: listing.price * 100, // paise
            product_data: {
              name: listing.title,
              description: `Sold by ${listing.creator?.name} · ${listing.condition} condition`,
              images: listing.youtube_video_thumbnail ? [listing.youtube_video_thumbnail] : [],
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/listing/${listing_id}`,
      metadata: {
        listing_id,
        buyer_id,
        creator_id: listing.creator_id,
        platform_fee: platformFee.toString(),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
