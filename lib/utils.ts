import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Condition, Category } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function conditionLabel(c: Condition): string {
  return { mint: "Mint", good: "Good", fair: "Fair" }[c];
}

export function conditionColor(c: Condition): string {
  return {
    mint: "bg-emerald-900/30 text-emerald-400 border border-emerald-800",
    good: "bg-amber-900/30 text-amber-400 border border-amber-800",
    fair: "bg-red-900/30 text-red-400 border border-red-800",
  }[c];
}

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "smartphones", label: "Smartphones" },
  { value: "laptops", label: "Laptops" },
  { value: "audio", label: "Audio" },
  { value: "cameras", label: "Cameras" },
  { value: "wearables", label: "Wearables" },
  { value: "accessories", label: "Accessories" },
  { value: "gaming", label: "Gaming" },
  { value: "other", label: "Other" },
];

export const PLATFORM_FEE_PERCENT = 0.10; // 10%

export function calculateFees(price: number) {
  const platformFee = Math.round(price * PLATFORM_FEE_PERCENT);
  const creatorPayout = price - platformFee;
  return { platformFee, creatorPayout };
}
