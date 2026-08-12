"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type PlannerFormState = {
  name: string;
  partnerName: string;
  weddingDate: string;
  country: string;
  city: string;
  weddingType: string;
  guestCount: string;
  budget: string;
};

type FormErrors = Partial<Record<keyof PlannerFormState, string>>;

const storageKey = "rubaWeddingPlanner";

const initialFormState: PlannerFormState = {
  name: "",
  partnerName: "",
  weddingDate: "",
  country: "Egypt",
  city: "",
  weddingType: "",
  guestCount: "",
  budget: "",
};

const weddingTypes = [
  "Wedding",
  "Engagement",
  "Henna",
  "Aqiqah",
  "Birthday",
  "Other",
];

const guestCounts = [
  "1–50",
  "51–100",
  "101–200",
  "201–300",
  "300+",
];

const budgets = [
  "Under 10,000 EGP",
  "10,000–20,000 EGP",
  "20,000–40,000 EGP",
  "40,000–60,000 EGP",
  "60,000+ EGP",
  "I don’t know yet",
];

export default function PlannerPage() {
  const router = useRouter();
  const [form, setForm] = useState<PlannerFormState>(() => {
    if (typeof window === "undefined") return initialFormState;
    try {
      const raw = sessionStorage.getItem(storageKey);
      if (!raw) return initialFormState;
      const parsed = JSON.parse(raw) as Partial<PlannerFormState>;
      return { ...initialFormState, ...parsed } as PlannerFormState;
    } catch {
      return initialFormState;
    }
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isReady, _setIsReady] = useState<boolean>(typeof window !== "undefined");

  useEffect(() => {
    if (!isReady || typeof window === "undefined") {
      return;
    }

    const existing = sessionStorage.getItem(storageKey);
    let merged = form;

    if (existing) {
      try {
        const parsed = JSON.parse(existing);
        merged = { ...parsed, ...form };
      } catch {
        merged = form;
      }
    }

    sessionStorage.setItem(storageKey, JSON.stringify(merged));
  }, [form, isReady]);

  const setField = (
    field: keyof PlannerFormState,
    value: string
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!form.partnerName.trim()) {
      nextErrors.partnerName = "Please enter your partner’s name.";
    }

    if (!form.weddingDate) {
      nextErrors.weddingDate = "Please select your wedding date.";
    }

    if (!form.city.trim()) {
      nextErrors.city = "Please enter your wedding city.";
    }

    if (!form.weddingType) {
      nextErrors.weddingType = "Please select your wedding type.";
    }

    if (!form.guestCount) {
      nextErrors.guestCount = "Please select your guest count.";
    }

    if (!form.budget) {
      nextErrors.budget = "Please select an approximate budget.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    router.push("/planner/services");
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
                    (index === 0
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
              Let’s get started
            </p>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Let’s start planning your wedding.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#6d5d55]">Tell us a little about your celebration and we’ll help you build your perfect wedding team.</p>

            <div className="mt-10 grid gap-6 rounded-[2rem] border border-[#eaded7] bg-white p-6 shadow-sm sm:p-8">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.24em] text-[#95634d]">Planning at a glance</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-[#fcf5ef] p-5">
                    <p className="text-sm text-[#77655c]">Location</p>
                    <p className="mt-2 text-lg font-semibold text-[#241b18]">Egypt</p>
                  </div>
                  <div className="rounded-3xl bg-[#fcf5ef] p-5">
                    <p className="text-sm text-[#77655c]">Style</p>
                    <p className="mt-2 text-lg font-semibold text-[#241b18]">Premium planning for couples</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 rounded-3xl bg-[#f7ede7] p-5 text-sm text-[#5d5048]">
                <p className="font-semibold">Why Ruba Wedding AI?</p>
                <ul className="space-y-2">
                  <li>• A warm, elegant experience crafted for your celebration.</li>
                  <li>• Keep every detail organized in one beautiful workflow.</li>
                  <li>• Save progress between pages with session storage.</li>
                </ul>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-[#e6d8cf] bg-white p-8 shadow-sm sm:p-10"
          >
            <div className="grid gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-[#493b35]">
                  Your name
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => setField("name", event.target.value)}
                    className="w-full rounded-3xl border border-[#ddd1c7] bg-[#fcf8f5] px-4 py-3 text-sm text-[#241b18] outline-none transition focus:border-[#95634d] focus:ring-2 focus:ring-[#95634d]/20"
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="text-sm text-[#b45037]">{errors.name}</p>}
                </label>

                <label className="space-y-2 text-sm font-medium text-[#493b35]">
                  Partner’s name
                  <input
                    type="text"
                    value={form.partnerName}
                    onChange={(event) => setField("partnerName", event.target.value)}
                    className="w-full rounded-3xl border border-[#ddd1c7] bg-[#fcf8f5] px-4 py-3 text-sm text-[#241b18] outline-none transition focus:border-[#95634d] focus:ring-2 focus:ring-[#95634d]/20"
                    placeholder="Enter partner’s name"
                  />
                  {errors.partnerName && <p className="text-sm text-[#b45037]">{errors.partnerName}</p>}
                </label>
              </div>

              <label className="space-y-2 text-sm font-medium text-[#493b35]">
                Wedding date
                <input
                  type="date"
                  value={form.weddingDate}
                  onChange={(event) => setField("weddingDate", event.target.value)}
                  className="w-full rounded-3xl border border-[#ddd1c7] bg-[#fcf8f5] px-4 py-3 text-sm text-[#241b18] outline-none transition focus:border-[#95634d] focus:ring-2 focus:ring-[#95634d]/20"
                />
                {errors.weddingDate && <p className="text-sm text-[#b45037]">{errors.weddingDate}</p>}
              </label>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-[#493b35]">
                  Country
                  <select
                    value={form.country}
                    onChange={(event) => setField("country", event.target.value)}
                    className="w-full rounded-3xl border border-[#ddd1c7] bg-[#fcf8f5] px-4 py-3 text-sm text-[#241b18] outline-none transition focus:border-[#95634d] focus:ring-2 focus:ring-[#95634d]/20"
                  >
                    <option>Egypt</option>
                  </select>
                </label>

                <label className="space-y-2 text-sm font-medium text-[#493b35]">
                  City
                  <input
                    type="text"
                    value={form.city}
                    onChange={(event) => setField("city", event.target.value)}
                    className="w-full rounded-3xl border border-[#ddd1c7] bg-[#fcf8f5] px-4 py-3 text-sm text-[#241b18] outline-none transition focus:border-[#95634d] focus:ring-2 focus:ring-[#95634d]/20"
                    placeholder="Enter city"
                  />
                  {errors.city && <p className="text-sm text-[#b45037]">{errors.city}</p>}
                </label>
              </div>

              <label className="space-y-2 text-sm font-medium text-[#493b35]">
                Wedding type
                <select
                  value={form.weddingType}
                  onChange={(event) => setField("weddingType", event.target.value)}
                  className="w-full rounded-3xl border border-[#ddd1c7] bg-[#fcf8f5] px-4 py-3 text-sm text-[#241b18] outline-none transition focus:border-[#95634d] focus:ring-2 focus:ring-[#95634d]/20"
                >
                  <option value="">Select a type</option>
                  {weddingTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.weddingType && <p className="text-sm text-[#b45037]">{errors.weddingType}</p>}
              </label>

              <label className="space-y-2 text-sm font-medium text-[#493b35]">
                Estimated guest count
                <select
                  value={form.guestCount}
                  onChange={(event) => setField("guestCount", event.target.value)}
                  className="w-full rounded-3xl border border-[#ddd1c7] bg-[#fcf8f5] px-4 py-3 text-sm text-[#241b18] outline-none transition focus:border-[#95634d] focus:ring-2 focus:ring-[#95634d]/20"
                >
                  <option value="">Select a range</option>
                  {guestCounts.map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </select>
                {errors.guestCount && <p className="text-sm text-[#b45037]">{errors.guestCount}</p>}
              </label>

              <label className="space-y-2 text-sm font-medium text-[#493b35]">
                Approximate budget
                <select
                  value={form.budget}
                  onChange={(event) => setField("budget", event.target.value)}
                  className="w-full rounded-3xl border border-[#ddd1c7] bg-[#fcf8f5] px-4 py-3 text-sm text-[#241b18] outline-none transition focus:border-[#95634d] focus:ring-2 focus:ring-[#95634d]/20"
                >
                  <option value="">Select a budget</option>
                  {budgets.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.budget && <p className="text-sm text-[#b45037]">{errors.budget}</p>}
              </label>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full rounded-full bg-[#95634d] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#7f523f]"
              >
                Continue to Services →
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
