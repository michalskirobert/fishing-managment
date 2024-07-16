import { LeafletEvent } from "leaflet";
import { useState } from "react";
import { useMapEvents } from "react-leaflet";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface MapServiceProps<T extends FieldValues> {
  control: Control<T>;
  name?: string;
}

export const useMapService = <T extends FieldValues>({
  control,
  name,
}: MapServiceProps<T>) => {
  const {
    field: { value, onChange },
  } = useController({ control, name: name as Path<T> });

  const [zoom, setZoom] = useState<number>(12);

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    const newMarker = { lat: e.latlng.lat, lng: e.latlng.lng };

    onChange(newMarker); // Add the new marker to the state
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
    value,
    onChange,
  };
};
