"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const servicesStorageKey = "rubaWeddingServices";
const professionalsStorageKey = "rubaWeddingProfessionals";

type ServiceId = "photography" | "videography" | "dj-music" | "beauty";

type Professional = {
  id: string;
  name: string;
  category: ServiceId;
  description: string;
  location: string;
  startingPrice: string;
  rating: number;
  reviews: number;
  about: string;
  services: string[];
};

const professionals: Professional[] = [
  {
    id: "10k-studio-photo",
    name: "10K Studio",
    category: "photography",
    description: "Elegant wedding photography with beautiful storytelling and refined portraits.",
    location: "Cairo, Egypt",
    startingPrice: "Starting from 11,000 EGP",
    rating: 4.9,
    reviews: 124,
    about: "A premium photography studio specializing in luxury wedding celebrations across Egypt.",
    services: ["Full-day photography", "Portrait sessions", "Album design"],
  },
  {
    id: "digital-team-photo",
    name: "Digital Team",
    category: "photography",
    description: "Authentic wedding moments captured with a warm, modern signature style.",
    location: "Cairo, Egypt",
    startingPrice: "Starting from 9,500 EGP",
    rating: 4.8,
    reviews: 87,
    about: "Wedding photography crafted for couples who want elegant, natural imagery.",
    services: ["Highlight reels", "Engagement shoot", "Photo editing"],
  },
  {
    id: "luna-studio-photo",
    name: "Luna Studio",
    category: "photography",
    description: "Soft, luxurious wedding photography with an emphasis on emotion and light.",
    location: "Cairo, Egypt",
    startingPrice: "Starting from 10,000 EGP",
    rating: 4.8,
    reviews: 65,
    about: "A boutique studio offering refined wedding photography packages for intimate celebrations.",
    services: ["Cinematic portraits", "Event coverage", "Digital delivery"],
  },
  {
    id: "10k-studio-video",
    name: "10K Studio",
    category: "videography",
    description: "Cinematic wedding films that keep the emotion of your day alive for years.",
    location: "Cairo, Egypt",
    startingPrice: "Starting from 11,000 EGP",
    rating: 4.9,
    reviews: 112,
    about: "A top videography team creating elegant, story-driven wedding films.",
    services: ["Full ceremony coverage", "Highlight films", "Drone footage"],
  },
  {
    id: "digital-team-video",
    name: "Digital Team",
    category: "videography",
    description: "Beautiful wedding videography with a cinematic eye and refined editing.",
    location: "Cairo, Egypt",
    startingPrice: "Starting from 9,500 EGP",
    rating: 4.8,
    reviews: 94,
    about: "Videographers who bring your wedding story to life with a polished, modern look.",
    services: ["Highlight reels", "Full event film", "Same-day edit"],
  },
  {
    id: "dj-mj",
    name: "DJ MJ",
    category: "dj-music",
    description: "A stylish DJ experience that keeps your celebration energized and joyful.",
    location: "Cairo, Egypt",
    startingPrice: "Starting from 5,000 EGP",
    rating: 4.7,
    reviews: 73,
    about: "Experienced wedding DJs offering music direction for every moment of your day.",
    services: ["Ceremony music", "Reception set", "Dance floor coordination"],
  },
  {
    id: "ruba-beauty",
    name: "Ruba Beauty",
    category: "beauty",
    description: "Luxury bridal beauty with elegant makeup and styling for your wedding day.",
    location: "Cairo, Egypt",
    startingPrice: "Starting from 3,000 EGP",
    rating: 4.9,
    reviews: 58,
    about: "A beauty team focused on bridal radiance, soft glam, and stress-free preparation.",
    services: ["Bridal makeup", "Hair styling", "Trial session"],
  },
];

const categoryLabels: Record<ServiceId, string> = {
  photography: "Photography",
  videography: "Videography",
  "dj-music": "DJ & Music",
  beauty: "Beauty & Makeup",
};

const categoryDescriptions: Record<ServiceId, string> = {
  photography: "Capture every meaningful moment of your celebration.",
  videography: "Create beautiful films you'll remember for years.",
  "dj-music": "Set the mood and keep your celebration moving.",
  beauty: "Find beauty professionals for your special day.",
};

