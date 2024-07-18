import { Add, Edit, Refresh, Delete } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import { FishingSpotProps } from "@api/service/fishing-spots/types";
import {
  useFishingSpotsListQuery,
  useRemoveFishingSpotMutation,
} from "@api/service/fishing-spots";
import { TButtonConfig } from "@shared/detail-buttons";

export const UseSpotsService = () => {
  const [selectedRow, setSelectedRow] = useState<FishingSpotProps | null>(null);
  const { data, isFetching, refetch } = useFishingSpotsListQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [remove, { isLoading: isRemoving }] = useRemoveFishingSpotMutation();

  const [openAreaModal, setOpenAreaModal] = useState<boolean>(false);
  const [openWarningModal, setOpenWarningModal] = useState<boolean>(false);

  const toggleAreaModal = () => setOpenAreaModal(!openAreaModal);
  const toggleWarningModal = () => setOpenWarningModal(!openWarningModal);

  const router = useRouter();

  const removeFishingSpot = async () => {
    const { area, _id } = selectedRow || {};

    if (!area || !_id) return;

    remove({ area: area?.toLowerCase(), id: _id })
      .unwrap()
      .then(() => {
        refetch();
        toggleWarningModal();
        toast.success("Pomyślnie usunięto łowisko");
      });
  };

  const buttons: TButtonConfig[] = [
    {
      content: "Dodaj",
      buttonProps: {
        color: "success",
        startIcon: <Add />,
        onClick: toggleAreaModal,
        variant: "contained",
      },
    },
    {
      content: "Edytuj",
      buttonProps: {
        color: "warning",
        startIcon: <Edit />,
        disabled: !selectedRow?._id,
        onClick: () =>
          router.push(`spots/${selectedRow?.area}/${selectedRow?._id}`),
        variant: "contained",
      },
    },
    {
      content: "Odśwież",
      buttonProps: {
        color: "info",
        startIcon: <Refresh />,
        onClick: refetch,
        variant: "contained",
      },
    },
    {
      content: "Usuń",
      buttonProps: {
        color: "error",
        startIcon: <Delete />,
        disabled: !selectedRow?._id,
        variant: "contained",
        onClick: toggleWarningModal,
      },
    },
  ];

  return {
    data,
    isLoading: isRemoving || isFetching,
    buttons,
    openAreaModal,
    toggleAreaModal,
    setSelectedRow,
    openWarningModal,
    toggleWarningModal,
    selectedRow,
    removeFishingSpot,
    isRemoving,
  };
};
