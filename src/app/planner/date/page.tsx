"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const plannerStorageKey = "rubaWeddingPlanner";
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
  },
];

const categoryLabels: Record<ServiceId, string> = {
  photography: "Photography",
  videography: "Videography",
  "dj-music": "DJ & Music",
  beauty: "Beauty & Makeup",
};

const categoryIcons: Record<ServiceId, string> = {
  photography: "📷",
  videography: "🎥",
  "dj-music": "🎧",
  beauty: "💄",
};

function formatDateLabel(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return "No date selected yet";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function PlannerDatePage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedProfessionals, setSelectedProfessionals] = useState<Record<ServiceId, string>>({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const plannerData = sessionStorage.getItem(plannerStorageKey);
    const storedProfessionals = sessionStorage.getItem(professionalsStorageKey);

    if (plannerData) {
      try {
        const parsed = JSON.parse(plannerData) as { weddingDate?: string };
        setSelectedDate(parsed.weddingDate ?? "");
      } catch {
        setSelectedDate("");
      }
    }

    if (storedProfessionals) {
      try {
        setSelectedProfessionals(JSON.parse(storedProfessionals));
      } catch {
        setSelectedProfessionals({});
      }
    }

    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady || typeof window === "undefined") {
      return;
    }
    const plannerData = sessionStorage.getItem(plannerStorageKey);
    let merged = { weddingDate: selectedDate };
    if (plannerData) {
      try {
        merged = { ...JSON.parse(plannerData), weddingDate: selectedDate };
      } catch {
        merged = { weddingDate: selectedDate };
      }
    }
    sessionStorage.setItem(plannerStorageKey, JSON.stringify(merged));
  }, [selectedDate, isReady]);

  const selectedProfessionalDetails = useMemo(() => {
    return Object.entries(selectedProfessionals)
      .map(([category, professionalId]) => {
        const professional = professionals.find((item) => item.id === professionalId);
        if (!professional) {
          return null;
        }
        return { category: category as ServiceId, ...professional };
      })
      .filter(Boolean) as Array<Professional & { category: ServiceId }>;
  }, [selectedProfessionals]);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (selectedProfessionalDetails.length === 0) {
      router.push("/planner/professionals");
    }
  }, [isReady, selectedProfessionalDetails, router]);

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
                    (index === 3
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
              Preferred date
            </p>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
              Choose your wedding date.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#6d5d55]">
              Let's check your preferred date and prepare your wedding team.
            </p>

            <div className="mt-10 rounded-[2rem] border border-[#eaded7] bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-[#95634d]">Selected date</p>
                  <p className="mt-3 text-3xl font-semibold text-[#241b18]">
                    {selectedDate ? formatDateLabel(selectedDate) : "No date selected"}
                  </p>
                </div>
                <div className="rounded-[1.75rem] bg-[#f9f0ea] px-5 py-4 text-sm text-[#5d5048]">
                  Availability matters
                  <p className="mt-2 text-sm leading-6 text-[#6d5d55]">
                    Your selected professionals will need to confirm their availability before your wedding is booked.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="space-y-3 rounded-[1.75rem] border border-[#ede0d6] bg-[#fcf8f5] p-5">
                  <label className="text-sm font-semibold uppercase tracking-[0.24em] text-[#95634d]">
                    Wedding date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    min={today}
                    onChange={(event) => setSelectedDate(event.target.value)}
                    className="w-full rounded-3xl border border-[#ddd1c7] bg-white px-4 py-3 text-sm text-[#241b18] outline-none transition focus:border-[#95634d] focus:ring-2 focus:ring-[#95634d]/20"
                  />
                </div>

                <div className="space-y-3 rounded-[1.75rem] border border-[#ede0d6] bg-[#fff7f0] p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#95634d]">
                    Status
                  </p>
                  <p className="text-lg font-semibold text-[#241b18]">Availability will be confirmed</p>
                  <p className="text-sm leading-6 text-[#6d5d55]">
                    This is a preferred date for your wedding team. Final confirmation comes later from your professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {selectedProfessionalDetails.map((professional) => (
              <div
                key={professional.id}
                className="rounded-[2rem] border border-[#e6d8cf] bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-[#95634d]">
                      <span>{categoryIcons[professional.category]}</span>
                      <span>{categoryLabels[professional.category]}</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-[#241b18]">{professional.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#6d5d55]">{professional.location}</p>
                  </div>
                  <div className="rounded-3xl bg-[#f7ede7] px-4 py-3 text-right text-sm text-[#5d5048]">
                    <div className="font-semibold text-[#241b18]">{professional.rating.toFixed(1)} ★</div>
                    <div>{professional.reviews} reviews</div>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.75rem] bg-[#fcf8f5] p-4 text-sm text-[#6d5d55]">
                    <p className="font-semibold text-[#241b18]">Starting price</p>
                    <p className="mt-2">{professional.startingPrice}</p>
                  </div>
                  <div className="rounded-[1.75rem] bg-[#faf2ed] p-4 text-sm text-[#6d5d55]">
                    <p className="font-semibold text-[#241b18]">Category</p>
                    <p className="mt-2">{categoryLabels[professional.category]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 rounded-[2rem] border border-[#e6d8cf] bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => router.push("/planner/professionals")}
            className="inline-flex items-center justify-center rounded-full border border-[#d8c8bf] px-6 py-4 text-sm font-semibold text-[#493b35] transition hover:border-[#b9a08c] hover:bg-[#faf3ed]"
          >
            ← Back to Professionals
          </button>

          <button
            type="button"
            onClick={() => router.push("/planner/review")}
            className="inline-flex items-center justify-center rounded-full bg-[#95634d] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#7f523f]"
          >
            Continue to Review →
          </button>
        </div>
      </section>
    </main>
  );
}
