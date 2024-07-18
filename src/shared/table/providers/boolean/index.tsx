import { Typography } from "@mui/material";
import React from "react";
import { Badge } from "reactstrap";

export const BooleanProvider: React.FC<{ value: boolean }> = ({ value }) => {
  if (value) {
    return <Badge color="success">TAK</Badge>;
  }

  return <Badge color="danger">NIE</Badge>;
};
