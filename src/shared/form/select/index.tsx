import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  TextField,
  TextFieldProps,
  Tooltip,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Info } from "@mui/icons-material";

import { FormFeedback } from "@shared/form-feedback";
import { CustomLoadingBlocker } from "@shared/custom-loading-blocker";
import { OptionProps } from "@src/utils/types";

export interface CustomSelectProps<T extends FieldValues> {
  control: Control<T>;
  selectProps?: SelectProps;
  options?: OptionProps[];
  tooltip?: string;
  hide?: boolean;
  isLoading?: boolean;
}

export const CustomSelect = <T extends FieldValues>({
  control,
  selectProps,
  hide,
  options,
  tooltip,
  isLoading,
}: CustomSelectProps<T>) => {
  if (hide) return null;

  return (
    <Controller
      name={selectProps?.name as Path<T>}
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
            <InputLabel id={selectProps?.id}>
              {selectProps?.required
                ? `${selectProps?.label} *`
                : selectProps?.label}
            </InputLabel>

            <Select
              {...{
                variant: "standard",
                name,
                ...selectProps,
                onChange,
                onBlur,
                value,
                error: invalid,
                ref,
              }}
            >
              {isLoading ? (
                <MenuItem> Wczytywanie...</MenuItem>
              ) : (
                options?.map(({ label, value }) => (
                  <MenuItem key={label} {...{ value }}>
                    {label}
                  </MenuItem>
                ))
              )}
            </Select>

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
