import type { DashboardSummary } from "@/lib/orders/types";
import { formatETB } from "@/lib/orders/format";

export function DashboardSummaryCards({
  summary,
}: {
  summary: DashboardSummary;
}) {
  const cards = [
    {
      label: "Total orders",
      value: summary.totalOrders.toLocaleString("en-ET"),
      note: "Excluding cancelled orders",
    },
    {
      label: "Revenue",
      value: formatETB(summary.totalRevenue),
      note: "Based on the selected 7-day range",
    },
    {
      label: "Average order value",
      value: formatETB(
        summary.totalOrders > 0
          ? summary.totalRevenue / summary.totalOrders
          : 0,
      ),
      note: "Revenue divided by eligible orders",
    },
  ];

  return (
    <section
      aria-label="Order and revenue summary"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {cards.map((card) => (
        <article
          key={card.label}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <h2 className="text-sm font-medium text-gray-500">
            {card.label}
          </h2>

          <p className="mt-3 break-words text-2xl font-bold text-gray-900">
            {card.value}
          </p>

          <p className="mt-2 text-xs text-gray-500">
            {card.note}
          </p>
        </article>
      ))}
    </section>
  );
}