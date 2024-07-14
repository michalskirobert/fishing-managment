import { DataGridProps } from "@mui/x-data-grid";

export interface TableProps<T> extends DataGridProps {
  data: T[];
  containerHeight?: number | string;
  containerWidth?: number | string;
}
