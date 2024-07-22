"use client";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Box } from "@mui/material";

import { validationSchema } from "./validation-schema";

import { useSpotsDictionaryQuery } from "@api/service/dictionaries";
import { CustomSelect } from "@shared/form/select";
import { DetailButton } from "@shared/detail-buttons";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface DistrictModalProps {
  toggleDistrictModal: () => void;
  isOpenDistrictModal: boolean;
}

interface DistrictProps {
  district: string;
}

export const DistrictModal: React.FC<DistrictModalProps> = ({
  isOpenDistrictModal,
  toggleDistrictModal,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const methods = useForm<DistrictProps>({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const router = useRouter();

  const onSave = (data: DistrictProps) => {
    router.push(`/spots/${data?.district}`);
  };

  const { data, isFetching } = useSpotsDictionaryQuery(undefined, {
    skip: !isFocused,
    refetchOnMountOrArgChange: true,
  });

  return (
    <FormProvider {...methods}>
      <BootstrapDialog
        onClose={toggleDistrictModal}
        aria-labelledby="customized-dialog-title"
        open={isOpenDistrictModal}
      >
        <Box
          component="form"
          onSubmit={methods.handleSubmit(onSave)}
          sx={{ width: "100%" }}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Wybór okręgu
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={toggleDistrictModal}
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
              Wybierz okręg, na podstawie, którego dodasz łowisko
            </Typography>
            <CustomSelect
              {...{
                control: methods.control,
                isLoading: isFetching,
                options: data?.map(({ name }) => ({
                  label: name,
                  value: name.toLowerCase(),
                })),
                selectProps: {
                  name: "area",
                  onFocus: () => setIsFocused(true),
                },
                tooltip: "Wybór okręgu",
              }}
            />
          </DialogContent>
          <DialogActions>
            <DetailButton
              {...{
                button: {
                  content: "Zatwierdź",
                  tooltipContent:
                    "Po wybraniu okręgu zostaniesz przekierowany na stronę formularza",
                  buttonProps: { color: "primary", type: "submit" },
                },
              }}
            />
            <DetailButton
              {...{
                button: {
                  content: "Wróć",
                  tooltipContent:
                    "Okno modalne zostanie wyłączone i wrócisz na listę łowisk",
                  buttonProps: { color: "error", onClick: toggleDistrictModal },
                },
              }}
            />
          </DialogActions>
        </Box>
      </BootstrapDialog>
    </FormProvider>
  );
};
