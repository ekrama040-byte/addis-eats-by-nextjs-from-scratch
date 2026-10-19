"use client";

import { useEffect } from "react";
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";

const courier = { lat: 9.025, lng: 38.746 };
const destination = { lat: 9.035, lng: 38.752 };

function FitMarkers() {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(
      L.latLngBounds(
        [courier.lat, courier.lng],
        [destination.lat, destination.lng]
      ),
      { padding: [35, 35], maxZoom: 15 }
    );
  }, [map]);

  return null;
}

export default function DeliveryMap() {
  return (
    <div className="h-[360px] w-full overflow-hidden rounded-xl border">
      <MapContainer
        center={[courier.lat, courier.lng]}
        zoom={13}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitMarkers />

        <CircleMarker
          center={[courier.lat, courier.lng]}
          radius={9}
          pathOptions={{ color: "#2563eb", fillOpacity: 1 }}
        >
          <Popup>Courier — demo location</Popup>
        </CircleMarker>

        <CircleMarker
          center={[destination.lat, destination.lng]}
          radius={9}
          pathOptions={{ color: "#ea580c", fillOpacity: 1 }}
        >
          <Popup>Delivery destination — demo location</Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
}