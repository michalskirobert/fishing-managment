"use client";

import { Box, Container } from "@mui/material";

export default function RedirectPage() {
  return (
    <Container maxWidth="md">
      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <h6 className={"mt-3"}>Proszę poczekać, trwa przekierowanie.</h6>
      </Box>
    </Container>
  );
}
