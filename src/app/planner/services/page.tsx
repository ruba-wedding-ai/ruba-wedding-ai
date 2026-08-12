"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const plannerStorageKey = "rubaWeddingPlanner";
const servicesStorageKey = "rubaWeddingServices";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

const services: ServiceItem[] = [
  {
    id: "photography",
    title: "Photography",
    description: "Capture every meaningful moment of your celebration.",
    icon: "📷",
  },
  {
    id: "videography",
    title: "Videography",
    description: "Create beautiful films you'll remember for years.",
    icon: "🎥",
  },
  {
    id: "dj-music",
    title: "DJ & Music",
    description: "Set the mood and keep your celebration moving.",
    icon: "🎧",
  },
  {
    id: "beauty",
    title: "Beauty & Makeup",
    description: "Find beauty professionals for your special day.",
    icon: "💄",
  },
];

export default function PlannerServicesPage() {
  const router = useRouter();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [error, setError] = useState(""
  );
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const saved = sessionStorage.getItem(servicesStorageKey);
    if (saved) {
      try {
        setSelectedServices(JSON.parse(saved));
      } catch {
        // ignore invalid saved data
      }
    }

    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady || typeof window === "undefined") {
      return;
    }
    sessionStorage.setItem(servicesStorageKey, JSON.stringify(selectedServices));
  }, [selectedServices, isReady]);

  const toggleService = (serviceId: string) => {
    setError("");
    setSelectedServices((current) =>
      current.includes(serviceId)
        ? current.filter((id) => id !== serviceId)
        : [...current, serviceId]
    );
  };

  const handleContinue = () => {
    if (selectedServices.length === 0) {
      setError("Please choose at least one service to continue.");
      return;
    }

    const weddingDetails = sessionStorage.getItem(plannerStorageKey);
    if (!weddingDetails) {
      router.push("/planner");
      return;
    }

    router.push("/planner/professionals");
  };

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
                    (index === 1
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
              Next step
            </p>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
              What do you need for your wedding?
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#6d5d55]">
              Choose the services you'd like help finding. You can select more than one.
            </p>

            <div className="mt-10 rounded-[2rem] border border-[#eaded7] bg-white p-6 shadow-sm sm:p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[#95634d]">
                Your planning support
              </div>
              <p className="mt-4 text-sm leading-7 text-[#5d5048]">
                We keep your choices together so your wedding team can be tailored to your vision.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#e6d8cf] bg-white p-8 shadow-sm sm:p-10">
            <div className="grid gap-5">
              {services.map((service) => {
                const selected = selectedServices.includes(service.id);
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className={
                      "group flex w-full items-center gap-5 rounded-[1.75rem] border p-5 text-left transition " +
                      (selected
                        ? "border-[#95634d] bg-[#f5e6db] shadow-[0_10px_30px_-18px_rgba(149,99,77,0.75)]"
                        : "border-[#ede0d6] bg-[#fcf8f5] hover:border-[#c9ac9f] hover:bg-[#fbf1e9]")
                    }
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#fde8d9] text-2xl text-[#95634d]">
                      {service.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-lg font-semibold text-[#241b18]">
                          {service.title}
                        </span>
                        {selected && (
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#95634d] text-white">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[#6d5d55]">
                        {service.description}
                      </p>
                    </div>
                  </button>
                );
              })}

              {error && <p className="text-sm text-[#b45037]">{error}</p>}

              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => router.push("/planner")}
                  className="inline-flex items-center justify-center rounded-full border border-[#d8c8bf] px-6 py-4 text-sm font-semibold text-[#493b35] transition hover:border-[#b9a08c] hover:bg-[#faf3ed]"
                >
                  ← Back
                </button>

                <button
                  type="button"
                  onClick={handleContinue}
                  className="inline-flex items-center justify-center rounded-full bg-[#95634d] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#7f523f]"
                >
                  Continue to Professionals →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
