import {
  Add,
  Edit,
  Refresh,
  Delete,
  DisplaySettings,
  Remove,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";

import { FishingSpotProps } from "@api/service/fishing-spots/types";
import { useRemoveFishingSpotMutation } from "@api/service/fishing-spots";
import { TButtonConfig } from "@shared/detail-buttons";
import {
  OptionChangedEvent,
  SelectionChangedEvent,
} from "devextreme/ui/data_grid";
import { processFiltersToArr, TTableFilter } from "@src/shared/table/helpers";
import { DataGrid } from "devextreme-react";
import { clearFilters } from "@src/shared/table/utils";

export const UseSpotsService = () => {
  const [selectedRow, setSelectedRow] = useState<FishingSpotProps | null>(null);

  const dataGridRef = useRef<DataGrid<FishingSpotProps, number>>(null);

  const [remove, { isLoading: isRemoving }] = useRemoveFishingSpotMutation();

  const [isOpenDistrictModal, setIsOpenDistrictModal] =
    useState<boolean>(false);
  const [openWarningModal, setOpenWarningModal] = useState<boolean>(false);

  const toggleDistrictModal = () =>
    setIsOpenDistrictModal(!isOpenDistrictModal);
  const toggleWarningModal = () => setOpenWarningModal(!openWarningModal);

  const router = useRouter();

  const [filters, setFilters] = useState<TTableFilter[]>([]);

  const onOptionChanged = (e: OptionChangedEvent<FishingSpotProps>) => {
    if (e.fullName.includes("filterValue")) {
      const combinedFilter = e.component.getCombinedFilter();
      const updatedFilters = processFiltersToArr(combinedFilter);

      setFilters(updatedFilters);
    }
  };

  const onSelectionChanged = useCallback(
    (e: SelectionChangedEvent<FishingSpotProps>) => {
      if (e.selectedRowsData.length > 0) {
        setSelectedRow(e.selectedRowsData[0]);
      } else {
        setSelectedRow(null);
      }
    },
    []
  );

  const removeFishingSpot = async () => {
    const { district, _id } = selectedRow || {};

    if (!district || !_id) return;

    remove({ district: district?.toLowerCase(), id: _id })
      .unwrap()
      .then(() => {
        toggleWarningModal();
        toast.success("Pomyślnie usunięto łowisko");
      });
  };

  const buttons: TButtonConfig[][] = [
    [
      {
        content: "Dodaj",
        tooltipContent:
          "Otworzy to formularz do dodania nowego łowiska dla zaznaczonego okręgu. Dane zostaną zapisane w bazie danych.",
        buttonProps: {
          color: "success",
          startIcon: <Add />,
          onClick: toggleDistrictModal,
          variant: "contained",
        },
      },
      {
        content: "Edytuj",
        tooltipContent: !selectedRow?._id
          ? "Zaznacz łowisko"
          : "Spowoduje to otworzenie formularza edycyjnego łowiska. Dane zostaną zapisane w bazie danych",
        buttonProps: {
          color: "warning",
          startIcon: <Edit />,
          disabled: !selectedRow?._id,
          onClick: () =>
            router.push(
              `spots/${selectedRow?.district?.toLowerCase()}/${
                selectedRow?._id
              }`
            ),
          variant: "contained",
        },
      },
      {
        content: "Odśwież",
        tooltipContent:
          "Lista zostanie odświeżona i pobrane zostaną dane na nowo",
        buttonProps: {
          color: "info",
          startIcon: <Refresh />,
          onClick: () => dataGridRef.current?.instance.refresh(),
          variant: "contained",
        },
      },
      {
        content: "Usuń",
        tooltipContent: !selectedRow?._id
          ? "Zaznacz łowisko"
          : "Usunięcie permametnie łowiska bez możliwości przywrócenia go",
        buttonProps: {
          color: "error",
          startIcon: <Delete />,
          disabled: !selectedRow?._id,
          variant: "contained",
          onClick: toggleWarningModal,
        },
      },
      {
        content: "Wyczyść filtry",
        tooltipContent: !filters?.length
          ? "Brak ustawionych filtrów"
          : "Zostaną usunięte wszystkie bieżące filtry oraz zaznaczenia",
        buttonProps: {
          color: "secondary",
          startIcon: <Remove />,
          onClick: () => clearFilters(dataGridRef.current?.instance),
          disabled: !filters.length,
          variant: "contained",
        },
      },
    ],
    [
      {
        content: "Migruj",
        tooltipContent: "Funkcja na razie niedostępna",
        buttonProps: {
          color: "warning",
          startIcon: <DisplaySettings />,
          disabled: true,
          variant: "contained",
        },
      },
    ],
  ];

  return {
    isLoading: isRemoving,
    buttons,
    isOpenDistrictModal,
    toggleDistrictModal,
    setSelectedRow,
    openWarningModal,
    toggleWarningModal,
    selectedRow,
    removeFishingSpot,
    isRemoving,
    onOptionChanged,
    onSelectionChanged,
    dataGridRef,
  };
};
