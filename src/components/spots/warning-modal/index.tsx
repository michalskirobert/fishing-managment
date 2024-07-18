"use client";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

import { DetailButton } from "@shared/detail-buttons";
import { FishingSpotProps } from "@src/api/service/fishing-spots/types";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface AreaModalProps {
  toggle: () => void;
  open: boolean;
  spotData: FishingSpotProps | null;
  removeFishingSpot: () => Promise<void>;
  isRemoving: boolean;
}

export const WarningModal: React.FC<AreaModalProps> = ({
  open,
  toggle,
  spotData,
  removeFishingSpot,
  isRemoving,
}) => {
  const { area, code, name } = spotData || {};
  return (
    <BootstrapDialog
      onClose={toggle}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Ostreżenie!
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={toggle}
        disabled={isRemoving}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Typography gutterBottom>
          Czy na pewno chce usunąć łowisko o nazwie &quot;{name}&quot; i kodzie
          &quot;{code}&quot; należące do okręgu {area}?
        </Typography>
      </DialogContent>
      <DialogActions>
        <DetailButton
          {...{
            button: {
              isLoading: isRemoving,
              content: "Tak",
              tooltipContent:
                "Po wybraniu tej opcji, łowisko zostanie usunięte na stałe z baz danych. Nie będzie możliwe przywrócenia go na nowo.",
              buttonProps: {
                color: "primary",
                onClick: removeFishingSpot,
              },
            },
          }}
        />
        <DetailButton
          {...{
            button: {
              content: "Nie",
              tooltipContent:
                "Opcja powoduje powrót na listę łowisk, bez żadnej akcji",
              buttonProps: {
                color: "error",
                onClick: toggle,
                disabled: isRemoving,
              },
            },
          }}
        />
      </DialogActions>
    </BootstrapDialog>
  );
};
