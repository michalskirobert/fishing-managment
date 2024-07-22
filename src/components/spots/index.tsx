"use client";

import { UseSpotsService } from "./service";
import { columns } from "./utils";
import { DistrictModal } from "./district-modal";

import { DetailButton } from "@shared/detail-buttons";
import { PageContent } from "@shared/page-content";
import { Table } from "@shared/table";
import { WarningModal } from "./warning-modal";

export default function Spots() {
  const {
    data,
    isLoading,
    buttons,
    isOpenDistrictModal,
    toggleDistrictModal,
    setSelectedRow,
    openWarningModal,
    selectedRow,
    toggleWarningModal,
    removeFishingSpot,
    isRemoving,
  } = UseSpotsService();

  return (
    <PageContent title="Łowiska" subtitle="Lista dostepnych łowisk">
      <>
        <div className="d-flex flex-wrap justify-content-between">
          {buttons.map((group) => (
            <div className="d-flex flex-wrap gap-2">
              {group.map((button) => (
                <DetailButton key={button.content} {...{ button }} />
              ))}
            </div>
          ))}
        </div>
        <Table
          {...{
            data: data?.items || [],
            columns,
            loading: isLoading,
            sortModel: [
              { field: "area", sort: "desc" },
              { field: "addedDate", sort: "desc" },
            ],
            rowSelection: true,
            onRowSelectionModelChange: (row, Grid) =>
              setSelectedRow(Grid.api.getRow(row[0])),
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
