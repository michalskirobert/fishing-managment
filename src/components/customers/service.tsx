import { Add, Edit, Refresh, Delete } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import { FishingSpotProps } from "@api/service/fishing-spots/types";

import { TButtonConfig } from "@shared/detail-buttons";

export const UseCustomersService = () => {
  const [selectedRow, setSelectedRow] = useState<FishingSpotProps | null>(null);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const toggleAreaModal = () => setOpenModal(!openModal);

  const router = useRouter();

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
          router.push(`spots/${selectedRow?.district}/${selectedRow?._id}`),
        variant: "contained",
      },
    },
    {
      content: "Odśwież",
      buttonProps: {
        color: "info",
        startIcon: <Refresh />,
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
      },
    },
  ];

  return {
    buttons,
    toggleAreaModal,
    setSelectedRow,
  };
};
