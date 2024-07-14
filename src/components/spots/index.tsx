"use client";

import { ButtonGroup } from "@mui/material";

import { UseSpotsService } from "./service";
import { columns } from "./utils";
import { AreaModal } from "./area-form/area-modal";

import { DetailButton } from "@shared/detail-buttons";
import { PageContent } from "@shared/page-content";
import { Table } from "@shared/table";

export default function Spots() {
  const {
    data,
    isLoading,
    buttons,
    openAreaModal,
    toggleAreaModal,
    setSelectedRow,
  } = UseSpotsService();

  return (
    <PageContent title="Łowiska" subtitle="Lista dostepnych łowisk">
      <>
        <ButtonGroup sx={{ gap: 1 }}>
          {buttons.map((button) => (
            <DetailButton key={button.content} {...{ button }} />
          ))}
        </ButtonGroup>
        <Table
          {...{
            data: data?.items || [],
            columns,
            loading: isLoading,
            rowSelection: true,
            onRowSelectionModelChange: (row, Grid) =>
              setSelectedRow(Grid.api.getRow(row[0])),
          }}
        />
        <AreaModal {...{ open: openAreaModal, toggle: toggleAreaModal }} />
      </>
    </PageContent>
  );
}
