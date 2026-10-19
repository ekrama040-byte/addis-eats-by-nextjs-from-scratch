"use client";

import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

type Point = {
  lat: number;
  lng: number;
};

const courier: Point = { lat: 9.025, lng: 38.746 };
const delivery: Point = { lat: 9.035, lng: 38.752 };

function FitBothPoints() {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds(
      [courier.lat, courier.lng],
      [delivery.lat, delivery.lng]
    );

    map.fitBounds(bounds, {
      padding: [40, 40],
      maxZoom: 15,
    });
  }, [map]);

  return null;
}

export default function DeliveryMap() {
  return (
    <div className="h-[320px] w-full overflow-hidden rounded-xl border sm:h-[400px]">
      <MapContainer
        center={[courier.lat, courier.lng]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBothPoints />

        <CircleMarker
          center={[courier.lat, courier.lng]}
          radius={9}
          pathOptions={{ color: "#2563eb", fillOpacity: 1 }}
        >
          <Popup>Courier location (demo)</Popup>
        </CircleMarker>

        <CircleMarker
          center={[delivery.lat, delivery.lng]}
          radius={9}
          pathOptions={{ color: "#ea580c", fillOpacity: 1 }}
        >
          <Popup>Delivery destination (demo)</Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
}