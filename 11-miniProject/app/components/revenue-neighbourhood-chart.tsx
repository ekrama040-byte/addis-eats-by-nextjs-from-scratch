import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatCompactETB, formatETB } from "@/lib/orders/format";
import type { NeighbourhoodRevenue } from "@/lib/orders/types";

export function RevenueNeighbourhoodChart({
  data,
}: {
  data: NeighbourhoodRevenue[];
}) {
  return (
    <section
      aria-labelledby="neighbourhood-revenue-heading"
      className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
    >
      <h2
        id="neighbourhood-revenue-heading"
        className="text-lg font-semibold text-gray-900"
      >
        Revenue by neighbourhood
      </h2>

      <p className="mt-1 text-sm text-gray-600">
        Total eligible order revenue (ETB), by neighbourhood.
      </p>

      <div className="mt-4 h-80 w-full min-w-0">
        {data.length === 0 ? (
          <p className="pt-8 text-sm text-gray-500">
            No neighbourhood revenue data is available.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 8, right: 48, bottom: 8, left: 12 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
              />

              <XAxis
                type="number"
                tickFormatter={formatCompactETB}
                tickLine={false}
                fontSize={12}
              />

              <YAxis
                type="category"
                dataKey="neighbourhood"
                width={95}
                tickLine={false}
                fontSize={12}
              />

              <Tooltip
                formatter={(value) => [
                  formatETB(Number(value)),
                  "Revenue",
                ]}
              />

              <Bar
                dataKey="revenue"
                name="Revenue"
                fill="#0f766e"
                radius={[0, 5, 5, 0]}
                maxBarSize={30}
              >
                <LabelList
                  dataKey="revenue"
                  position="right"
                  formatter={(value) =>
                    formatCompactETB(Number(value))
                  }
                  fontSize={11}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}