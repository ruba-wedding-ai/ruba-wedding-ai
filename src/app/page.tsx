"use client";

import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#fcf8f5] text-[#241b18]">
      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-[#eaded7] bg-[#fcf8f5]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          
          {/* LOGO */}
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#95634d] text-lg font-semibold text-white">
              R
            </div>

            <div>
              <div className="text-lg font-semibold tracking-tight">
                Ruba Wedding AI
              </div>
              <div className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#95634d]">
                Your Wedding Journey
              </div>
            </div>
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-9 md:flex">
            <a
              href="#discover"
              className="text-sm text-[#5f514b] transition hover:text-[#95634d]"
            >
              Discover
            </a>

            <a
              href="#services"
              className="text-sm text-[#5f514b] transition hover:text-[#95634d]"
            >
              Services
            </a>

            <a
              href="#how-it-works"
              className="text-sm text-[#5f514b] transition hover:text-[#95634d]"
            >
              How It Works
            </a>

            <a
              href="#start"
              className="rounded-full bg-[#95634d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7f523f]"
            >
              Start Planning
            </a>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-[#dfd0c7] px-3 py-2 text-sm md:hidden"
          >
            Menu
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="border-t border-[#eaded7] px-6 py-5 md:hidden">
            <div className="flex flex-col gap-4">
              <a href="#discover">Discover</a>
              <a href="#services">Services</a>
              <a href="#how-it-works">How It Works</a>
              <a
                href="#start"
                className="rounded-full bg-[#95634d] px-5 py-3 text-center font-semibold text-white"
              >
                Start Planning
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="discover"
        className="relative overflow-hidden"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
          
          {/* HERO TEXT */}
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#e5d5cc] bg-white px-5 py-2.5 text-sm text-[#95634d] shadow-sm">
              <span>✦</span>
              <span>Made for couples planning their perfect day</span>
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Your wedding.
              <br />
              <span className="text-[#95634d]">Your vision.</span>
              <br />
              One place.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-[#665853]">
              Ruba Wedding AI helps couples discover trusted photographers,
              videographers, DJs, beauty professionals and wedding services —
              then organize their wedding journey from one beautiful platform.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                id="start"
                href="/planner"
                className="rounded-full bg-[#95634d] px-8 py-4 text-center font-semibold text-white transition hover:bg-[#7f523f]"
              >
                Start Planning Your Wedding
              </a>

              <a
                href="#how-it-works"
                className="rounded-full border border-[#d8c8bf] bg-white px-8 py-4 text-center font-semibold text-[#493b35] transition hover:bg-[#f6efeb]"
              >
                See How It Works
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#75665f]">
              <span>✓ Trusted professionals</span>
              <span>✓ Compare services</span>
              <span>✓ Plan in one place</span>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="relative">
            <div className="absolute -inset-5 rounded-[3rem] bg-[#ead7cb]/40 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2.5rem] border border-white bg-[#c39b86] p-4 shadow-2xl">
              <div className="relative flex min-h-[570px] flex-col justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#d9b9a7] via-[#b88972] to-[#8d5c48] p-8 text-white">
                
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur">
                    Ruba Wedding AI
                  </span>

                  <span className="text-2xl">♡</span>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-white/75">
                    Begin your journey
                  </p>

                  <h2 className="mt-4 max-w-md text-4xl font-semibold leading-tight sm:text-5xl">
                    Plan the day
                    <br />
                    you imagined.
                  </h2>

                  <p className="mt-5 max-w-md text-sm leading-6 text-white/80">
                    Find the right people, compare your options and bring every
                    part of your wedding together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="border-t border-[#eaded7] bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#95634d]">
              Discover your wedding team
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Everything you need for your celebration.
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#6d5d55]">
              Browse wedding professionals and services in one place.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "📸",
                title: "Photography",
                text: "Discover photographers and explore their work.",
              },
              {
                icon: "🎥",
                title: "Videography",
                text: "Find the right team to capture your story.",
              },
              {
                icon: "🎧",
                title: "DJs & Music",
                text: "Choose music and entertainment for your celebration.",
              },
              {
                icon: "💄",
                title: "Beauty & More",
                text: "Find makeup artists and other wedding services.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="rounded-3xl border border-[#eaded7] bg-[#fcf8f5] p-7 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-3xl">{service.icon}</div>

                <h3 className="mt-6 text-xl font-semibold">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#6d5d55]">
                  {service.text}
                </p>

                <button className="mt-6 text-sm font-semibold text-[#95634d]">
                  Explore →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="bg-[#f5ede8]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#95634d]">
              Simple planning
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Your wedding journey, simplified.
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Tell us what you need",
                text: "Start with your wedding date, location, style and services.",
              },
              {
                number: "02",
                title: "Discover & compare",
                text: "Explore professionals, portfolios, packages, prices and reviews.",
              },
              {
                number: "03",
                title: "Build your team",
                text: "Choose your preferred professionals and organize your wedding.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-3xl bg-white p-8 shadow-sm"
              >
                <div className="text-sm font-semibold tracking-[0.2em] text-[#95634d]">
                  {step.number}
                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-[#6d5d55]">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#95634d] text-white">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center lg:py-24">
          <p className="text-sm uppercase tracking-[0.3em] text-white/70">
            Your perfect day starts here
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Ready to plan your wedding?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/80">
            Discover the people and services that can help bring your wedding
            vision to life.
          </p>

          <a
            href="/planner"
            className="mt-9 inline-block rounded-full bg-white px-8 py-4 font-semibold text-[#95634d] transition hover:bg-[#f8eee9]"
          >
            Start Planning
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#241b18] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-10 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <div className="font-semibold">Ruba Wedding AI</div>
            <div className="mt-1 text-sm text-white/50">
              Your Wedding Journey
            </div>
          </div>

          <div className="text-sm text-white/50">
            © 2026 Ruba Wedding AI. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}