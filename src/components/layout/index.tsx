"use client";

import { Box, createTheme, Grid, ThemeProvider } from "@mui/material";

import Header from "./header";

import { useAppSelector } from "@redux/store";
import { Container } from "reactstrap";

export const Theme = ({ children }: { children: React.ReactNode }) => {
  const defaultTheme = createTheme();

  const { isLogin } = useAppSelector(({ user }) => user);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box component={"div"}>
        {isLogin ? (
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
