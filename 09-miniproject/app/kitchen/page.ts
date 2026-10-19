import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function KitchenPage() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in?next=%2Fkitchen");
  }

  if (session.role !== "staff") {
    redirect("/");
  }

  const orders = await prisma.order.findMany({
    where: {
      status: "PENDING",
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Kitchen Dashboard
      </h1>

      {orders.map((order) => (
        <article key={order.id} className="mb-4 rounded border p-4">
          <p>Order: {order.id}</p>
          <p>Status: {order.status}</p>
        </article>
      ))}
    </main>
  );
}