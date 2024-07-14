"use client";

import { Box, createTheme, ThemeProvider } from "@mui/material";

import Header from "./header";

import { useAppSelector } from "@redux/store";

export const Theme = ({ children }: { children: React.ReactNode }) => {
  const defaultTheme = createTheme();

  const { accessToken } = useAppSelector(({ user }) => user);

  if (!accessToken) return <>{children}</>;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header>{children}</Header>
      </Box>
    </ThemeProvider>
  );
};
