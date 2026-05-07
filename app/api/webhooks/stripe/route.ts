import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { calculateFees } from "@/lib/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.CheckoutSession;
    const { listing_id, buyer_id, creator_id, platform_fee } = session.metadata!;

    const db = supabaseAdmin();

    // Mark listing as sold
    await db.from("listings").update({ status: "sold" }).eq("id", listing_id);

    // Create order record
    const { creatorPayout } = calculateFees(session.amount_total! / 100);
    await db.from("orders").insert({
      listing_id,
      buyer_id,
      creator_id,
      amount: session.amount_total! / 100,
      platform_fee: parseInt(platform_fee),
      creator_payout: creatorPayout,
      stripe_payment_intent_id: session.payment_intent as string,
      status: "paid",
    });
  }

  return NextResponse.json({ received: true });
}
