import { LeafletEvent } from "leaflet";
import { useState } from "react";
import { useMapEvents } from "react-leaflet";

export const useMapService = () => {
  const [zoom, setZoom] = useState<number>(12);
  const [marker, setMarker] = useState<{ lat: number; lng: number }>();

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    const newMarker = { lat: e.latlng.lat, lng: e.latlng.lng };

    setMarker(newMarker); // Add the new marker to the state
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });

    return null;
  };

  const setLocation = (e: LeafletEvent) => {
    const position = e.target.getLatLng();

    const value = { lat: position.lat, lng: position.lng };

    return value;
  };

  return {
    setLocation,
    setZoom,
    zoom,
    MapClickHandler,
    marker,
    setMarker,
  };
};
