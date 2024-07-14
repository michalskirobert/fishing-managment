import { Control, FieldValues } from "react-hook-form";

import { FieldProps } from "@shared/form";

export const generateForm = <T extends FieldValues>(
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
        controlType: "input",
        inputProps: {
          label: "Hasło",
          name: "password",
          type: "password",
          required: true,
        },
      },
    ],
    [
      {
        control,
        controlType: "checkbox",
        label: "Zapamiętaj mnie",
        checkboxProps: { name: "rememberMe" },
      },
    ],
  ];
};
