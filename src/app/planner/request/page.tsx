"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const requestsStorageKey = "rubaWeddingRequests";
const latestRequestIdKey = "rubaWeddingLatestRequestId";

type SavedRequest = {
  id: string;
  couple: { name?: string; partnerName?: string };
  wedding: {
    date?: string;
    country?: string;
    city?: string;
    weddingType?: string;
    guestCount?: string;
    budget?: string;
  };
  services?: string[];
  professionals?: Record<string, string>;
  status?: string;
  createdAt?: string;
};

export default function PlannerRequestPage() {
  const router = useRouter();
  const [request, setRequest] = useState<SavedRequest | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const latestId = sessionStorage.getItem(latestRequestIdKey);
      const raw = sessionStorage.getItem(requestsStorageKey);
      if (!raw) {
        setRequest(null);
        return;
      }
      const list = JSON.parse(raw) as SavedRequest[];
      if (latestId) {
        const found = list.find((r) => r.id === latestId) ?? null;
        setRequest(found);
      } else {
        // fallback to last item
        setRequest(list[list.length - 1] ?? null);
      }
    } catch (e) {
      setRequest(null);
    }
  }, []);

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
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="rounded-[2rem] border border-[#e6d8cf] bg-white p-8 shadow-sm">
            {request ? (
              <div>
                <h2 className="text-2xl font-semibold text-[#241b18]">Request details</h2>
                <p className="mt-2 text-sm text-[#6d5d55]">A copy of the request you submitted.</p>

                <div className="mt-6 grid gap-4">
                  <div className="rounded-2xl bg-[#fcf8f5] p-4">
                    <p className="text-sm text-[#6d5d55]">Couple</p>
                    <p className="mt-1 text-lg font-semibold">{request.couple?.name ?? "-"} &amp; {request.couple?.partnerName ?? "-"}</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-[#fcf8f5] p-4">
                      <p className="text-sm text-[#6d5d55]">Wedding date</p>
                      <p className="mt-1 font-semibold">{request.wedding?.date ? new Date(request.wedding.date).toLocaleDateString() : "-"}</p>
                    </div>
                    <div className="rounded-2xl bg-[#fcf8f5] p-4">
                      <p className="text-sm text-[#6d5d55]">Location</p>
                      <p className="mt-1 font-semibold">{request.wedding?.city ?? request.wedding?.country ?? "-"}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#fcf8f5] p-4">
                    <p className="text-sm text-[#6d5d55]">Wedding type</p>
                    <p className="mt-1 font-semibold">{request.wedding?.weddingType ?? "-"}</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-[#fcf8f5] p-4">
                      <p className="text-sm text-[#6d5d55]">Guest count</p>
                      <p className="mt-1 font-semibold">{request.wedding?.guestCount ?? "-"}</p>
                    </div>
                    <div className="rounded-2xl bg-[#fcf8f5] p-4">
                      <p className="text-sm text-[#6d5d55]">Budget</p>
                      <p className="mt-1 font-semibold">{request.wedding?.budget ?? "-"}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#fcf8f5] p-4">
                    <p className="text-sm text-[#6d5d55]">Selected services</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {request.services && request.services.length > 0 ? (
                        request.services.map((s) => (
                          <span key={s} className="rounded-full bg-white/60 px-3 py-1 text-sm font-semibold text-[#493b35] border border-[#eaded7]">{s}</span>
                        ))
                      ) : (
                        <span className="text-sm text-[#6d5d55]">No services</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-3xl border border-[#f0d7cc] bg-[#fff6f0] p-4 text-sm text-[#6d5d55]">
                  <p className="font-semibold">Request status: <span className="text-[#241b18]">{request.status ?? "-"}</span></p>
                  <p className="mt-2">This request was created on {request.createdAt ? new Date(request.createdAt).toLocaleString() : "-"}. Ruba Wedding AI will coordinate availability with your selected professionals.</p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-xl font-semibold">No request found</h2>
                <p className="mt-2 text-sm text-[#6d5d55]">We couldn't find a submitted request. Please complete the planner to create a request.</p>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => router.push('/')} className="rounded-full bg-[#95634d] px-6 py-3 text-sm font-semibold text-white">Back to Home</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
