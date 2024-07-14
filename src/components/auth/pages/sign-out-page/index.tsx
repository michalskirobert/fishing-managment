"use client";

import { Box, Container } from "@mui/material";

export default function SignOutPage() {
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
        <h6 className={"mt-3"}>
          Trwa wylogowanie. Zaraz zostaniesz przekierowany do strony logowania.
        </h6>
      </Box>
    </Container>
  );
}
