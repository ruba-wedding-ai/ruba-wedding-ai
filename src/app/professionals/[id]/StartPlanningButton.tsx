"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function StartPlanningButton({ providerId }: { providerId: string }) {
  const router = useRouter();

  const handle = () => {
    try {
      sessionStorage.setItem("rubaPreferredProvider", providerId);
    } catch {
      // ignore
    }
    router.push("/planner");
  };

  return (
    <button onClick={handle} className="rounded-full bg-[#95634d] px-4 py-2 text-sm font-semibold text-white">
      Start Planning With This Professional
    </button>
  );
}
