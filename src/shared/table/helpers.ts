import { operations } from "./utils";

import qs from "qs";

export type TFilter = string[] & {
  filterValue: string;
  columnIndex: number;
};

export type TFilterGroup = (TFilter | "and" | "or" | "!" | TFilterGroup)[];

export type TSorting = { selector: string; desc: boolean };

export type TTableFilter = {
  columnName: string;
  operation: string;
  value: string | number;
};

type TGetTableParams = {
  loadOptions: any;
  paramsList: string[];
};

type TAdvancedFilterOperand = "or" | "and" | "";

type TAdvancedFilters = {
  columnName: string;
  id: string;
  isRoot: boolean;
  level: number;
  operand: TAdvancedFilterOperand;
  operation: string;
  parentId: string;
  value: any;
};

export const getQueryString = <T>(queryParams?: Partial<T>) =>
  `${qs.stringify(queryParams, { allowDots: true })}`;

// CUSTOM STORE

const isNotEmpty = (value: any): boolean => {
  return value !== undefined && value !== null && value !== "";
};

export const removeFilterOperators = (arr: TFilterGroup): TFilterGroup =>
  arr.filter((item) => typeof item !== "string");

export const processOperation = (item: string): string =>
  operations[item] ?? item;

const getFilter = (filters: TFilter | TFilterGroup, index: number): string => {
  //if negation
  if ((filters as TFilterGroup).some((el) => el === "!")) {
    //if multi negation
    if ((filters[1] as TFilter).some((el) => el === "or")) {
      return `filters[${index}].columnName=${
        filters[1][0][0]
      }&filters[${index}].operation=notIn&filters[${index}].value=${removeFilterOperators(
        filters[1] as TFilterGroup
      )
        .map((item) => (item[2] === null ? "null" : item[2]))
        .join(";")}&`;
    }

    //single negation
    return `filters[${index}].columnName=${filters[1][0]}&filters[${index}].operation=notIn&filters[${index}].value=${filters[1][2]}&`;
  }

  //simple filter
  return `filters[${index}].columnName=${
    filters[0]
  }&filters[${index}].operation=${
    operations[filters[1] as string]
  }&filters[${index}].value=${filters[2]}&`;
};

const getGroupFilters = (filters: TFilterGroup, index: number): string => {
  return `filters[${index}].columnName=${
    filters[0][0]
  }&filters[${index}].operation=in&filters[${index}].value=${removeFilterOperators(
    filters
  )
    .map((item: any) => {
      return item.filterValue === null ? "null" : item.filterValue;
    })
    .join(";")}`;
};

export const removeLastAmpersand = (inputString: string): string => {
  if (inputString.endsWith("&")) {
    return inputString.slice(0, -1);
  } else {
    return inputString;
  }
};

const processMultipleFilters = (
  filters: TFilterGroup,
  currentIndex: number
) => {
  let nestedParam = "";
  let nestedIndex = currentIndex;

  filters
    .filter((item) => item !== "and")
    .forEach((nestedFilter) => {
      if (
        ((nestedFilter || []) as TFilterGroup).some((item) => item === "and")
      ) {
        const {
          nestedIndex: secondNestedIndex,
          nestedParam: secondNestedParam,
        } = processMultipleFilters(nestedFilter as TFilterGroup, nestedIndex);

        nestedParam += secondNestedParam;
        nestedIndex = secondNestedIndex;
      } else if (
        ((nestedFilter || []) as TFilterGroup).some((item) => item === "or")
      ) {
        nestedParam += getGroupFilters(
          nestedFilter as TFilterGroup,
          nestedIndex
        );
      } else {
        nestedParam += getFilter((nestedFilter || []) as TFilter, nestedIndex);
        nestedIndex++;
      }
    });

  return { nestedParam, nestedIndex };
};

export const processFilters = (filters: TFilterGroup): string => {
  let queryParam = "";

  //single
  if (filters.every((item) => item !== "and")) {
    return filters.some((item) => item === "or")
      ? getGroupFilters(filters, 0)
      : getFilter(filters as TFilter, 0);
  } else {
    //multiple
    const { nestedParam } = processMultipleFilters(filters, 0);

    queryParam += nestedParam;
  }

  return queryParam;
};
export const processSort = (arr: TSorting[]): string => {
  if (!arr.length) {
    return "";
  }

  return `sortings[0].columnName=${arr[0].selector}&sortings[0].direction=${
    arr[0].desc ? "desc" : "asc"
  }`;
};

export const processSortToArray = (arr: TSorting[]) => {
  return [
    { columnName: arr[0].selector, direction: arr[0].desc ? "desc" : "asc" },
  ];
};

export const getTableParams = ({
  loadOptions,
  paramsList,
}: TGetTableParams): string => {
  let params = "";

  paramsList.forEach((i) => {
    if (i in loadOptions && isNotEmpty(loadOptions[i])) {
      if (i === "filter") {
        const processedFilters = processFiltersToArr(loadOptions[i]);
        const filtersParams = getQueryString({ filters: processedFilters });

        params += `${filtersParams}&`;
      } else if (i === "sort") {
        const processedSorting = processSortToArray(loadOptions[i]);
        const sortingParam = getQueryString({ sortings: processedSorting });
        params += `${sortingParam}&`;
      } else {
        params += `${qs.stringify(
          { [i]: loadOptions[i] },
          { allowDots: true }
        )}&`;
      }
    }
  });

  return params.replace(/&$/, "");
};

