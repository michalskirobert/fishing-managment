import { FieldProps } from "@src/shared/form";
import { Control, FieldValues } from "react-hook-form";

export const generateForm = <T extends FieldValues>(
  control: Control<T>
): FieldProps<T>[][] => [
  [
    {
      control,
      controlType: "input",
      inputProps: {
        name: "email",
        label: "Email",
        variant: "outlined",
        required: true,
      },
    },
  ],
  [
    {
      control,
      controlType: "input",
      inputProps: {
        name: "secretCode",
        label: "Odpowiedź",
        variant: "outlined",
        required: true,
      },
    },
  ],
];
