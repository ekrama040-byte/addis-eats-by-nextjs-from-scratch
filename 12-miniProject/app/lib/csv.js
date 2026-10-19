export function escapeCsvValue(value) {
  const text = String(value ?? "");

  if (/[",\r\n]/.test(text)) {
    return "${text.replace(/"/g, '""')}";
  }

  return text;
}

export function toCsv(rows, columns) {
  return [
    columns.map((column) => escapeCsvValue(column.label)).join(","),
    ...rows.map((row) =>
      columns
        .map((column) => escapeCsvValue(row[column.key]))
        .join(",")
    ),
  ].join("\r\n") + "\r\n";
}