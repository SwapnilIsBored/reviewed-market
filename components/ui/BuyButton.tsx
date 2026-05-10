"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { Listing } from "@/types";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function BuyButton({ listing }: { listing: Listing }) {
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      // Load Razorpay script
      await new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = resolve;
        document.body.appendChild(script);
      });

      // Create order
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listing_id: listing.id }),
      });
      const { order_id, amount } = await res.json();

      // Open Razorpay popup
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency: "INR",
        name: "reviewed.market",
        description: listing.title,
        order_id,
        handler: async (response: any) => {
          // Verify payment
          await fetch("/api/webhooks/stripe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              listing_id: listing.id,
              buyer_id: "guest",
              creator_id: listing.creator_id,
              amount: listing.price,
            }),
          });
          alert("Payment successful! The seller will contact you shortly.");
        },
        prefill: { name: "", email: "" },
        theme: { color: "#E8FF47" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="btn-primary w-full flex items-center justify-center py-3.5 text-sm rounded-xl disabled:opacity-50"
    >
      {loading ? "Loading..." : `Buy now — ${formatPrice(listing.price)}`}
    </button>
  );
}