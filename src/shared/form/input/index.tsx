import {
  Box,
  FormControl,
  TextField,
  TextFieldProps,
  Tooltip,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Info } from "@mui/icons-material";

import { FormFeedback } from "@shared/form-feedback";

export interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  inputProps: TextFieldProps;
  tooltip?: string;
  hide?: boolean;
}

export const CustomInput = <T extends FieldValues>({
  control,
  inputProps,
  hide,
  tooltip,
}: CustomInputProps<T>) => {
  if (hide) return null;

  return (
    <Controller
      name={inputProps.name as Path<T>}
      control={control}
      render={({
        field: { value, name, onBlur, onChange, ref },
        fieldState: { error, invalid },
      }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FormControl fullWidth>
            <TextField
              variant="standard"
              fullWidth
              name={name}
              error={invalid}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              {...inputProps}
              ref={ref}
            />
            <FormFeedback message={error?.message} />
          </FormControl>
          {tooltip && (
            <Tooltip title={tooltip}>
              <Info />
            </Tooltip>
          )}
        </Box>
      )}
    />
  );
};
