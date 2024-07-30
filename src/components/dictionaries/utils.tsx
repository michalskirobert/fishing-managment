import { BooleanProvider } from "@src/shared/table/providers/boolean";
import { IColumnProps } from "devextreme-react/cjs/data-grid";
import { createRoot } from "react-dom/client";

export const columns: IColumnProps[] = [
  {
    dataField: "name",
    caption: "Nazwa",
    allowSorting: true,
    visible: true,
    allowHeaderFiltering: false,
  },
  {
    dataField: "createdDate",
    caption: "Data dodania",
    allowSorting: true,
    dataType: "date",
    visible: true,
    allowHeaderFiltering: false,
  },
  {
    dataField: "language",
    caption: "Język",
    allowSorting: true,
    visible: true,
    allowHeaderFiltering: false,
  },
  {
    dataField: "isActive",
    caption: "Aktywny",
    allowSorting: true,
    visible: true,
    allowHeaderFiltering: false,
    cellTemplate: (container: HTMLElement, options) => {
      const root = createRoot(container);
      root.render(
        <BooleanProvider {...{ container, value: options.data?.isActive }} />
      );
    },
  },
];
