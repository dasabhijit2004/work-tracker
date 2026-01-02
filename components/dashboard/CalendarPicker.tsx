"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function CalendarPicker() {
  const router = useRouter();
  const params = useSearchParams();
  const date =
    params.get("date") || new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Select date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => {
          router.push(`/dashboard?date=${e.target.value}`);
        }}
        className="w-full rounded border px-3 py-2"
      />
    </div>
  );
}
