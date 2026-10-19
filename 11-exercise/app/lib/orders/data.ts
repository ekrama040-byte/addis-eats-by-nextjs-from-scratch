 import type {
  DashboardSummary,
  DailySummary,
  Order,
  OrderStatus,
  SortDirection,
  SortKey,
} from "./types";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

function getDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function getSampleOrders(): Order[] {
  const today = new Date();
  const daysAgo = (days: number) =>
    getDateKey(new Date(today.getTime() - days * DAY_IN_MS));

  return [
    {
      id: "AE-1001",
      customerName: "Mekdes",
      createdAt: ${daysAgo(0)}T08:15:00.000Z,
      status: "completed",
      total: 650,
    },
    {
      id: "AE-1002",
      customerName: "Dawit",
      createdAt: ${daysAgo(0)}T10:20:00.000Z,
      status: "processing",
      total: 420,
    },
    {
      id: "AE-1003",
      customerName: "Hana",
      createdAt: ${daysAgo(1)}T12:30:00.000Z,
      status: "completed",
      total: 850,
    },
    {
      id: "AE-1004",
      customerName: "Abel",
      createdAt: ${daysAgo(1)}T15:00:00.000Z,
      status: "pending",
      total: 300,
    },
    {
      id: "AE-1005",
      customerName: "Sara",
      createdAt: ${daysAgo(2)}T09:00:00.000Z,
      status: "completed",
      total: 1200,
    },
    {
      id: "AE-1006",
      customerName: "Yonas",
      createdAt: ${daysAgo(3)}T11:45:00.000Z,
      status: "cancelled",
      total: 500,
    },
    {
      id: "AE-1007",
      customerName: "Liya",
      createdAt: ${daysAgo(4)}T13:10:00.000Z,
      status: "completed",
      total: 720,
    },
    {
      id: "AE-1008",
      customerName: "Samuel",
      createdAt: ${daysAgo(5)}T16:20:00.000Z,
      status: "processing",
      total: 400,
    },
    {
      id: "AE-1009",
      customerName: "Rahel",
      createdAt: ${daysAgo(6)}T08:30:00.000Z,
      status: "completed",
      total: 980,
    },
  ];
}

/**
 * Development demo controls:
 * ?demoState=empty
 * ?demoState=error
 *
 * The page handles loading separately.
 * Replace this sample data source with your real database query.
 */
export async function getOrders(
  demoState?: string,
): Promise<Order[]> {
  if (
    process.env.NODE_ENV === "development" &&
    demoState === "error"
  ) {
    throw new Error("Simulated orders data failure.");
  }

  if (
    process.env.NODE_ENV === "development" &&
    demoState === "empty"
  ) {
    return [];
  }

  return getSampleOrders();
}

export function aggregateOrders(
  orders: Order[],
  days = 7,
): DashboardSummary {
  const dailyMap = new Map<string, DailySummary>();
  const today = new Date();

  for (let offset = days - 1; offset >= 0; offset--) {
    const date = getDateKey(
      new Date(today.getTime() - offset * DAY_IN_MS),
    );

    dailyMap.set(date, {
      date,
      orders: 0,
      revenue: 0,
    });
  }

  let totalRevenue = 0;
  let totalOrders = 0;

  for (const order of orders) {
    // Cancelled orders are excluded from order and revenue totals.
    if (order.status === "cancelled") {
      continue;
    }

    const date = getDateKey(new Date(order.createdAt));
    const daily = dailyMap.get(date);

    totalOrders += 1;
    totalRevenue += order.total;

    if (daily) {
      daily.orders += 1;
      daily.revenue += order.total;
    }
  }

  return {
    totalOrders,
    totalRevenue,
    daily: Array.from(dailyMap.values()),
  };
}

function compareOrders(
  a: Order,
  b: Order,
  sort: SortKey,
): number {
  switch (sort) {
    case "customerName":
      return a.customerName.localeCompare(b.customerName);

    case "status":
      return a.status.localeCompare(b.status);

    case "total":
      return a.total - b.total;

    case "createdAt":
    default:
      return (
        new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime()
      );
  }
}

export function sortOrders(
  orders: Order[],
  sort: SortKey,
  direction: SortDirection,
): Order[] {
  return [...orders].sort((a, b) => {
    const result = compareOrders(a, b, sort);

    if (result !== 0) {
      return direction === "asc" ? result : -result;
    }
return a.id.localeCompare(b.id);
  });
}

export function isOrderStatus(value: string): value is OrderStatus {
  return [
    "pending",
    "processing",
    "completed",
    "cancelled",
  ].includes(value);
}