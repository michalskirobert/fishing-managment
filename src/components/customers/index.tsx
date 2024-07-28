"use client";

import { Table } from "@src/shared/table";

import { ButtonGroup } from "@mui/material";

import { DetailButton } from "@shared/detail-buttons";
import { PageContent } from "@shared/page-content";
import { UseCustomersService } from "./service";
import { columns } from "./utils";

export default function Customers() {
  const { buttons } = UseCustomersService();

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
            tableProps: {
              dataSource: [],
              remoteOperations: true,
              filterRow: { visible: true },
              headerFilter: { visible: true },
              selection: {
                mode: "single",
              },
              columnResizingMode: "nextColumn",
              allowColumnResizing: true,
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
