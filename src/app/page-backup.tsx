"use client";

import { useState } from "react";

const services = [
  {
    title: "Photography",
    description: "Discover photographers and explore their wedding galleries.",
    icon: "📷",
  },
  {
    title: "Videography",
    description: "Find cinematic wedding filmmakers for your special day.",
    icon: "🎥",
  },
  {
    title: "DJs & Entertainment",
    description: "Discover DJs and entertainment for your celebration.",
    icon: "🎶",
  },
  {
    title: "Wedding Planning",
    description: "Organize your wedding journey in one simple place.",
    icon: "💍",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#241b18]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-[#eaded7] bg-[#fffaf7]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#8b5e4b] text-xl text-white shadow-sm">
              R
            </div>

            <div>
              <div className="text-xl font-semibold tracking-tight">
                Ruba Wedding AI
              </div>
              <div className="text-xs tracking-[0.25em] text-[#9b8175]">
                YOUR WEDDING JOURNEY
              </div>
            </div>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#discover"
              className="text-sm font-medium text-[#5f5049] transition hover:text-[#8b5e4b]"
            >
              Discover
            </a>
            <a
              href="#services"
              className="text-sm font-medium text-[#5f5049] transition hover:text-[#8b5e4b]"
            >
              Services
            </a>
            <a
              href="#how"
              className="text-sm font-medium text-[#5f5049] transition hover:text-[#8b5e4b]"
            >
              How It Works
            </a>

            <button className="rounded-full bg-[#8b5e4b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#704938]">
              Start Planning
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-[#eaded7] px-3 py-2 md:hidden"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#eaded7] px-6 py-5 md:hidden">
            <div className="flex flex-col gap-4">
              <a href="#discover">Discover</a>
              <a href="#services">Services</a>
              <a href="#how">How It Works</a>
              <button className="rounded-full bg-[#8b5e4b] px-6 py-3 font-semibold text-white">
                Start Planning
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section
        id="discover"
        className="relative overflow-hidden"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e5d4ca] bg-white px-4 py-2 text-sm text-[#8b5e4b] shadow-sm">
              <span>✦</span>
              <span>Made for couples planning their perfect day</span>
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Your wedding.
              <br />
              <span className="text-[#8b5e4b]">Your vision.</span>
              <br />
              One place.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-[#6f625c]">
              Ruba Wedding AI helps couples discover trusted wedding
              photographers, videographers, DJs and services — and organize
              their wedding journey from one beautiful platform.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button className="rounded-full bg-[#8b5e4b] px-8 py-4 font-semibold text-white shadow-lg shadow-[#8b5e4b]/20 transition hover:-translate-y-0.5 hover:bg-[#704938]">
                Start Planning Your Wedding
              </button>

              <a
                href="#services"
                className="rounded-full border border-[#d8c6bc] bg-white px-8 py-4 text-center font-semibold text-[#5f5049] transition hover:border-[#8b5e4b] hover:text-[#8b5e4b]"
              >
                Explore Services
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-[#796b64]">
              <span>✓ Discover trusted providers</span>
              <span>✓ Compare portfolios</span>
              <span>✓ Plan with confidence</span>
            </div>
          </div>

          {/* Visual card */}
          <div className="relative">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#ead8cd] blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#ead8cd] blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-[#eaded7] bg-white p-4 shadow-2xl shadow-[#8b5e4b]/10">
              <div className="flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#d9b9a8] via-[#b98e78] to-[#6f493b] p-7 text-white">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-medium backdrop-blur">
                    RUBA WEDDING AI
                  </span>
                  <span className="text-2xl">♡</span>
                </div>

                <div>
                  <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/75">
                    Begin your journey
                  </p>
                  <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">
                    Plan the day
                    <br />
                    you imagined.
                  </h2>

                  <div className="mt-7 h-px w-24 bg-white/60" />

                  <p className="mt-5 max-w-sm text-sm leading-6 text-white/80">
                    Discover the people, services and inspiration that bring
                    your wedding vision to life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="border-y border-[#eaded7] bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8b5e4b]">
              Everything in one place
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Build your wedding team.
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#756760]">
              From the first idea to the final celebration, discover the
              services you need for your wedding.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-3xl border border-[#eaded7] bg-[#fffaf7] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#c8a99a] hover:shadow-xl hover:shadow-[#8b5e4b]/10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ead8cd] text-2xl">
                  {service.icon}
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#756760]">
                  {service.description}
                </p>

                <div className="mt-6 text-sm font-semibold text-[#8b5e4b]">
                  Explore →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-[#fffaf7]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8b5e4b]">
              Simple by design
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              From idea to “I do.”
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {[
              ["01", "Discover", "Explore wedding professionals and services."],
              ["02", "Compare", "View galleries, portfolios and provider profiles."],
              ["03", "Choose", "Select the team that matches your vision."],
              ["04", "Plan", "Manage your wedding journey in one place."],
            ].map(([number, title, description]) => (
              <div key={number} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d8c6bc] bg-white text-sm font-semibold text-[#8b5e4b]">
                  {number}
                </div>

                <h3 className="mt-5 text-xl font-semibold">{title}</h3>

                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#756760]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 lg:px-10 lg:pb-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#6f493b] px-8 py-16 text-center text-white shadow-2xl sm:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
            Your story starts here
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Ready to start planning your wedding?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/75">
            Discover the people and services that can help turn your wedding
            vision into a beautiful reality.
          </p>

          <button className="mt-8 rounded-full bg-white px-8 py-4 font-semibold text-[#6f493b] transition hover:-translate-y-0.5 hover:bg-[#fff5ef]">
            Start Your Wedding Journey
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#eaded7] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-sm text-[#756760] sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <div>
            <span className="font-semibold text-[#241b18]">
              Ruba Wedding AI
            </span>
            <span className="ml-2">Your wedding journey, beautifully organized.</span>
          </div>

          <div>© 2026 Ruba Wedding AI</div>
        </div>
      </footer>
    </main>
  );
}