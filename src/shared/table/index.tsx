import { DataGrid } from "devextreme-react";
import { ComponentType } from "react";

import {
  Column,
  FilterPanel,
  FilterRow,
  HeaderFilter,
  IColumnProps,
  IDataGridOptions,
  ISelectionProps,
  MasterDetail,
  Scrolling,
  Selection,
} from "devextreme-react/data-grid";

import plMessages from "@utils/pl.json";
import { loadMessages, locale } from "devextreme/localization";

type TTableProps = {
  isFilterRow?: boolean;
  isFilterPanel?: boolean;
  isHeaderFilter?: boolean;
  isScrolling?: boolean;
  columns?: IColumnProps[];
  tableProps: IDataGridOptions;
  isMasterDetailEnabled?: boolean;
  masterDetailComponent?: ComponentType<any>;
  dataGridRef?: React.RefObject<DataGrid<any, number>>;
  isSelection?: boolean;
  selectionProps?: ISelectionProps;
};

export const Table = ({
  isFilterRow = false,
  isFilterPanel = false,
  isHeaderFilter = false,
  isScrolling = true,
  columns = [],
  tableProps = {},
  isMasterDetailEnabled,
  masterDetailComponent,
  dataGridRef,
  isSelection,
  selectionProps,
}: TTableProps) => {
  loadMessages(plMessages);
  locale("pl");

  return (
    <DataGrid
      {...{
        ref: dataGridRef,
        showBorders: true,
        showColumnHeaders: true,
        showRowLines: true,
        height: 600,
        noDataText: "Brak danych",
        ...tableProps,
      }}
    >
      <HeaderFilter visible={isHeaderFilter} />
      <FilterRow visible={isFilterRow} />
      <FilterPanel visible={isFilterPanel} />
      {columns.map((column) => (
        <Column key={column.dataField} {...column} />
      ))}
      <MasterDetail
        enabled={isMasterDetailEnabled}
        component={masterDetailComponent}
      />
      {isScrolling && <Scrolling mode="virtual" />}
      {isSelection ? <Selection {...selectionProps} /> : null}
    </DataGrid>
  );
};
