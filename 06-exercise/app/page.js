import OrderStatus from "./components/OrderStatus";
import OrderStatus from "./components/OrderStatus";
import FoodSearch from "./components/FoodSearch";

export const dynamic = "force-dynamic";

export default async function Home() {
  const initialOrder = {
    orderId: "AE-1001",
    status: "on_the_way",
    label: "Your order is on the way",
    total: 420,
    updatedAt: new Date().toISOString(),
    courierAddress: "Near Meskel Square, Addis Ababa",
    deliveryAddress: "Bole, Addis Ababa",
  };

  return (
    <main className="mx-auto max-w-5xl space-y-12 px-4 py-8">
      <OrderStatus initialOrder={initialOrder} />

      <section>
        <h1 className="mb-5 text-3xl font-bold">
          Explore foods
        </h1>
        <FoodSearch />
      </section>
    </main>
  );
}

export const dynamic = "force-dynamic";

type Order = {
  orderId: string;
  status: string;
  label: string;
  total: number;
  updatedAt: string;
  courierAddress: string;
  deliveryAddress: string;
};

async function getInitialOrder(): Promise<Order> {
  return {
    orderId: "AE-1001",
    status: "on_the_way",
    label: "Your order is on the way",
    total: 420,
    updatedAt: new Date().toISOString(),
    courierAddress: "Near Meskel Square, Addis Ababa",
    deliveryAddress: "Bole, Addis Ababa",
  };
}

export default async function Home() {
  const order = await getInitialOrder();

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <OrderStatus initialOrder={order} />
    </main>
  );
}
export default function HomePage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Welcome to the Food Order App</h1>
      <p>This is the Home Page.</p>
    </main>
  );
}
