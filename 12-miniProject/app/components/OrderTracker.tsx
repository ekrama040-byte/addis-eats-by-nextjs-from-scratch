[10/19/2026 3:11 AM] EKRAM: "use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { etb, when, relative } from "../../lib/format";
import { toCsv } from "../../lib/csv";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-[320px] w-full items-center justify-center rounded-xl border bg-gray-100 sm:h-[400px]"
      role="status"
    >
      Loading delivery map...
    </div>
  ),
});

type OrderStatus =
  | "preparing"
  | "picked_up"
  | "on_the_way"
  | "delivered";

type StatusEvent = {
  orderId: string;
  status: OrderStatus;
  label: string;
  updatedAt: string;
};

type Props = {
  orderId: string;
  initialStatus: StatusEvent;
};

export default function OrderTracker({
  orderId,
  initialStatus,
}: Props) {
  const [status, setStatus] = useState(initialStatus);
  const [connection, setConnection] = useState("Connecting");
  const [history, setHistory] = useState<StatusEvent[]>([
    initialStatus,
  ]);
  const sourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (status.status === "delivered") return;

    const source = new EventSource(
      /api/orders/${encodeURIComponent(orderId)}/stream
    );

    sourceRef.current = source;
    setConnection("Connecting");

    source.onopen = () => setConnection("Connected");

    source.addEventListener("status", (event: MessageEvent) => {
      try {
        const next = JSON.parse(event.data) as StatusEvent;

        if (next.orderId !== orderId) return;

        setStatus(next);
        setHistory((previous) => {
          if (
            previous.some(
              (item) =>
                item.status === next.status &&
                item.updatedAt === next.updatedAt
            )
          ) {
            return previous;
          }

          return [...previous, next];
        });

        if (next.status === "delivered") {
          source.close();
          sourceRef.current = null;
          setConnection("Completed");
        }
      } catch {
        setConnection("Invalid server message");
      }
    });

    source.onerror = () => {
      if (source.readyState === EventSource.CLOSED) {
        setConnection("Disconnected");
      } else {
        setConnection("Reconnecting");
      }
    };

    return () => {
      source.close();
      sourceRef.current = null;
    };
  }, [orderId, initialStatus.status]);

  function exportCsv() {
    const csv = toCsv(history, [
      { key: "orderId", label: "Order ID" },
      { key: "status", label: "Status" },
      { key: "label", label: "Description" },
      { key: "updatedAt", label: "Updated at" },
    ]);

    const blob = new Blob(["\uFEFF", csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = order-${orderId}-timeline.csv;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-600">Order tracking</p>
          <h1 className="text-3xl font-bold">Order #{orderId}</h1>
        </div>

        <span
          role="status"
          aria-live="polite"
          className="rounded-full border px-3 py-2 text-sm"
        >
          Stream: {connection}
        </span>
      </header>

      <section className="rounded-xl border p-5">
        <h2 className="text-xl font-semibold">{status.label}</h2>
        <p className="mt-2 text-gray-600">
          Last update: {when(status.updatedAt)} (
          {relative(status.updatedAt)})
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Sample order total: {etb(420)}
        </p>
      </section>
[10/19/2026 3:11 AM] EKRAM: <section>
        <h2 className="mb-3 text-xl font-semibold">
          Courier and delivery destination
        </h2>
        <DeliveryMap />
        <p className="mt-3 text-sm text-gray-600">
          The blue marker represents the courier. The orange marker
          represents the delivery destination. The map is fitted to
          show both locations; these are illustrative coordinates.
        </p>
      </section>

      <section>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">Status history</h2>
          <button
            type="button"
            onClick={exportCsv}
            className="min-h-11 rounded-lg bg-orange-600 px-4
                       font-semibold text-white
                       focus-visible:outline-none
                       focus-visible:ring-2
                       focus-visible:ring-orange-500
                       focus-visible:ring-offset-2"
          >
            Export CSV
          </button>
        </div>

        <ol className="mt-4 space-y-3">
          {history.map((item, index) => (
            <li
              key={${item.status}-${item.updatedAt}}
              className="rounded-lg border p-4"
            >
              <p className="font-semibold">
                {index + 1}. {item.label}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                {when(item.updatedAt)}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}