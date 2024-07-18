"use client";

import { Send, GppMaybe, ArrowBack } from "@mui/icons-material";
import {
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Container,
  ButtonGroup,
} from "@mui/material";
import { DetailButton } from "@src/shared/detail-buttons";

import { useForm } from "react-hook-form";
import { FormFields } from "@src/shared/form";
import { ForgotPasswordProps } from "./types";
import { generateForm } from "./utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validation-schema";
import { useRouter } from "next/navigation";

export default function PasswordPage() {
  const { control, handleSubmit } = useForm<ForgotPasswordProps>({
    mode: "all",
    defaultValues: { email: "", secretCode: "" },
    resolver: yupResolver(validationSchema),
  });

  const router = useRouter();

  const onSave = () => {};

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <GppMaybe />
        </Avatar>
        <Typography component="h1" variant="h5">
          Weryfikacja konta
        </Typography>
        <Typography component="h5" variant="subtitle1">
          Podpowiedź: TEST
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSave)}
          noValidate
          sx={{ mt: 1 }}
        >
          <FormFields
            {...{
              fieldData: generateForm<ForgotPasswordProps>(control),
            }}
          />
          <ButtonGroup sx={{ mt: 2, gap: 2 }}>
            <DetailButton
              {...{
                button: {
                  content: "Wróć",
                  buttonProps: {
                    color: "error",
                    startIcon: <ArrowBack />,
                    variant: "contained",
                    onClick: () => router.push("/sign-in"),
                  },
                },
              }}
            />
            <DetailButton
              {...{
                button: {
                  content: "Wyślij",
                  buttonProps: {
                    color: "primary",
                    startIcon: <Send />,
                    variant: "contained",
                    type: "submit",
                  },
                },
              }}
            />
          </ButtonGroup>
        </Box>
      </Box>
    </Container>
  );
}
