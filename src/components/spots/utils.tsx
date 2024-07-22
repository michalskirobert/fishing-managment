import { GridColDef } from "@mui/x-data-grid";

import { FishingSpotProps } from "@api/service/fishing-spots/types";
import { BooleanProvider } from "@src/shared/table/providers/boolean";

export const columns: GridColDef<FishingSpotProps[][number]>[] = [
  { field: "code", headerName: "Kod", filterable: true, flex: 1 },
  {
    field: "name",
    headerName: "Nazwa",
    filterable: true,
    flex: 1,
  },
  {
    field: "district",
    headerName: "Okręg",
    filterable: true,
    flex: 1,
  },
  {
    field: "club",
    headerName: "Koło",
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
  {
    field: "isLeaseEnd",
    headerName: "Zakończone",
    type: "boolean",
    filterable: true,
  },
];
