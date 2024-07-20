import { Box, FormControl, Tooltip } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Info } from "@mui/icons-material";

import { FormFeedback } from "@shared/form-feedback";

export interface CustomDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  dateProps: DatePickerProps<Dayjs>;
  tooltip?: string;
  hide?: boolean;
}

export const CustomDatePicker = <T extends FieldValues>({
  control,
  dateProps,
  hide,
  tooltip,
}: CustomDatePickerProps<T>) => {
  console.log(tooltip);

  if (hide) return null;

  return (
    <Controller
      name={dateProps.name as Path<T>}
      control={control}
      render={({
        field: { value, name, onBlur, onChange, ref },
        fieldState: { error, invalid },
      }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <FormControl fullWidth>
              <DatePicker
                {...{
                  format: "DD-MM-YYYY",
                  ...dateProps,
                  value: value || null,
                  name,
                  onBlur,
                  onChange,
                  ref,
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: "outlined",
                    error: invalid,
                  },
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
        </LocalizationProvider>
      )}
    />
  );
};
