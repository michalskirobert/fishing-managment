import { BooleanProvider } from "@src/shared/table/providers/boolean";
import { IColumnProps } from "devextreme-react/cjs/data-grid";

import { createRoot } from "react-dom/client";

export const columns: IColumnProps[] = [
  {
    dataField: "code",
    caption: "Kod",
    allowSorting: true,
    visible: true,
    allowHeaderFiltering: false,
  },
  {
    dataField: "name",
    caption: "Nazwa",
    allowSorting: true,
    visible: true,
    allowHeaderFiltering: false,
  },
  {
    dataField: "district",
    caption: "Okręg",
    allowSorting: true,
    visible: true,
    allowHeaderFiltering: false,
  },
  {
    dataField: "club",
    caption: "Koło",
    allowSorting: true,
    visible: true,
    allowHeaderFiltering: false,
  },
  {
    dataField: "addedDate",
    caption: "Data dodania",
    allowSorting: true,
    dataType: "date",
    visible: true,
    allowHeaderFiltering: false,
  },
  {
    dataField: "editDate",
    caption: "Data edycji",
    allowSorting: true,
    dataType: "date",
    visible: true,
    allowHeaderFiltering: false,
  },
  {
    dataField: "leaseFrom",
    caption: "Data dzierżawy od",
    allowSorting: true,
    dataType: "date",
    visible: true,
    allowHeaderFiltering: false,
  },
  {
    dataField: "leaseTo",
    caption: "Data dzierżawy do",
    dataType: "date",
    allowSorting: true,
    visible: true,
    allowHeaderFiltering: false,
  },
  {
    dataField: "surfaceArea",
    caption: "Powierzchnia (ha)",
    dataType: "number",
    allowSorting: true,
    visible: true,
    allowHeaderFiltering: false,
  },
  {
    dataField: "type",
    caption: "Typ łowiska",
    allowSorting: true,
    visible: true,
    allowHeaderFiltering: false,
  },
  {
    dataField: "isNoKill",
    caption: "Złów i wypuść",
    dataType: "boolean",
    allowSorting: true,
    visible: true,
    allowHeaderFiltering: false,
    cellTemplate: (container, options) => {
      const root = createRoot(container);
      root.render(
        <BooleanProvider {...{ container, value: options.data?.isNoKill }} />
      );
    },
  },
  {
    dataField: "isLeaseEnd",
    caption: "Zakończone",
    dataType: "boolean",
    allowSorting: true,
    visible: true,
    allowHeaderFiltering: false,
    cellTemplate: (container, options) => {
      const root = createRoot(container);
      root.render(
        <BooleanProvider {...{ container, value: options.data?.isLeaseEnd }} />
      );
    },
  },
];
