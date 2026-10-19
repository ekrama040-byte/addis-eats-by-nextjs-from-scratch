export type OrderStatus =
  | "pending"
  | "processing"
  | "completed"
  | "cancelled";

export type Order = {
  id: string;
  customerName: string;
  createdAt: string;
  status: OrderStatus;
  total: number;
};

export type DailySummary = {
  date: string;
  orders: number;
  revenue: number;
};

export type DashboardSummary = {
  totalOrders: number;
  totalRevenue: number;
  daily: DailySummary[];
};

export type SortKey = "createdAt" | "customerName" | "status" | "total";

export type SortDirection = "asc" | "desc";