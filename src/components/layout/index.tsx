"use client";

import { Box, createTheme, Grid, ThemeProvider } from "@mui/material";

import Header from "./header";

import { useAppSelector } from "@redux/store";
import { Container } from "reactstrap";
import { usePathname } from "next/navigation";

export const Theme = ({ children }: { children: React.ReactNode }) => {
  const defaultTheme = createTheme();

  const { isLogin } = useAppSelector(({ auth }) => auth);

  const pathname = usePathname();

  const isLoggedIn = pathname !== "/sign-in" && isLogin;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box component={"div"}>
        {isLoggedIn ? (
          <Header>{children}</Header>
        ) : (
          <Container>
            <Grid>{children}</Grid>
          </Container>
        )}
      </Box>
    </ThemeProvider>
  );
};
