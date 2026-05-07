"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Youtube, CheckCircle } from "lucide-react";
import { CATEGORIES, cn } from "@/lib/utils";
import { Category, Condition } from "@/types";
import { extractVideoId } from "@/lib/youtube";

type Step = 1 | 2 | 3;

export default function NewListingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoMeta, setVideoMeta] = useState<{ title: string; thumbnail: string } | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "" as Category,
    condition: "mint" as Condition,
    price: "",
    original_price: "",
    timestamp: "",
  });

  const handleVideoLookup = async () => {
    const videoId = extractVideoId(videoUrl);
    if (!videoId) return alert("Invalid YouTube URL");
    setLoading(true);
    try {
      const res = await fetch(`/api/youtube/video?id=${videoId}`);
      const data = await res.json();
      setVideoMeta(data);
      setStep(2);
    } catch {
      alert("Could not fetch video. Check the URL.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          youtube_video_url: videoUrl,
          youtube_video_title: videoMeta?.title,
          youtube_video_thumbnail: videoMeta?.thumbnail,
        }),
      });
      if (!res.ok) throw new Error("Failed to create listing");
      setStep(3);
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const CONDITIONS: { value: Condition; label: string; desc: string }[] = [
    { value: "mint", label: "Mint", desc: "Like new, no marks" },
    { value: "good", label: "Good", desc: "Minor signs of use" },
    { value: "fair", label: "Fair", desc: "Visible wear, fully functional" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="mb-10">
        <p className="text-xs text-ink-500 uppercase tracking-widest mb-1">Creator dashboard</p>
        <h1 className="text-3xl font-medium text-ink-50">Create a listing</h1>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-10">
        {([1, 2, 3] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors",
              step >= s ? "bg-accent text-ink-900" : "bg-ink-800 text-ink-500 border border-ink-700"
            )}>
              {s}
            </div>
            {i < 2 && <div className={cn("h-px w-8", step > s ? "bg-accent" : "bg-ink-700")} />}
          </div>
        ))}
        <span className="ml-2 text-xs text-ink-500">
          {step === 1 ? "Link your video" : step === 2 ? "Add details" : "Done"}
        </span>
      </div>

      {/* Step 1 — Video URL */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="card p-6 flex gap-3">
            <Youtube size={16} className="text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-ink-300 leading-relaxed">
              Paste the YouTube link of the video where this product was featured.
              Your channel will be verified automatically.
            </p>
          </div>
          <div>
            <label className="label">YouTube video URL</label>
            <input
              className="input"
              placeholder="https://youtube.com/watch?v=..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>
          <button
            onClick={handleVideoLookup}
            disabled={!videoUrl || loading}
            className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 size={15} className="animate-spin" /> : null}
            Verify video
          </button>
        </div>
      )}

      {/* Step 2 — Listing details */}
      {step === 2 && (
        <div className="space-y-6">
          {videoMeta && (
            <div className="card overflow-hidden flex gap-4 p-4 items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={videoMeta.thumbnail} alt="" className="w-24 h-16 object-cover rounded-lg shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-ink-500 mb-0.5">Linked video</p>
                <p className="text-sm text-ink-100 font-medium line-clamp-2">{videoMeta.title}</p>
              </div>
            </div>
          )}

          <div>
            <label className="label">Product title</label>
            <input className="input" placeholder="e.g. Samsung Galaxy S24 Ultra" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>

          <div>
            <label className="label">Description</label>
            <textarea
              className="input resize-none h-24"
              placeholder="Describe the condition, what's included, how long you used it..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Category</label>
              <select
                className="input"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
              >
                <option value="">Select...</option>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Video timestamp (optional)</label>
              <input
                className="input"
                placeholder="e.g. 2:30"
                value={form.timestamp}
                onChange={(e) => setForm({ ...form, timestamp: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="label">Condition</label>
            <div className="grid grid-cols-3 gap-3">
              {CONDITIONS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setForm({ ...form, condition: c.value })}
                  className={cn(
                    "p-3 rounded-xl border text-left transition-all",
                    form.condition === c.value
                      ? "border-accent bg-accent/10"
                      : "border-ink-700 bg-ink-800 hover:border-ink-500"
                  )}
                >
                  <p className={cn("text-xs font-medium mb-0.5", form.condition === c.value ? "text-accent" : "text-ink-200")}>{c.label}</p>
                  <p className="text-[10px] text-ink-500">{c.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Your asking price (₹)</label>
              <input className="input" type="number" placeholder="72000" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div>
              <label className="label">Original retail price (₹)</label>
              <input className="input" type="number" placeholder="129999" value={form.original_price} onChange={(e) => setForm({ ...form, original_price: e.target.value })} />
            </div>
          </div>

          {form.price && (
            <div className="p-4 rounded-xl bg-ink-800 border border-ink-700 text-sm">
              <div className="flex justify-between text-ink-400 mb-1">
                <span>Platform fee (10%)</span>
                <span>−₹{Math.round(Number(form.price) * 0.1).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-ink-100 font-medium">
                <span>You receive</span>
                <span>₹{Math.round(Number(form.price) * 0.9).toLocaleString("en-IN")}</span>
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={!form.title || !form.price || !form.category || loading}
            className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 size={15} className="animate-spin" /> : null}
            Publish listing
          </button>
        </div>
      )}

      {/* Step 3 — Success */}
      {step === 3 && (
        <div className="text-center py-16">
          <CheckCircle size={40} className="text-accent mx-auto mb-4" />
          <h2 className="text-xl font-medium text-ink-50 mb-2">Listing published</h2>
          <p className="text-sm text-ink-400">Redirecting you to your dashboard...</p>
        </div>
      )}
    </div>
  );
}
