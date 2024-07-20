import { useState } from "react";
import { Control, FieldValues } from "react-hook-form";

import { FieldProps } from "@shared/form";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const useGenerateSignInForm = <T extends FieldValues>(
  control: Control<T>
): FieldProps<T>[][] => {
  return [
    [
      {
        control,
        controlType: "input",
        inputProps: {
          label: "E-mail",
          name: "email",
          type: "email",
          required: true,
        },
      },
    ],
    [
      {
        control,
        controlType: "password",
        showPasswordVisibility: true,
        inputProps: {
          label: "Hasło",
          name: "password",
          required: true,
        },
      },
    ],
  ];
};
