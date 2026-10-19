"use client";

import { useEffect } from "react";

export default function OrdersError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Orders dashboard error:", error);
  }, [error]);

  return (
    <main className="mx-auto max-w-3xl p-6 sm:p-8">
      <section
        role="alert"
        className="rounded-2xl border border-red-200 bg-white p-8"
      >
        <h1 className="text-xl font-semibold text-gray-900">
          Unable to load the dashboard
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          We couldn't retrieve the order data. Please try again.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          Try again
        </button>
      </section>
    </main>
  );
}