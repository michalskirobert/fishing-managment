"use client";

import { Box, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function VerifyTokenPage() {
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
        <h6 className={"mt-3"}>Proszę czekać, trwa autoryzacja</h6>
      </Box>
    </Container>
  );
}

export function VerifyTokenFailurePage() {
  const router = useRouter();

  const [timer, setTimer] = useState<number>(5);

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/sign-out");
    }, 1000);

    const time = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(time);
      clearTimeout(timeout);
    };
  }, []);

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
          Token wygasł, zaraz nastąpi przekierowanie na stronę logowania.
          Pozostało: {timer}
        </h6>
      </Box>
    </Container>
  );
}
