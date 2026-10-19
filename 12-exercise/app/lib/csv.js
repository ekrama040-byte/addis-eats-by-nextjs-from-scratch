export function escapeCsvValue(value) {
  const text = String(value ?? "");

  if (/[",\r\n]/.test(text)) {
    return "${text.replace(/"/g, '""')}";
  }

  return text;
}

export function toCsv(rows, columns) {
  const header = columns.map((column) =>
    escapeCsvValue(column.label)
  );

  const records = rows.map((row) =>
    columns.map((column) =>
      escapeCsvValue(row[column.key])
    )
  );

  return [header, ...records]
    .map((record) => record.join(","))
    .join("\r\n") + "\r\n";
}