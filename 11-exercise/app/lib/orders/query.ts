import type {
  SortDirection,
  SortKey,
} from "./types";

export type SearchValue = string | string[] | undefined;

export type OrdersSearchParams = {
  sort?: SearchValue;
  direction?: SearchValue;
  page?: SearchValue;
  demoState?: SearchValue;
};

function firstValue(value: SearchValue): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

const ALLOWED_SORTS: SortKey[] = [
  "createdAt",
  "customerName",
  "status",
  "total",
];

export function parseSort(value: SearchValue): SortKey {
  const candidate = firstValue(value);

  return ALLOWED_SORTS.includes(candidate as SortKey)
    ? (candidate as SortKey)
    : "createdAt";
}

export function parseDirection(
  value: SearchValue,
): SortDirection {
  return firstValue(value) === "asc" ? "asc" : "desc";
}

export function parsePage(value: SearchValue): number {
  const raw = firstValue(value);

  if (!raw || !/^\d+$/.test(raw)) {
    return 1;
  }

  const page = Number(raw);

  return Number.isSafeInteger(page) && page > 0
    ? page
    : 1;
}

export function makeOrdersHref(
  values: {
    sort: SortKey;
    direction: SortDirection;
    page: number;
  },
): string {
  const params = new URLSearchParams();

  params.set("sort", values.sort);
  params.set("direction", values.direction);
  params.set("page", String(values.page));

  return /admin/orders?${params.toString()};
}