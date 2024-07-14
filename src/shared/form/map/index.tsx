import { Box, FormControl, Tooltip } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Info } from "@mui/icons-material";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LeafletEvent } from "leaflet";

import { useMapService } from "./service";

import "leaflet/dist/leaflet.css";

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  name?: string;
  label?: string;
  tooltip?: string;
  hide?: boolean;
}

export const CustomMap = <T extends FieldValues>({
  control,
  hide,
  tooltip,
  name,
  label,
}: CustomInputProps<T>) => {
  const { setLocation, setZoom, zoom } = useMapService();

  if (hide) return null;

  return (
    <Controller
      name={name as Path<T>}
      control={control}
      render={({ field: { value, name, onChange } }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FormControl fullWidth>
            <label>{label}</label>
            <MapContainer
              {...{
                zoom,
                name,
                style: { height: "300px", width: "100%" },
                keyboard: false,
                center: value,
                onzoomend: (e: LeafletEvent) => setZoom(e.target._zoom),
              }}
            >
              <TileLayer
                {...{
                  keyboard: false,
                  attribution:
                    "&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors",
                  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                }}
              />
              <Marker
                {...{
                  keyboard: false,
                  position: value,
                  draggable: true,
                  onDragend: (e: LeafletEvent) => onChange(setLocation(e)),
                }}
              >
                <Popup>Dodane łowisko</Popup>
              </Marker>
            </MapContainer>
          </FormControl>
          {tooltip && (
            <Tooltip title={tooltip}>
              <Info />
            </Tooltip>
          )}
        </Box>
      )}
    />
  );
};
