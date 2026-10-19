export type CsvColumn = {
  key: string;
  label: string;
};

export function escapeCsvValue(value: unknown): string;

export function toCsv(
  rows: Record<string, unknown>[],
  columns: CsvColumn[]
): string;