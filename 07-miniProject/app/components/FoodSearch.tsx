"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import { etb } from "../../lib/format";

type Food = {
  id: number;
  name: string;
  category: string;
  price: number;
};

type FoodResponse = {
  items: Food[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export default function FoodSearch({
  initialPage = 1,
}: {
  initialPage?: number;
}) {
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedTerm(term.trim());
      setPage(1);
    }, 400);

    return () => window.clearTimeout(timer);
  }, [term]);

  const key = debouncedTerm
    ? /api/foods?search=${encodeURIComponent(
        debouncedTerm
      )}&page=${page}
    : null;

  const { data, error, isLoading, isValidating } =
    useSWR<FoodResponse>(key, fetcher, {
      keepPreviousData: true,
      revalidateOnFocus: true,
    });

  function changePage(nextPage: number) {
    setPage(nextPage);

    const params = new URLSearchParams();

    if (debouncedTerm) {
      params.set("search", debouncedTerm);
    }

    params.set("page", String(nextPage));

    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      query ? ?${query} : window.location.pathname
    );
  }

  return (
    <section className="space-y-5">
      <div>
        <label htmlFor="food-search" className="mb-2 block font-semibold">
          Search foods
        </label>
        <input
          id="food-search"
          type="search"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Try Doro Wat or vegetarian"
          className="min-h-11 w-full rounded-lg border px-4
                     focus-visible:outline-none
                     focus-visible:ring-2
                     focus-visible:ring-orange-500"
        />
        <p className="mt-2 text-sm text-gray-500" aria-live="polite">
          {term.trim()
            ? Searching for "${term.trim()}"...
            : "Enter a search term to load foods."}
        </p>
      </div>

      {error && (
        <p role="alert" className="text-red-700">
          Failed to load foods. Try searching again.
        </p>
      )}

      {isLoading && !data && <p>Loading foods...</p>}

      {data && (
        <>
          <p className="text-sm text-gray-600" role="status">
            {isValidating ? "Updating results..." : ${data.total} results}
          </p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((food) => (
              <article key={food.id} className="rounded-xl border p-4">
                <h2 className="font-semibold">{food.name}</h2>
                <p className="text-sm text-gray-500">{food.category}</p>
                <p className="mt-2">{etb(food.price)}</p>
              </article>
            ))}
          </div>

          <nav
            aria-label="Food search pagination"
            className="flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => changePage(page - 1)}
              className="min-h-11 rounded-lg border px-4 disabled:opacity-50"
            >
              Previous
            </button>

            <span>
              Page {data.page} of {data.totalPages}
            </span>

            <button
              type="button"
              disabled={page >= data.totalPages}
              onClick={() => changePage(page + 1)}
              className="min-h-11 rounded-lg border px-4 disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </>
      )}
    </section>
  );
}