"use client";

import { ButtonGroup } from "@mui/material";

import { DetailButton } from "@shared/detail-buttons";
import { PageContent } from "@shared/page-content";
import { Table } from "@shared/table";
import { UseCustomersService } from "./service";
import { columns } from "./utils";

export default function Customers() {
  const { buttons, setSelectedRow } = UseCustomersService();

  return (
    <PageContent
      title="Wędkarze"
      subtitle="Lista wędkarzy zarejestrowanych w PZW. W profilach znajdują się informacje o prowadzeniu rejestrów."
    >
      <>
        <ButtonGroup sx={{ gap: 1 }}>
          {buttons.map((button) => (
            <DetailButton key={button.content} {...{ button }} />
          ))}
        </ButtonGroup>
        <Table
          {...{
            data: [],
            columns,
            loading: false,
            sortModel: [
              { field: "fullname", sort: "desc" },
              { field: "addedDate", sort: "desc" },
            ],
            rowSelection: true,
            onRowSelectionModelChange: (row, Grid) =>
              setSelectedRow(Grid.api.getRow(row[0])),
          }}
        />
        {/* <AreaModal {...{ open: openAreaModal, toggle: toggleAreaModal }} /> */}
      </>
    </PageContent>
  );
}
