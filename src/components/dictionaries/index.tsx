"use client";

import { UseSpotsService } from "./service";
import { columns } from "./utils";

import { DetailButton } from "@shared/detail-buttons";
import { PageContent } from "@shared/page-content";
import { Table } from "@src/shared/table";
import { useMemo } from "react";
import CustomStore from "devextreme/data/custom_store";
import { getTableParams } from "@src/shared/table/helpers";
import { tableParamsList } from "@src/shared/table/utils";
import { fetchData } from "@src/shared/table/methods/fetch";
import { INSTANCES_URLS } from "@src/api/utils";
import { TStoreData } from "@src/shared/table/types";
import { TableDataProps } from "@src/api/types";
import { DictionaryProps } from "@src/api/service/dictionaries/types";

export default function Dictionaries() {
  const { buttons, onOptionChanged, onSelectionChanged, dataGridRef } =
    UseSpotsService();

  const store = useMemo(
    () =>
      new CustomStore({
        key: "_id",
        load: (loadOptions) => {
          const tableParams = getTableParams({
            loadOptions: {
              ...loadOptions,
              sort: loadOptions.sort || [
                { selector: "createdDate", desc: true },
              ],
            },
            paramsList: tableParamsList,
          });

          return fetchData<
            TableDataProps<DictionaryProps>,
            TStoreData<DictionaryProps>
          >({
            url: INSTANCES_URLS.dictionaries,
            tableParams,
            onSuccess: (data) => {
              return {
                data: data.items,
                totalCount: data.totalItems,
              };
            },
          });
        },
      }),
    []
  );

  return (
    <PageContent title="Słowniki" subtitle="Lista dostepnych słowników">
      <>
        <div className="d-flex flex-wrap justify-content-between">
          {buttons.map((group, index) => (
            <div key={index} className="d-flex flex-wrap gap-2">
              {group.map((button) => (
                <DetailButton key={button.content} {...{ button }} />
              ))}
            </div>
          ))}
        </div>
        <Table
          {...{
            dataGridRef,
            tableProps: {
              dataSource: store,
              remoteOperations: true,
              filterRow: { visible: true },
              headerFilter: { visible: true },
              selection: {
                mode: "single",
              },
              onSelectionChanged,
              columnResizingMode: "nextColumn",
              allowColumnResizing: true,
              onOptionChanged,
            },
            columns,
            isFilterRow: true,
            isHeaderFilter: true,
          }}
        />
      </>
    </PageContent>
  );
}
