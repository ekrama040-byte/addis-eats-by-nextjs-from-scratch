"use client";

import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatShortDate } from "@/lib/orders/format";
import type { DailyOrders } from "@/lib/orders/types";

export function OrdersOverTimeChart({
  data,
  rangeLabel,
}: {
  data: DailyOrders[];
  rangeLabel: string;
}) {
  return (
    <section
      aria-labelledby="orders-over-time-heading"
      className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
    >
      <h2
        id="orders-over-time-heading"
        className="text-lg font-semibold text-gray-900"
      >
        Orders over time — {rangeLabel} (orders per day)
      </h2>

      <p className="mt-1 text-sm text-gray-600">
        Daily count of non-cancelled orders.
      </p>

      <div className="mt-4 h-80 w-full min-w-0">
        {data.length === 0 ? (
          <p className="pt-8 text-sm text-gray-500">
            No order activity is available.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 16, right: 16, bottom: 8, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="date"
                tickFormatter={formatShortDate}
                tickLine={false}
                fontSize={12}
              />

              <YAxis
                allowDecimals={false}
                tickLine={false}
                fontSize={12}
                width={32}
              />

              <Tooltip
                labelFormatter={(label) =>
                  formatShortDate(String(label))
                }
                formatter={(value) => [
                  ${Number(value)} orders,
                  "Orders per day",
                ]}
              />

              <Line
                type="monotone"
                dataKey="orders"
                name="Orders per day"
                stroke="#1d4ed8"
                strokeWidth={3}
                strokeDasharray="6 3"
                dot={{ r: 5, fill: "#ffffff", strokeWidth: 2 }}
                activeDot={{ r: 7 }}
              >
                <LabelList
                  dataKey="orders"
                  position="top"
                  fontSize={11}
                />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}