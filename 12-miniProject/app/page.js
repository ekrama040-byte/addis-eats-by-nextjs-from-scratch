// app/page.js
export const dynamic = "force-dynamic";
import TrackingClient from "./components/TrackingClient";

export const dynamic = "force-dynamic";

export default function Home() {
  const initialStatus = {
    orderId: "AE-1001",
    status: "preparing",
    label: "Preparing your order",
    updatedAt: new Date().toISOString(),
    total: 420,
    courierAddress: "Near Meskel Square, Addis Ababa",
    deliveryAddress: "Bole, Addis Ababa",
    courier: { lat: 9.025, lng: 38.746 },
    destination: { lat: 9.035, lng: 38.752 },
  };

  return <TrackingClient initialStatus={initialStatus} />;
}
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