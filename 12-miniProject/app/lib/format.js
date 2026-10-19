const etbFormatter = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("en-ET", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Addis_Ababa",
});

const relativeFormatter = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
});

export function etb(value) {
  const amount = Number(value);
  return Number.isFinite(amount) ? etbFormatter.format(amount) : "—";
}

export function when(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Unknown time"
    : dateFormatter.format(date);
}

export function relative(value, now = Date.now()) {
  const date = new Date(value);
  const timestamp = date.getTime();

  if (Number.isNaN(timestamp)) return "Unknown time";

  const seconds = Math.round((timestamp - now) / 1000);

  if (Math.abs(seconds) < 60) {
    return relativeFormatter.format(seconds, "second");
  }

  const minutes = Math.round(seconds / 60);

  if (Math.abs(minutes) < 60) {
    return relativeFormatter.format(minutes, "minute");
  }

  const hours = Math.round(minutes / 60);

  if (Math.abs(hours) < 24) {
    return relativeFormatter.format(hours, "hour");
  }

  return relativeFormatter.format(Math.round(hours / 24), "day");
}