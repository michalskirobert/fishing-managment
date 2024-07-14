import {
  Box,
  FormControlLabel,
  Switch,
  SwitchProps,
  Tooltip,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Info } from "@mui/icons-material";

export interface CustomSwitchProps<T extends FieldValues> {
  control: Control<T>;
  switchProps: SwitchProps;
  tooltip?: string;
  hide?: boolean;
  label?: string;
}

export const CustomSwitch = <T extends FieldValues>({
  control,
  switchProps,
  hide,
  tooltip,
  label,
}: CustomSwitchProps<T>) => {
  if (hide) return null;

  return (
    <Controller
      name={switchProps.name as Path<T>}
      control={control}
      render={({ field: { value, name, onBlur, onChange, ref } }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FormControlLabel
            {...{
              label,
              control: (
                <Switch
                  {...{
                    ...switchProps,
                    ref,
                    name,
                    checked: value,
                    id: name,
                    onBlur,
                    onChange,
                  }}
                />
              ),
            }}
          />
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
