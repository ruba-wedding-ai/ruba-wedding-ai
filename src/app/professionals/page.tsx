"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { providers, Provider, categoryLabels, ServiceCategory } from "../../data/providers";

const categories: (ServiceCategory | "all")[] = [
  "all",
  "photography",
  "videography",
  "dj-music",
  "beauty",
  "car-rental",
  "decoration",
];

export default function ProfessionalsDirectory() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return providers.filter((p) => {
      if (activeCategory !== "all" && p.category !== activeCategory) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      );
    });
  }, [query, activeCategory]);

  return (
    <main className="min-h-screen bg-[#fcf8f5] text-[#241b18]">
      <header className="sticky top-0 z-40 border-b border-[#eaded7] bg-[#fcf8f5]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#95634d] text-lg font-semibold text-white">R</div>
            <div>
              <div className="text-lg font-semibold tracking-tight">Ruba Wedding AI</div>
              <div className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#95634d]">Your Wedding Journey</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            <Link href="/professionals" className="text-sm text-[#5f514b] transition hover:text-[#95634d]">Discover</Link>
            <a href="#services" className="text-sm text-[#5f514b] transition hover:text-[#95634d]">Services</a>
            <a href="#how-it-works" className="text-sm text-[#5f514b] transition hover:text-[#95634d]">How It Works</a>
            <Link href="/planner" className="rounded-full bg-[#95634d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7f523f]">Start Planning</Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-3 lg:items-start">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-semibold">Find the right team for your wedding.</h1>
            <p className="mt-3 text-lg text-[#6d5d55]">Discover trusted photographers, videographers, DJs, beauty professionals and more — all in one place.</p>

            <div className="mt-6 flex items-center gap-4">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search professionals..."
                className="w-full rounded-3xl border border-[#e6d8cf] bg-white px-4 py-3 text-sm text-[#241b18] outline-none focus:border-[#95634d] focus:ring-2 focus:ring-[#95634d]/20"
              />

              <div className="hidden sm:block text-sm text-[#6d5d55]">{filtered.length} professionals</div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={
                    "rounded-full px-4 py-2 text-sm font-semibold transition " +
                    (activeCategory === c ? "bg-[#95634d] text-white" : "border border-[#e6d8cf] bg-white text-[#5f514b]")
                  }
                >
                  {c === "all" ? "All" : categoryLabels[c as ServiceCategory]}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {filtered.map((p: Provider) => (
                <div key={p.id} className="rounded-[1.5rem] border border-[#e6d8cf] bg-white p-5 shadow-sm">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#95634d]">{categoryLabels[p.category]}</div>
                      <h3 className="text-xl font-semibold">{p.name}</h3>
                      <p className="mt-1 text-sm text-[#6d5d55]">{p.location}</p>
                    </div>

                    <div className="text-right text-sm text-[#6d5d55]">
                      <div className="font-semibold text-[#241b18]">{p.rating.toFixed(1)} ★</div>
                      <div>{p.reviewCount} reviews</div>
                      <div className="mt-2 font-semibold">{p.startingPrice}</div>
                    </div>
                  </div>

                  <div className="mb-4 flex gap-4">
                    <div className="h-24 w-36 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[#ead7cc] to-[#f6efe9]" />
                    <p className="text-sm leading-6 text-[#6d5d55]">{p.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Link href={`/professionals/${p.id}`} className="text-sm font-semibold text-[#95634d]">View Profile →</Link>
                    <Link href="/planner" className="rounded-full border border-[#d8c8bf] bg-white px-4 py-2 text-sm font-semibold text-[#493b35]">Start Planning</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="rounded-2xl border border-[#e6d8cf] bg-white p-6">
              <h4 className="text-sm font-semibold text-[#95634d]">Why browse professionals?</h4>
              <p className="mt-3 text-sm text-[#6d5d55]">Compare portfolios, prices and reviews to find the right team for your wedding.</p>

              <div className="mt-6">
                <h5 className="text-sm font-semibold">Popular categories</h5>
                <div className="mt-3 flex flex-wrap gap-2">
                  {categories.slice(1).map((c) => (
                    <button key={c} onClick={() => setActiveCategory(c as ServiceCategory)} className="rounded-full border border-[#e6d8cf] px-3 py-1 text-sm text-[#5f514b]">{categoryLabels[c as ServiceCategory]}</button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
