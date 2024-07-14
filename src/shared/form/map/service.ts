import { LeafletEvent } from "leaflet";
import { useState } from "react";

export const useMapService = () => {
  const [zoom, setZoom] = useState<number>(12);

  const setLocation = (e: LeafletEvent) => {
    const position = e.target.getLatLng();

    const value = { lat: position.lat, lng: position.lng };

    return value;
  };

  return {
    setLocation,
    setZoom,
    zoom,
  };
};
