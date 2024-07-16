import { GridColDef } from "@mui/x-data-grid";

import { FishingSpotProps } from "@api/service/fishing-spots/types";

export const columns: GridColDef<FishingSpotProps[][number]>[] = [
  {
    field: "permitNo",
    headerName: "Numer pozwolenia",
    filterable: true,
    flex: 1,
  },
  {
    field: "fullname",
    headerName: "Imię i nazwisko",
    filterable: true,
    flex: 1,
  },
  {
    field: "pesel",
    headerName: "Pesel",
    filterable: true,
    flex: 1,
  },
  {
    field: "area",
    headerName: "Okręg",
    filterable: true,
    flex: 1,
  },
  {
    field: "addedDate",
    headerName: "Data dodania",
    filterable: true,
    flex: 1,
  },
  {
    field: "isActive",
    headerName: "Ważne pozwolenie",
    type: "boolean",
    filterable: true,
    flex: 1,
  },
];
