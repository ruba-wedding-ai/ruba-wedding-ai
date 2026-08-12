import { getProviderById, categoryLabels } from "../../../data/providers";
import Link from "next/link";
import StartPlanningButton from "./StartPlanningButton";

type Params = { params: { id: string } };

export default function ProviderProfile({ params }: Params) {
  const id = params.id;
  const provider = getProviderById(id);

    if (!provider) {
    return (
      <main className="min-h-screen bg-[#fcf8f5] text-[#241b18]">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="rounded-[2rem] border border-[#e6d8cf] bg-white p-10 text-center shadow-sm">
            <h1 className="text-2xl font-semibold">Provider not found</h1>
            <p className="mt-3 text-sm text-[#6d5d55]">We couldn’t find that provider. Please return to the directory.</p>
            <div className="mt-6">
              <Link href="/professionals" className="rounded-full bg-[#95634d] px-6 py-3 text-sm font-semibold text-white">Back to Directory</Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcf8f5] text-[#241b18]">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="rounded-[2rem] border border-[#e6d8cf] bg-white p-8 shadow-sm">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#95634d]">{provider.name}</p>
              <h1 className="mt-2 text-3xl font-semibold text-[#241b18]">{provider.name}</h1>
              <p className="mt-2 text-sm text-[#6d5d55]">{provider.location} · {provider.rating.toFixed(1)} ★ · {provider.reviewCount} reviews</p>
            </div>

            <div className="space-y-3 text-right">
              <div className="text-sm font-semibold">{provider.startingPrice}</div>
              <StartPlanningButton providerId={provider.id} />
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            <div>
              <div className="overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-[#ead7cc] to-[#f6efe9] p-6">
                <div className="h-64 w-full rounded-lg bg-[#d9b9a7]" />
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-semibold">About</h3>
                <p className="text-sm text-[#6d5d55]">{provider.about ?? provider.description}</p>

                <h3 className="text-xl font-semibold">Services</h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {provider.services.map((s) => (
                    <li key={s} className="rounded-3xl border border-[#ede0d6] bg-[#fcf8f5] px-4 py-2 text-sm">{s}</li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-2xl border border-[#e6d8cf] bg-[#fff7f0] p-4">
                <div className="text-sm text-[#6d5d55]">Category</div>
                  <div className="mt-1 font-semibold">{categoryLabels[provider.category]}</div>
              </div>

              <div className="rounded-2xl border border-[#e6d8cf] bg-[#fcf8f5] p-4">
                <div className="text-sm text-[#6d5d55]">Rating</div>
                <div className="mt-1 font-semibold">{provider.rating.toFixed(1)} ★</div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
