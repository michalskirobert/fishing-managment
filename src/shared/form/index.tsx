import { Control, FieldValues } from "react-hook-form";
import {
  CheckboxProps,
  SelectProps,
  SwitchProps,
  TextFieldProps,
} from "@mui/material";
import { DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

import { CustomSwitch } from "./switch";
import { CustomSelect } from "./select";
import { CustomInput } from "./input";
import { CustomCheckbox } from "./checkbox";
import { CustomMap } from "./map";
import { Col, Row } from "reactstrap";
import { CustomPasswordInput } from "./password";
import { CustomDatePicker } from "./date";

type TColSizes = {
  xs?: number;
  sm?: number;
  md?: number;
  lg: number;
  xl?: number;
};

export type ControlType =
  | "input"
  | "select"
  | "switch"
  | "checkbox"
  | "date"
  | "map"
  | "password";

export type FieldProps<T extends FieldValues> = {
  control: Control<T>;
  label?: string;
  sliderLabel?: string;
  size?: TColSizes;
  inputProps?: TextFieldProps;
  dateProps?: DatePickerProps<Dayjs>;
  selectProps?: SelectProps;
  switchProps?: SwitchProps;
  checkboxProps?: CheckboxProps;
  tooltipMessage?: string;
  dictionaryId?: string;
  isLoading?: boolean;
  showPasswordVisibility?: boolean;
  classnames?: {
    colClassName?: string;
  };
  hide?: boolean;
  name?: string;
  controlType: ControlType;
  options?: { label: string; value: string | number }[];
  tooltip?: string;
};

export type FieldDataProps<T extends FieldValues> = {
  fieldData: FieldProps<T>[][];
};

export const GenerateField = <T extends FieldValues>({
  formField,
}: {
  formField: FieldProps<T>;
}) => {
  const {
    control,
    controlType,
    inputProps,
    label,
    selectProps,
    tooltipMessage,
    options,
    switchProps,
    tooltip,
    hide,
    checkboxProps,
    name,
    isLoading,
    dictionaryId,
    showPasswordVisibility,
    dateProps,
  } = formField;

  switch (controlType) {
    case "input":
      return (
        <CustomInput
          {...{
            control,
            tooltip,
            hide,
            inputProps: inputProps || {},
            tooltipMessage,
          }}
        />
      );
    case "password":
      return (
        <CustomPasswordInput
          {...{
            control,
            tooltip,
            hide,
            inputProps: inputProps || {},
            tooltipMessage,
            showPasswordVisibility,
          }}
        />
      );
    case "select":
      return (
        <CustomSelect
          {...{
            control,
            label,
            hide,
            tooltip,
            selectProps: selectProps || {},
            options,
            isLoading,
            dictionaryId,
          }}
        />
      );

    case "switch":
      return (
        <CustomSwitch
          {...{
            label,
            tooltip,
            hide,
            switchProps: switchProps || {},
            control,
          }}
        />
      );
    case "checkbox":
      return (
        <CustomCheckbox
          {...{
            label,
            control,
            hide,
            tooltip,
            checkboxProps: checkboxProps || {},
          }}
        />
      );
    case "date":
      return (
        <CustomDatePicker
          {...{
            control,
            hide,
            tooltip,
            dateProps: dateProps || {},
          }}
        />
      );
    case "map":
      return (
        <CustomMap
          {...{
            control,
            name,
            hide,
            label,
            tooltip,
          }}
        />
      );

    default:
      break;
  }
};

export const FormFields = <T extends FieldValues>({
  fieldData,
}: FieldDataProps<T>) => (
  <>
    {fieldData.map((row) => (
      <Row key={`row-${crypto.randomUUID()}`} style={{ marginTop: 8 }}>
        {row.map((formField) => {
          if (formField.hide) {
            return null;
          }

          return (
            <Col
              lg={formField?.size?.lg}
              md={formField.size?.md}
              sm={formField.size?.sm}
              className={formField?.classnames?.colClassName || ""}
              key={`col-${crypto.randomUUID()}`}
            >
              <GenerateField {...{ formField }} />
            </Col>
          );
        })}
      </Row>
    ))}
  </>
);
