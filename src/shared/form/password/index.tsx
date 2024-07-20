import { useState } from "react";

import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  Tooltip,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Info, Visibility, VisibilityOff } from "@mui/icons-material";

import { FormFeedback } from "@shared/form-feedback";

export interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  inputProps: TextFieldProps;
  tooltip?: string;
  hide?: boolean;
  showPasswordVisibility?: boolean;
}

export const CustomPasswordInput = <T extends FieldValues>({
  control,
  inputProps,
  hide,
  tooltip,
  showPasswordVisibility = false,
}: CustomInputProps<T>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

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
              InputProps={{
                endAdornment: showPasswordVisibility ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
              {...inputProps}
              type={showPassword ? "text" : "password"}
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
