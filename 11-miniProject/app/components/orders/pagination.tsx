import Link from "next/link";

import { ordersHref } from "@/lib/orders/query";
import type {
  SortDirection,
  SortKey,
} from "@/lib/orders/types";

export function Pagination({
  page,
  totalPages,
  sort,
  direction,
}: {
  page: number;
  totalPages: number;
  sort: SortKey;
  direction: SortDirection;
}) {
  return (
    <nav
      aria-label="Order pagination"
      className="flex flex-wrap items-center justify-between gap-3"
    >
      <p className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </p>

      <div className="flex gap-2">
        {page > 1 ? (
          <Link
            rel="prev"
            href={ordersHref({
              sort,
              direction,
              page: page - 1,
            })}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
          >
            Previous
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-400"
          >
            Previous
          </span>
        )}

        {page < totalPages ? (
          <Link
            rel="next"
            href={ordersHref({
              sort,
              direction,
              page: page + 1,
            })}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700"
          >
            Next
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-400"
          >
            Next
          </span>
        )}
      </div>
    </nav>
  );
}