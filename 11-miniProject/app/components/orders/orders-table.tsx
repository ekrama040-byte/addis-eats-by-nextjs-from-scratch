 import Link from "next/link";

import { formatDate, formatETB } from "@/lib/orders/format";
import { ordersHref } from "@/lib/orders/query";

import type {
  Order,
  SortDirection,
  SortKey,
} from "@/lib/orders/types";

export function OrdersTable({
  orders,
  sort,
  direction,
}: {
  orders: Order[];
  sort: SortKey;
  direction: SortDirection;
}) {
  function headerLink(key: SortKey): string {
    const nextDirection =
      sort === key && direction === "asc" ? "desc" : "asc";

    return ordersHref({
      sort: key,
      direction: nextDirection,
      page: 1,
    });
  }

  function sortAttribute(key: SortKey) {
    if (sort !== key) return undefined;

    return direction === "asc" ? "ascending" : "descending";
  }

  const headers: {
    key: SortKey;
    label: string;
    align: "left" | "right";
  }[] = [
    { key: "createdAt", label: "Date", align: "left" },
    { key: "customerName", label: "Customer", align: "left" },
    { key: "neighbourhood", label: "Neighbourhood", align: "left" },
    { key: "status", label: "Status", align: "left" },
    { key: "total", label: "Total (ETB)", align: "right" },
  ];

  return (
    <section
      aria-labelledby="orders-table-heading"
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
    >
      <div className="border-b border-gray-200 p-5">
        <h2
          id="orders-table-heading"
          className="text-lg font-semibold"
        >
          Orders
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Select a column heading to sort the order list.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-sm">
          <caption className="sr-only">
            Orders sorted by {sort}, {direction}ending.
          </caption>

          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left">
                Order ID
              </th>

              {headers.map((header) => (
                <th
                  key={header.key}
                  scope="col"
                  aria-sort={sortAttribute(header.key)}
                  className={px-4 py-3 ${
                    header.align === "right"
                      ? "text-right"
                      : "text-left"
                  }}
                >
                  <Link
                    href={headerLink(header.key)}
                    className="font-semibold underline-offset-4 hover:underline"
                  >
                    {header.label}
                    {sort === header.key && (
                      <span aria-hidden="true">
                        {direction === "asc" ? " ↑" : " ↓"}
                      </span>
                    )}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <th
                  scope="row"
                  className="whitespace-nowrap px-4 py-3 text-left font-medium"
                >
                  {order.id}
                </th>
                <td className="px-4 py-3">
                  {formatDate(order.createdAt)}
                </td>
                <td className="px-4 py-3">
                  {order.customerName}
                </td>
                <td className="px-4 py-3">
                  {order.neighbourhood}
                </td>
                <td className="px-4 py-3 capitalize">
                  {order.status}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums">
                  {formatETB(order.total)}
                </td>
              </tr>
            ))}
{orders.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}