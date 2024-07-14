"use client";

import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";

import { versionApp } from "@utils/version";

export const Footer = () => {
  function Copyright(props: any) {
    return (
      <>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          {...props}
        >
          {"Copyright © "}
          <Link href={"https://michalskirobert.github.io"}>
            Robert Michalski
          </Link>{" "}
          {new Date().getFullYear()}
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          align="center"
          {...props}
        >
          Wersja oprogramowania: {versionApp}
        </Typography>
      </>
    );
  }

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "gray",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1"></Typography>
        <Copyright />
      </Container>
    </Box>
  );
};