export default function PlannerProfessionalsPage() {
  const router = useRouter();
  const [selectedServices, setSelectedServices] = useState<ServiceId[]>([]);
  const [selections, setSelections] = useState<Record<ServiceId, string>>({});
  const [activeProfile, setActiveProfile] = useState<Professional | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const savedServices = sessionStorage.getItem(servicesStorageKey);
    const savedSelections = sessionStorage.getItem(professionalsStorageKey);

    if (savedServices) {
      try {
        const parsed = JSON.parse(savedServices) as ServiceId[];
        setSelectedServices(parsed);
      } catch {
        setSelectedServices([]);
      }
    }

    if (savedSelections) {
      try {
        setSelections(JSON.parse(savedSelections));
      } catch {
        setSelections({});
      }
    }

    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady || typeof window === "undefined") {
      return;
    }

    sessionStorage.setItem(professionalsStorageKey, JSON.stringify(selections));
  }, [selections, isReady]);

  useEffect(() => {
    if (!isReady || selectedServices.length > 0) {
      return;
    }
    router.push("/planner/services");
  }, [isReady, selectedServices, router]);

  const filteredProfessionals = useMemo(
    () => professionals.filter((item) => selectedServices.includes(item.category)),
    [selectedServices]
  );

  const groupedProfessionals = useMemo(
    () =>
      selectedServices.reduce((acc, serviceId) => {
        acc[serviceId] = professionals.filter((item) => item.category === serviceId);
        return acc;
      }, {} as Record<ServiceId, Professional[]>),
    [selectedServices]
  );

  const handleSelect = (category: ServiceId, professionalId: string) => {
    setErrors([]);
    setSelections((current) => ({ ...current, [category]: professionalId }));
  };

  const handleContinue = () => {
    const missingCategories = selectedServices.filter((serviceId) => !selections[serviceId]);
    if (missingCategories.length > 0) {
      setErrors([
        `Please select a professional for ${missingCategories
          .map((id) => categoryLabels[id])
          .join(", ")}.`,
      ]);
      return;
    }
    router.push("/planner/date");
  };

  if (!isReady) {
    return <div className="min-h-screen bg-[#fcf8f5]" />;
  }

  return (
    <main className="min-h-screen bg-[#fcf8f5] text-[#241b18]">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
        <header className="rounded-[2rem] border border-[#e6d8cf] bg-white/90 p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#95634d] text-2xl font-semibold text-white">
                R
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#95634d]">
                  Ruba Wedding AI
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Your Wedding Journey
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {[
                "Wedding Details",
                "Services",
                "Professionals",
                "Date",
                "Review",
              ].map((item, index) => (
                <div
                  key={item}
                  className={
                    "rounded-3xl border px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] " +
                    (index === 2
                      ? "border-[#95634d] bg-[#95634d] text-white"
                      : "border-[#e5d5cc] bg-white text-[#77655c]")
                  }
                >
                  <span className="block text-[10px] text-[#8c6f62]">Step {index + 1}</span>
                  <span className="block leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </header>
      </div>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-[2rem] bg-[#f6ece5] p-8 shadow-sm sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#95634d]">
              Your wedding team
            </p>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
              Find your wedding team.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#6d5d55]">
              Explore trusted professionals, compare their work and choose the people who feel right for your celebration.
            </p>

            <div className="mt-10 rounded-[2rem] border border-[#eaded7] bg-white p-6 shadow-sm sm:p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[#95634d]">
                Curated for your services
              </div>
              <p className="mt-4 text-sm leading-7 text-[#5d5048]">
                Select one professional per category to shape your wedding team while keeping the planning process elegant and simple.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {selectedServices.map((serviceId) => {
              const categoryProfessionals = groupedProfessionals[serviceId] || [];
              return (
                <section
                  key={serviceId}
                  className="rounded-[2rem] border border-[#e6d8cf] bg-white p-6 shadow-sm sm:p-8"
                >
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#95634d]">
                        {categoryLabels[serviceId]}
                      </p>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-[#6d5d55]">
                        {categoryDescriptions[serviceId]}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#f7ede7] px-4 py-2 text-sm text-[#6d5d55]">
                      Choose one
                    </span>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    {categoryProfessionals.map((professional) => {
                      const selected = selections[serviceId] === professional.id;
                      return (
                        <div
                          key={professional.id}
                          className={
                            "group rounded-[1.75rem] border p-5 transition " +
                            (selected
                              ? "border-[#95634d] bg-[#f5e6db] shadow-[0_15px_30px_-18px_rgba(149,99,77,0.85)]"
                              : "border-[#ede0d6] bg-[#fcf8f5] hover:border-[#c9ac9f] hover:bg-[#fbf1e9]")
                          }
                        >
                          <div className="mb-4 overflow-hidden rounded-[1.5rem] bg-[#d9b9a7] text-white">
                            <div className="flex h-40 items-end justify-between bg-gradient-to-br from-[#b78c79] via-[#a56f57] to-[#95634d] p-4">
                              <div className="text-sm uppercase tracking-[0.2em] text-white/80">Gallery</div>
                              {selected && (
                                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#95634d] shadow-sm">
                                  ✓
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mb-4 flex items-center justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-semibold text-[#241b18]">
                                {professional.name}
                              </h3>
                              <p className="mt-1 text-sm text-[#6d5d55]">
                                {professional.location}
                              </p>
                            </div>
                            <div className="text-right text-sm text-[#6d5d55]">
                              <div className="font-semibold text-[#241b18]">{professional.rating.toFixed(1)}</div>
                              <div>{professional.reviews} reviews</div>
                            </div>
                          </div>

                          <p className="mb-4 text-sm leading-6 text-[#6d5d55]">
                            {professional.description}
                          </p>
                          <div className="mb-6 flex items-center justify-between gap-4 text-sm text-[#5d5048]">
                            <span>{professional.startingPrice}</span>
                          </div>

                          <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                              type="button"
                              onClick={() => setActiveProfile(professional)}
                              className="rounded-full border border-[#d8c8bf] bg-white px-5 py-3 text-sm font-semibold text-[#493b35] transition hover:border-[#c9ac9f] hover:bg-[#faf3ed]"
                            >
                              View Profile
                            </button>

                            <button
                              type="button"
                              onClick={() => handleSelect(serviceId, professional.id)}
                              className={
                                "rounded-full px-5 py-3 text-sm font-semibold transition " +
                                (selected
                                  ? "border border-[#95634d] bg-[#95634d] text-white hover:bg-[#7f523f]"
                                  : "border border-[#d8c8bf] bg-white text-[#493b35] hover:border-[#b9a08c] hover:bg-[#faf3ed]")
                              }
                            >
                              {selected ? "Selected" : "Select"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}

            {errors.length > 0 && (
              <div className="rounded-3xl border border-[#f0d7cc] bg-[#fff0ea] p-5 text-sm text-[#b45037]">
                {errors.map((message) => (
                  <p key={message}>{message}</p>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-4 rounded-[2rem] border border-[#e6d8cf] bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => router.push("/planner/services")}
                className="inline-flex items-center justify-center rounded-full border border-[#d8c8bf] px-6 py-4 text-sm font-semibold text-[#493b35] transition hover:border-[#b9a08c] hover:bg-[#faf3ed]"
              >
                ← Back to Services
              </button>

              <button
                type="button"
                onClick={handleContinue}
                className="inline-flex items-center justify-center rounded-full bg-[#95634d] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#7f523f]"
              >
                Continue to Date →
              </button>
            </div>
          </div>
        </div>
      </section>

      {activeProfile && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-6 md:p-10">
          <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-6 shadow-2xl sm:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#95634d]">{activeProfile.name}</p>
                <h2 className="mt-3 text-3xl font-semibold text-[#241b18]">
                  {activeProfile.category === "dj-music" ? "DJ & Music" : categoryLabels[activeProfile.category]}
                </h2>
                <p className="mt-3 text-sm text-[#6d5d55]">{activeProfile.location} · {activeProfile.rating.toFixed(1)} ★ · {activeProfile.reviews} reviews</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveProfile(null)}
                className="rounded-full border border-[#ddd1c7] bg-white p-3 text-[#493b35] transition hover:border-[#c9ac9f]"
              >
                ✕
              </button>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <div className="overflow-hidden rounded-[1.75rem] bg-[#d9b9a7] p-8 text-white">
                  <div className="flex h-64 flex-col justify-between">
                    <div className="text-sm uppercase tracking-[0.25em] text-white/80">Gallery</div>
                    <p className="text-3xl font-semibold">Image showcase</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[#241b18]">About</h3>
                    <p className="mt-3 text-sm leading-7 text-[#6d5d55]">{activeProfile.about}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-[#241b18]">Services</h3>
                    <ul className="mt-3 grid gap-2 text-sm text-[#5d5048] sm:grid-cols-2">
                      {activeProfile.services.map((serviceItem) => (
                        <li key={serviceItem} className="rounded-3xl border border-[#ede0d6] bg-[#fcf8f5] px-4 py-3">
                          {serviceItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-6 rounded-[2rem] border border-[#e6d8cf] bg-[#f9f0ea] p-6">
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.24em] text-[#95634d]">Summary</p>
                  <p className="text-lg font-semibold text-[#241b18]">{activeProfile.startingPrice}</p>
                  <p className="text-sm leading-7 text-[#6d5d55]">Available for wedding celebrations in Egypt with trusted service and beautiful presentation.</p>
                </div>

                <div className="space-y-4 rounded-[1.75rem] bg-white p-5">
                  <div className="flex items-center justify-between text-sm text-[#6d5d55]">
                    <span>Rating</span>
                    <span>{activeProfile.rating.toFixed(1)} ★</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-[#6d5d55]">
                    <span>Reviews</span>
                    <span>{activeProfile.reviews}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-[#6d5d55]">
                    <span>Location</span>
                    <span>{activeProfile.location}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleSelect(activeProfile.category, activeProfile.id);
                    setActiveProfile(null);
                  }}
                  className="w-full rounded-full bg-[#95634d] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#7f523f]"
                >
                  Select Professional
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