export const getFilters = (
  filters: TFilterGroup,
  advFilters: TAdvancedFilters[],
  count: number,
  parentId: string
) => {
  const groupOperator = filters.find(
    (el) => el === "and" || el === "or" || el === "!"
  );
  const uniqueId = crypto.randomUUID();
  const operandId = crypto.randomUUID();

  if (groupOperator) {
    if (groupOperator === "!") {
      const negationId = crypto.randomUUID();

      if ((filters[1] as TFilter).some((el) => el === "or")) {
        advFilters.push(
          {
            columnName: "",
            id: operandId,
            parentId,
            isRoot: true,
            operand: "and",
            operation: "",
            value: "",
            level: count,
          },
          {
            columnName: filters[1][0][0] as string,
            id: negationId,
            parentId: parentId || operandId,
            isRoot: count === 0,
            operand: "",
            operation: "notIn",
            value: `${removeFilterOperators(filters[1] as TFilterGroup)
              .map((item) => item[2])
              .join(";")}`,
            level: count + 1,
          }
        );

        return;
      } else {
        advFilters.push(
          {
            columnName: "",
            id: operandId,
            parentId,
            isRoot: true,
            operand: "and",
            operation: "",
            value: "",
            level: count,
          },
          {
            columnName: filters[1][0] as string,
            id: negationId,
            parentId,
            isRoot: count === 0,
            operand: "",
            operation: "notIn",
            value: filters[1][2],
            level: count + 1,
          }
        );

        return;
      }
    }

    advFilters.push({
      columnName: "",
      id: uniqueId,
      parentId,
      isRoot: count === 0,
      operand: groupOperator as TAdvancedFilterOperand,
      operation: "",
      value: "",
      level: count,
    });

    count++;

    filters.forEach((filter) => {
      const filterId = crypto.randomUUID();

      if (
        filter instanceof Array &&
        filter.some((item) => item instanceof Array)
      ) {
        getFilters(filter as TFilterGroup, advFilters, count, uniqueId);
      } else if (filter instanceof Array) {
        advFilters.push({
          columnName: filter[0] as string,
          id: filterId,
          parentId: uniqueId,
          isRoot: count === 0,
          operand: "",
          operation: processOperation(filter[1] as string),
          value: filter[2],
          level: count,
        });
      }
    });
  } else {
    const filterId = crypto.randomUUID();
    const operandId = crypto.randomUUID();

    advFilters.push(
      {
        columnName: "",
        id: operandId,
        parentId,
        isRoot: true,
        operand: "and",
        operation: "",
        value: "",
        level: count,
      },
      {
        columnName: filters[0] as string,
        id: filterId,
        parentId: operandId,
        isRoot: false,
        operand: "",
        operation: processOperation(filters[1] as string),
        value: filters[2],
        level: count + 1,
      }
    );
  }
};

export const processAdvFilters = (filters: TFilterGroup) => {
  const advFilters: TAdvancedFilters[] = [];
  const count = 0;

  getFilters(filters, advFilters, count, "");

  return advFilters;
};

// FILTERS TO ARRAY

const processGroupFilter = (filter: TFilterGroup): TTableFilter => {
  return {
    columnName: filter[0][0] as string,
    operation: "in",
    value: removeFilterOperators(filter)
      //temporary solution
      .map((item: any) => item.filterValue)
      .join(";"),
  };
};

const processSingleFilter = (filter: TFilter | TFilterGroup): TTableFilter => {
  //if negation
  if (filter.some((el) => el === "!")) {
    //if multi negation
    if ((filter[1] as TFilter).some((el) => el === "or")) {
      return {
        columnName: filter[1][0][0] as string,
        operation: "notIn",
        value: removeFilterOperators(filter[1] as TFilterGroup)
          //temporary solution
          .map((item: any) => item.filterValue)
          .join(";") as string,
      };
    }
    //single negation
    return {
      columnName: filter[1][0] as string,
      operation: "notIn",
      value: filter[1][2] as string,
    };
  }

  //simple filter
  return {
    columnName: filter[0] as string,
    operation: operations[filter[1] as string],
    value: filter[2] as string | number,
  };
};

const processMultipleFiltersToArr = (filter: TFilterGroup) => {
  const result: TTableFilter[] = [];

  filter
    .filter((item) => item !== "and")
    .forEach((nestedFilter) => {
      if ((nestedFilter as TFilterGroup).some((item) => item === "and")) {
        const multipleFilters = processMultipleFiltersToArr(
          nestedFilter as TFilterGroup
        );
        result.push(...multipleFilters);
      } else if ((nestedFilter as TFilterGroup).some((item) => item === "or")) {
        const groupFilter = processGroupFilter(nestedFilter as TFilterGroup);
        result.push(groupFilter);
      } else {
        const singleFilter = processSingleFilter(nestedFilter as TFilterGroup);
        result.push(singleFilter);
      }
    });

  return result;
};

export const processFiltersToArr = (filter: TFilterGroup): TTableFilter[] => {
  const currentFilters: TTableFilter[] = [];

  if (!filter) {
    return [];
  }

  //single
  if (filter.every((item) => item !== "and")) {
    if (filter.some((item) => item === "or")) {
      //group (in)
      const groupFilter = processGroupFilter(filter);
      currentFilters.push(groupFilter);

      return currentFilters;
    } else {
      //single
      const singleFilter = processSingleFilter(filter);
      currentFilters.push(singleFilter);

      return currentFilters;
    }
  } else {
    const multipleFilters: TTableFilter[] = processMultipleFiltersToArr(filter);
    currentFilters.push(...multipleFilters);

    return currentFilters;
  }
};
