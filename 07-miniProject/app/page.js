import OrderStatus from "@/app/components/OrderStatus";
import FoodSearch from "@/app/components/FoodSearch";
import { getFoods } from "@/lib/foods";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
};

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;

  const search = (params.search ?? "").trim();
  const requestedPage = Number(params.page ?? "1");

  const page =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const initialFoods = getFoods("", page);
  const initialSearchFoods = getFoods(search, page);

  const initialPage = search
    ? initialSearchFoods.pagination.page
    : initialFoods.pagination.page;

  const initialOrder = {
    orderId: "AE-1001",
    status: "on_the_way",
    customer: "Ekram",
    restaurant: "Addis Traditional Kitchen",
    total: 420,
    estimatedMinutes: 12,
    updatedAt: new Date().toISOString(),
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
            Ethiopian food delivery
          </p>

          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900">
            Addis Eats
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600">
            Discover traditional Ethiopian dishes and keep track of your
            delivery in one place.
          </p>
        </header>

        <OrderStatus initialOrder={initialOrder} />

        <FoodSearch
          initialSearch={search}
          initialPage={initialPage}
          initialFoods={initialFoods}
          initialSearchFoods={initialSearchFoods}
        />
      </div>
    </main>
  );
}