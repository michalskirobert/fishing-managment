"use client";

import { UseSpotsService } from "./service";
import { columns } from "./utils";
import { DistrictModal } from "./district-modal";

import { DetailButton } from "@shared/detail-buttons";
import { PageContent } from "@shared/page-content";
import { WarningModal } from "./warning-modal";
import { Table } from "@src/shared/table";
import { useMemo } from "react";
import CustomStore from "devextreme/data/custom_store";
import { getTableParams } from "@src/shared/table/helpers";
import { tableParamsList } from "@src/shared/table/utils";
import { fetchData } from "@src/shared/table/methods/fetch";
import { INSTANCES_URLS, TableDataProps } from "@src/api/utils";
import { FishingSpotProps } from "@src/api/service/fishing-spots/types";
import { TStoreData } from "@src/shared/table/types";

export default function Spots() {
  const {
    buttons,
    isOpenDistrictModal,
    toggleDistrictModal,
    openWarningModal,
    selectedRow,
    toggleWarningModal,
    removeFishingSpot,
    isRemoving,
    onOptionChanged,
    onSelectionChanged,
    dataGridRef,
  } = UseSpotsService();

  const store = useMemo(
    () =>
      new CustomStore({
        key: "_id",
        load: (loadOptions) => {
          const tableParams = getTableParams({
            loadOptions: {
              ...loadOptions,
              sort: loadOptions.sort || [{ selector: "name", desc: true }],
            },
            paramsList: tableParamsList,
          });

          return fetchData<
            TableDataProps<FishingSpotProps>,
            TStoreData<FishingSpotProps>
          >({
            url: INSTANCES_URLS.fishingSpots,
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
    <PageContent title="Łowiska" subtitle="Lista dostepnych łowisk">
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
        <DistrictModal {...{ isOpenDistrictModal, toggleDistrictModal }} />
        <WarningModal
          {...{
            spotData: selectedRow,
            open: openWarningModal,
            toggle: toggleWarningModal,
            removeFishingSpot,
            isRemoving,
          }}
        />
      </>
    </PageContent>
  );
}
