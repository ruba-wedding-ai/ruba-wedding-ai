"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { providers as allProviders, categoryLabels, Provider } from "../../../data/providers";

const plannerStorageKey = "rubaWeddingPlanner";
const servicesStorageKey = "rubaWeddingServices";
const professionalsStorageKey = "rubaWeddingProfessionals";
const requestsStorageKey = "rubaWeddingRequests";

type PlannerFormState = {
  name?: string;
  partnerName?: string;
  weddingDate?: string;
  country?: string;
  city?: string;
  weddingType?: string;
  guestCount?: string;
  budget?: string;
};

type ServiceId = "photography" | "videography" | "dj-music" | "beauty";

export default function PlannerReviewPage() {
  const router = useRouter();
  const [isReady] = useState<boolean>(typeof window !== "undefined");
  const [plannerData] = useState<PlannerFormState>(() => {
    if (typeof window === "undefined") return {} as PlannerFormState;
    try {
      const raw = sessionStorage.getItem(plannerStorageKey);
      return raw ? (JSON.parse(raw) as PlannerFormState) : ({} as PlannerFormState);
    } catch {
      return {} as PlannerFormState;
    }
  });
  const [selectedServices] = useState<ServiceId[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = sessionStorage.getItem(servicesStorageKey);
      return raw ? (JSON.parse(raw) as ServiceId[]) : [];
    } catch {
      return [];
    }
  });
  const [selectedProfessionals] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return {} as Record<string, string>;
    try {
      const raw = sessionStorage.getItem(professionalsStorageKey);
      return raw ? (JSON.parse(raw) as Record<string, string>) : ({} as Record<string, string>);
    } catch {
      return {} as Record<string, string>;
    }
  });
  const [error, setError] = useState<string | null>(null);
  const [successRequestId, setSuccessRequestId] = useState<string | null>(null);

  // initial state is derived from sessionStorage above; no effect needed

  const selectedProfessionalDetails = useMemo(() => {
    return Object.entries(selectedProfessionals)
      .map(([, professionalId]) => {
        const professional = allProviders.find((p) => p.id === professionalId);
        if (!professional) return null;
        return { ...professional } as Provider;
      })
      .filter(Boolean) as Provider[];
  }, [selectedProfessionals]);

  const handleSend = () => {
    setError(null);

    // Validate required planner fields
    if (!plannerData.name || !plannerData.partnerName) {
      setError("Please complete your couple\u2019s names in Wedding Details.");
      return;
    }

    if (!plannerData.weddingDate) {
      setError("Please select a wedding date.");
      return;
    }

    if (!selectedServices || selectedServices.length === 0) {
      setError("Please select at least one service.");
      return;
    }

    // Ensure each selected service has a professional selected
    const missing = selectedServices.filter((s) => !selectedProfessionals[s]);
    if (missing.length > 0) {
      setError("Please choose a professional for each selected service.");
      return;
    }

    // build request object
    const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    const request = {
      id,
      couple: {
        name: plannerData.name,
        partnerName: plannerData.partnerName,
      },
      wedding: {
        date: plannerData.weddingDate,
        country: plannerData.country,
        city: plannerData.city,
        weddingType: plannerData.weddingType,
        guestCount: plannerData.guestCount,
        budget: plannerData.budget,
      },
      services: selectedServices,
      professionals: selectedProfessionals,
      preferredDate: plannerData.weddingDate,
      status: "pending",
      createdAt: new Date().toISOString(),
    } as const;

    try {
      const existingRaw = sessionStorage.getItem(requestsStorageKey);
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      existing.push(request);
      sessionStorage.setItem(requestsStorageKey, JSON.stringify(existing));
      sessionStorage.setItem("rubaWeddingLatestRequestId", id);
      setSuccessRequestId(id);
    } catch {
      setError("Failed to save request. Please try again.");
      return;
    }
  };

  if (!isReady) {
    return <div className="min-h-screen bg-[#fcf8f5]" />;
  }

  if (successRequestId) {
    return (
      <main className="min-h-screen bg-[#fcf8f5] text-[#241b18]">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="rounded-[2rem] border border-[#e6d8cf] bg-white p-10 text-center shadow-sm">
            <div className="mb-6">
              <div className="mx-auto mb-4 h-20 w-20 items-center justify-center rounded-full bg-[#f5e6db] text-3xl font-semibold text-[#95634d] flex">✓</div>
              <h1 className="text-3xl font-semibold">Your request has been sent.</h1>
              <p className="mt-3 text-sm text-[#6d5d55]">Your selected wedding professionals will be contacted to confirm availability.</p>
            </div>

            <div className="mt-6 rounded-3xl border border-[#f0d7cc] bg-[#fff6f0] p-6 text-left">
              <p className="font-semibold">Request status: <span className="text-[#241b18]">Pending confirmation</span></p>
              <p className="mt-2 text-sm text-[#6d5d55]">Ruba Wedding AI will coordinate with your selected professionals. Your booking is not confirmed until availability is verified.</p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => router.push("/")}
                className="rounded-full border border-[#d8c8bf] bg-white px-6 py-3 text-sm font-semibold text-[#493b35]"
              >
                Back to Home
              </button>

              <button
                onClick={() => router.push("/planner/request")}
                className="rounded-full bg-[#95634d] px-6 py-3 text-sm font-semibold text-white"
              >
                View My Request
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcf8f5] text-[#241b18]">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
        <header className="rounded-[2rem] border border-[#e6d8cf] bg-white/90 p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#95634d] text-2xl font-semibold text-white">R</div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#95634d]">Ruba Wedding AI</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Your Wedding Journey</h1>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {["Wedding Details", "Services", "Professionals", "Date", "Review"].map((item, index) => (
                <div
                  key={item}
                  className={
                    "rounded-3xl border px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] " +
                    (index === 4 ? "border-[#95634d] bg-[#95634d] text-white" : "border-[#e5d5cc] bg-white text-[#77655c]")
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
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#95634d]">Review</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Your wedding plan is ready.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#6d5d55]">Review your details before we send your request to the professionals you’ve selected.</p>

            <div className="mt-10 rounded-[2rem] border border-[#eaded7] bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#95634d]">Final check</p>
              <p className="mt-4 text-sm leading-7 text-[#5d5048]">Before sending, please confirm the summary below. This action does not book or charge any professional.</p>
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-[2rem] border border-[#e6d8cf] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#95634d]">Couple</p>
                  <h3 className="mt-2 text-xl font-semibold text-[#241b18]">{plannerData.name ?? "-"} & {plannerData.partnerName ?? "-"}</h3>
                </div>
                <button onClick={() => router.push('/planner')} className="rounded-full border border-[#d8c8bf] px-4 py-2 text-sm font-semibold text-[#493b35]">Edit</button>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#fcf8f5] p-4">
                  <p className="text-sm text-[#6d5d55]">Wedding type</p>
                  <p className="mt-1 font-semibold">{plannerData.weddingType ?? "-"}</p>
                </div>
                <div className="rounded-2xl bg-[#fcf8f5] p-4">
                  <p className="text-sm text-[#6d5d55]">Location</p>
                  <p className="mt-1 font-semibold">{plannerData.city ?? plannerData.country ?? "-"}</p>
                </div>
                <div className="rounded-2xl bg-[#fcf8f5] p-4">
                  <p className="text-sm text-[#6d5d55]">Wedding date</p>
                  <p className="mt-1 font-semibold">{plannerData.weddingDate ? new Date(plannerData.weddingDate).toLocaleDateString() : "-"}</p>
                </div>
                <div className="rounded-2xl bg-[#fcf8f5] p-4">
                  <p className="text-sm text-[#6d5d55]">Guests</p>
                  <p className="mt-1 font-semibold">{plannerData.guestCount ?? "-"}</p>
                </div>
                <div className="rounded-2xl bg-[#fcf8f5] p-4 sm:col-span-2">
                  <p className="text-sm text-[#6d5d55]">Budget</p>
                  <p className="mt-1 font-semibold">{plannerData.budget ?? "-"}</p>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#e6d8cf] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#95634d]">Services</p>
                  <h3 className="mt-2 text-xl font-semibold text-[#241b18]">Selected services</h3>
                </div>
                <button onClick={() => router.push('/planner/services')} className="rounded-full border border-[#d8c8bf] px-4 py-2 text-sm font-semibold text-[#493b35]">Edit</button>
              </div>

              <ul className="mt-4 grid gap-3">
                {selectedServices.length === 0 && <li className="text-sm text-[#6d5d55]">No services selected.</li>}
                {selectedServices.map((s) => (
                  <li key={s} className="rounded-2xl bg-[#fcf8f5] p-4 text-sm font-semibold">{categoryLabels[s as ServiceId]}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-[2rem] border border-[#e6d8cf] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#95634d]">Your wedding team</p>
                  <h3 className="mt-2 text-xl font-semibold text-[#241b18]">Selected professionals</h3>
                </div>
                <button onClick={() => router.push('/planner/professionals')} className="rounded-full border border-[#d8c8bf] px-4 py-2 text-sm font-semibold text-[#493b35]">Edit</button>
              </div>

              <div className="mt-4 grid gap-4">
                {selectedProfessionalDetails.length === 0 && <div className="text-sm text-[#6d5d55]">No professionals selected.</div>}
                {selectedProfessionalDetails.map((p) => (
                  <div key={p.id} className="rounded-2xl bg-[#fcf8f5] p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm text-[#6d5d55]">{categoryLabels[p.category]}</div>
                        <div className="mt-1 text-lg font-semibold text-[#241b18]">{p.name}</div>
                        <div className="text-sm text-[#6d5d55]">{p.location}</div>
                      </div>
                      <div className="text-right text-sm text-[#6d5d55]">
                        <div className="font-semibold text-[#241b18]">{p.startingPrice}</div>
                        <div className="mt-1">{p.rating?.toFixed(1)} ★</div>
                        <div className="mt-2 text-xs text-[#6d5d55]">Availability will be confirmed</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#e6d8cf] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#95634d]">Wedding date</p>
                  <h3 className="mt-2 text-xl font-semibold text-[#241b18]">{plannerData.weddingDate ? new Date(plannerData.weddingDate).toLocaleDateString() : "-"}</h3>
                </div>
                <button onClick={() => router.push('/planner/date')} className="rounded-full border border-[#d8c8bf] px-4 py-2 text-sm font-semibold text-[#493b35]">Edit</button>
              </div>

              <p className="mt-4 text-sm text-[#6d5d55]">Your selected professionals will confirm their availability after you submit your request.</p>
            </section>

            {error && <div className="rounded-3xl border border-[#f0d7cc] bg-[#fff0ea] p-4 text-sm text-[#b45037]">{error}</div>}

            <div className="mt-6">
              <p className="mb-4 text-sm text-[#6d5d55]">By submitting this request, you understand that your wedding services are not confirmed yet. Ruba Wedding AI will coordinate availability with the selected professionals.</p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button onClick={() => router.push('/planner/date')} className="rounded-full border border-[#d8c8bf] px-6 py-3 text-sm font-semibold text-[#493b35]">← Back</button>

                <button onClick={handleSend} className="rounded-full bg-[#95634d] px-6 py-3 text-sm font-semibold text-white">Send Request to My Wedding Team</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
