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