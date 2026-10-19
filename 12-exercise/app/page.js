// app/page.js
export const dynamic = "force-dynamic";
export default function HomePage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Welcome to the Food Order App</h1>
      <p>This is the Home Page.</p>
    </main>
  );
}
export type CsvColumn = {
  key: string;
  label: string;
};

export function escapeCsvValue(value: unknown): string;

export function toCsv(
  rows: object[],
  columns: CsvColumn[]
): string;