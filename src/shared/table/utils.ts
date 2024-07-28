import { addMinutes, format } from "date-fns";
import dxDataGrid from "devextreme/ui/data_grid";
import { GroupOperation } from "devextreme/ui/filter_builder";

export const defaultFilterOperations: string[] = [
  "contains",
  "notcontains",
  "startswith",
  "endswith",
  "=",
  "<>",
];

export const defaultGroupOperations: GroupOperation[] = ["and", "or"];

export const operations: Record<string, string> = {
  "=": "equal",
  "<>": "notEqual",
  "<": "lessThan",
  "<=": "lessThanOrEqual",
  ">": "greaterThan",
  ">=": "greaterThanOrEqual",
  contains: "contains",
  between: "between",
  startswith: "startsWith",
  endswith: "endsWith",
  notcontains: "notContains",
};

//problem with devextreme types
export const calculateDateTimeFilterExpression = (filterValue: any): any => {
  return [
    [
      "sourceModifiedDate",
      ">=",
      format(filterValue, `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`),
    ],
    "and",
    [
      "sourceModifiedDate",
      "<",
      format(
        addMinutes(new Date(filterValue), 1),
        `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`
      ),
    ],
  ];
};

type TTypeOfTableParam = "skip" | "take" | "filter" | "sort";

export const tableParamsList: TTypeOfTableParam[] = [
  "skip",
  "take",
  "filter",
  "sort",
];

export const clearFilters = <T>(
  referance: dxDataGrid<T, number> | undefined
) => {
  if (!referance) return;

  const { clearFilter, clearGrouping, clearSelection, clearSorting } =
    referance;

  clearFilter();
  clearGrouping();
  clearSelection();
  clearSorting();
};

export const filterOptions = Object.freeze({
  filterPlaceholder: "Filtruj...",
  contains: "Zawiera",
  notContains: "Nie zawiera",
  startsWith: '"Zaczyna się od',
  endsWith: "Kończy się na",
  equal: "Równa się",
  notEqual: "Nie równa się",
  date: "Dnia",
  lessThan: "Mniejsze",
  greaterThanOrEqual: "Większe lub równe",
});
