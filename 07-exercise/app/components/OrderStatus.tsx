"use client";

import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import { etb, when, relative } from "../../lib/format";

type Order = {
  orderId: string;
  status: string;
  label: string;
  total: number;
  updatedAt: string;
  courierAddress: string;
  deliveryAddress: string;
};

export default function OrderStatus({
  initialOrder,
}: {
  initialOrder: Order;
}) {
  const { data, error, isLoading, isValidating } = useSWR<Order>(
    /api/orders/${encodeURIComponent(initialOrder.orderId)},
    fetcher,
    {
      fallbackData: initialOrder,
      refreshInterval: 5000,
      revalidateOnFocus: true,
    }
  );

  const order = data ?? initialOrder;

  return (
    <section className="space-y-4 rounded-xl border p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">
          Order {order.orderId}
        </h1>

        <span
          role="status"
          aria-live="polite"
          className="rounded-full border px-3 py-2 text-sm"
        >
          {error
            ? "Refresh failed"
            : isValidating
              ? "Updating..."
              : "Up to date"}
        </span>
      </div>

      {isLoading && !data && <p>Loading order...</p>}

      <h2 className="text-lg font-semibold">{order.label}</h2>
      <p>Status: {order.status}</p>
      <p>Total: {etb(order.total)}</p>
      <p>Last updated: {when(order.updatedAt)}</p>
      <p>{relative(order.updatedAt)}</p>

      <div>
        <h3 className="font-semibold">Courier</h3>
        <p>{order.courierAddress}</p>
      </div>

      <div>
        <h3 className="font-semibold">Delivery destination</h3>
        <p>{order.deliveryAddress}</p>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-700">
          Couldn't refresh the order. Showing the last available data.
        </p>
      )}
    </section>
  );
}