import { GridColDef } from "@mui/x-data-grid";

import { FishingSpotProps } from "@api/service/fishing-spots/types";

export const columns: GridColDef<FishingSpotProps[][number]>[] = [
  { field: "code", headerName: "Kod", filterable: true, flex: 1 },
  {
    field: "name",
    headerName: "Nazwa",
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
  },
  {
    field: "leaseFrom",
    headerName: "Data dzierżawy od",
    filterable: true,
    flex: 1,
  },
  {
    field: "leaseTo",
    headerName: "Data dzierżawy do",
    filterable: true,
    flex: 1,
  },
  {
    field: "isNoKill",
    headerName: "Złów i wypuść",
    type: "boolean",
    filterable: true,
  },
];
