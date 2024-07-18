import React from "react";
import { Grid, Button, Typography } from "@mui/material";
import monster from "@assets/images/animations/godzilla.gif";

import "@assets/css/page-not-found.css";
import Link from "next/link";
import Image from "next/image";

export default async function NotFound() {
  return (
    <Grid
      container
      className="fullSize"
      direction="column"
      justifyContent="center"
      alignItems="center"
      id="ERR404"
    >
      <Typography variant="h3">Oh nie! Jesteśmy zgubieni!</Typography>
      <Typography variant="h5" align="center">
        Godzilla już zjadła tę stronę
      </Typography>
      <Grid container justifyContent="center" alignItems="center">
        <div id="beforeTooLate">
          Wróć do strony
          <Button className="textLink" href="/" LinkComponent={Link}>
            głównej
          </Button>
          dopóki nie jest za późno!
        </div>
        <Image id="monsterImg" src={monster.src} alt="Godzilla" />
      </Grid>
    </Grid>
  );
}
