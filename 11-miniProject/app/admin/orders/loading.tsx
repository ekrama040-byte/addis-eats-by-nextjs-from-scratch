export default function LoadingOrders() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading dashboard"
      className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8"
    >
      <div className="h-8 w-72 animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-96 max-w-full animate-pulse rounded bg-gray-100" />

      <div className="grid gap-6 xl:grid-cols-2">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="h-96 animate-pulse rounded-2xl border border-gray-200 bg-gray-100"
          />
        ))}
      </div>

      <div className="h-72 animate-pulse rounded-2xl border border-gray-200 bg-gray-100" />

      <p className="text-sm text-gray-500">
        Loading dashboard data…
      </p>
    </main>
  );
}