import Link from "next/link";

export function EmptyOrders() {
  return (
    <section
      aria-labelledby="empty-orders-title"
      className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center"
    >
      <div
        aria-hidden="true"
        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl"
      >
        📦
      </div>

      <h2
        id="empty-orders-title"
        className="mt-4 text-xl font-semibold text-gray-900"
      >
        No orders yet
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
        When customers place orders, your order history and revenue
        analytics will appear here.
      </p>

      <Link
        href="/"
        className="mt-5 inline-flex rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
      >
        Return to home
      </Link>
    </section>
  );
}