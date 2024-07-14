import {
  Box,
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  Tooltip,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Info } from "@mui/icons-material";

import { FormFeedback } from "@shared/form-feedback";

export interface CustomCheckboxProps<T extends FieldValues> {
  control: Control<T>;
  checkboxProps?: CheckboxProps;
  tooltip?: string;
  hide?: boolean;
  label?: string;
}

export const CustomCheckbox = <T extends FieldValues>({
  control,
  checkboxProps,
  hide,
  tooltip,
  label,
}: CustomCheckboxProps<T>) => {
  if (hide) return null;

  return (
    <Controller
      name={checkboxProps?.name as Path<T>}
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
            <FormControlLabel
              {...{
                label,
                control: (
                  <Checkbox
                    {...{
                      ref,
                      ...checkboxProps,
                      name,
                      value,
                      onChange,
                      error: invalid,
                      onBlur,
                    }}
                  />
                ),
              }}
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
