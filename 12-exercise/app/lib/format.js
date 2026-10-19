const currencyFormatter = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("en-ET", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Addis_Ababa",
});

export function etb(value) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "—";
  }

  return currencyFormatter.format(amount);
}

export function when(value) {
  const date = value instanceof Date ? value : new Date(value);

  if (!Number.isFinite(date.getTime())) {
    return "Unknown time";
  }

  return dateFormatter.format(date);
}

export function relative(value, now = Date.now()) {
  const date = value instanceof Date ? value : new Date(value);
  const timestamp = date.getTime();

  if (!Number.isFinite(timestamp)) {
    return "Unknown time";
  }

  const seconds = Math.round((timestamp - now) / 1000);
  const absolute = Math.abs(seconds);

  if (absolute < 60) {
    return seconds <= 0 ? "Just now" : "In less than a minute";
  }

  const minutes = Math.round(seconds / 60);

  if (Math.abs(minutes) < 60) {
    return minutes < 0
      ? ${Math.abs(minutes)} min ago
      : In ${minutes} min;
  }

  const hours = Math.round(minutes / 60);

  if (Math.abs(hours) < 24) {
    return hours < 0
      ? ${Math.abs(hours)} hr ago
      : In ${hours} hr;
  }

  const days = Math.round(hours / 24);

  return days < 0
    ? ${Math.abs(days)} days ago
    : In ${days} days;
}