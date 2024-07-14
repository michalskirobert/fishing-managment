import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { localeText } from "./utils";
import { TableProps } from "./types";
import { CustomNoRowsOverlay } from "./components/custom-no-rows-overlay";
import LoadingIcon from "./components/custom-loader";

export const Table = <T,>({
  containerHeight,
  containerWidth,
  data,
  ...dataGrid
}: TableProps<T>) => {
  return (
    <div
      style={{
        height: containerHeight || 400,
        width: containerWidth || "100%",
      }}
    >
      <DataGrid
        {...{
          ...dataGrid,
          rows: data,
          filterMode: "server",
          getRowId: (row) => row._id,
          slots: {
            toolbar: GridToolbar,
            noRowsOverlay: CustomNoRowsOverlay,
            loadingOverlay: LoadingIcon,
          },
          localeText,
        }}
      />
    </div>
  );
};
