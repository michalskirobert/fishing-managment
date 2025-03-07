"use client";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Paper, Avatar, Grid, CssBaseline } from "@mui/material";
import { PermIdentity } from "@mui/icons-material";

import { useSignInService } from "./service";
import { useGenerateSignInForm } from "./utils";
import { SignInFormProps } from "./types";

import { DetailButton } from "@shared/detail-buttons";

import { FormFields } from "@shared/form";

import background from "@assets/images/backgrounds/sign-in-hero.jpg";
import { versionApp } from "@src/utils/version";

export default function SignIn() {
  const { isSigning, onSubmit, methods } = useSignInService();

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${background.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PermIdentity />
          </Avatar>
          <Typography component="h1" variant="h5">
            Logowanie
          </Typography>
          <Box
            component="form"
            onSubmit={methods.handleSubmit(onSubmit)}
            sx={{ width: "100%" }}
          >
            <FormFields
              {...{
                fieldData: useGenerateSignInForm<SignInFormProps>(
                  methods.control
                ),
              }}
            />
            <DetailButton
              {...{
                button: {
                  isLoading: isSigning,
                  content: "Zaloguj",
                  buttonProps: {
                    className: "mt-2",
                    color: "primary",
                    type: "submit",
                    variant: "contained",
                  },
                },
              }}
            />
            <Grid container>
              <Grid item xl={12}>
                <Link href="/callback/new-password" variant="body2">
                  Zapomniałeś hasła?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box component={"div"} textAlign={"center"} mt="auto">
          <Typography variant="subtitle2" component={"span"}>
            Wersja aplikacji: {versionApp}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
