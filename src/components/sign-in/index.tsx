"use client";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Paper, Avatar, Grid, CssBaseline } from "@mui/material";
import { Person } from "@mui/icons-material";

import { useSignInService } from "./service";
import { generateForm } from "./utils";
import { SignInFormProps } from "./types";

import { DetailButton } from "@shared/detail-buttons";

import { FormFields } from "@shared/form";

import background from "@assets/images/backgrounds/sign-in-hero.jpg";

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
            <Person />
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
                fieldData: generateForm<SignInFormProps>(methods.control),
              }}
            />
            <DetailButton
              {...{
                button: {
                  isLoading: isSigning,
                  content: "Zaloguj",
                  buttonProps: {
                    color: "primary",
                    type: "submit",
                    variant: "contained",
                  },
                },
              }}
            />
            <Grid container>
              <Grid item xs>
                <Link href="/callback/new-password" variant="body2">
                  Zapomniałeś hasła?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
