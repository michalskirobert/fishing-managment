import {
  Add,
  Edit,
  Refresh,
  Delete,
  DisplaySettings,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import { FishingSpotProps } from "@api/service/fishing-spots/types";
import {
  useGetFishingSpotsListQuery,
  useRemoveFishingSpotMutation,
} from "@api/service/fishing-spots";
import { TButtonConfig } from "@shared/detail-buttons";

export const UseSpotsService = () => {
  const [selectedRow, setSelectedRow] = useState<FishingSpotProps | null>(null);
  const { data, isFetching, refetch } = useGetFishingSpotsListQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [remove, { isLoading: isRemoving }] = useRemoveFishingSpotMutation();

  const [isOpenDistrictModal, setIsOpenDistrictModal] =
    useState<boolean>(false);
  const [openWarningModal, setOpenWarningModal] = useState<boolean>(false);

  const toggleDistrictModal = () =>
    setIsOpenDistrictModal(!isOpenDistrictModal);
  const toggleWarningModal = () => setOpenWarningModal(!openWarningModal);

  const router = useRouter();

  const removeFishingSpot = async () => {
    const { district, _id } = selectedRow || {};

    if (!district || !_id) return;

    remove({ district: district?.toLowerCase(), id: _id })
      .unwrap()
      .then(() => {
        refetch();
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
          onClick: refetch,
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
    data,
    isLoading: isRemoving || isFetching,
    buttons,
    isOpenDistrictModal,
    toggleDistrictModal,
    setSelectedRow,
    openWarningModal,
    toggleWarningModal,
    selectedRow,
    removeFishingSpot,
    isRemoving,
  };
};
