import { Control, FieldValues } from "react-hook-form";

import { FishingSpotProps } from "@api/service/fishing-spots/types";
import { FieldProps } from "@shared/form";
import { OptionProps } from "@src/utils/types";

export const generateForm = <T extends FieldValues>(
  control: Control<T>,
  districtOptions?: OptionProps[],
  clubOptions?: OptionProps[]
): FieldProps<T>[][] => [
  [
    {
      control,
      controlType: "input",
      tooltip: "Kod łowiska",
      inputProps: {
        label: "Kod",
        type: "number",
        name: "code",
        variant: "outlined",
        color: "primary",
        required: true,
      },
    },
    {
      control,
      controlType: "input",
      tooltip: "Nazwa łowiska",
      inputProps: {
        label: "Nazwa",
        name: "name",
        variant: "outlined",
        color: "primary",
        required: true,
      },
    },
  ],
  [
    {
      control,
      controlType: "select",
      tooltip: "Okręg do którego jest przydzielone łowisko",
      options: districtOptions || [],
      selectProps: {
        label: "Okręg",
        name: "district",
        variant: "outlined",
        color: "primary",
        required: true,
        disabled: true,
      },
    },
    {
      control,
      controlType: "select",
      tooltip: "Koło do którego jest przydzielone łowisko",
      options: clubOptions || [],
      selectProps: {
        label: "Koło",
        name: "club",
        variant: "outlined",
        color: "primary",
        required: true,
      },
    },
  ],
  [
    {
      control,
      controlType: "input",
      tooltip: "Opis danego akwenu oraz jego regulamin",
      inputProps: {
        label: "Opis / Regulamin",
        type: "text",
        multiline: true,
        rows: 4,
        name: "description",
        variant: "outlined",
        required: true,
      },
    },
  ],
  [
    {
      control,
      controlType: "date",
      tooltip: "Data ważności danego łowiska",
      dateProps: { label: "Ważne od", name: "leaseFrom" },
    },
    {
      control,
      controlType: "date",
      tooltip: "Data przewidzianego zakończenia współpracy dzierżawy",
      dateProps: { label: "Ważne do", name: "leaseUntil" },
    },
  ],
  [
    {
      control,
      controlType: "switch",
      label: "Złów i wypuść",
      switchProps: {
        name: "isNoKill",
      },
    },
    {
      control,
      controlType: "switch",
      label: "Zakończono współpracę",
      switchProps: {
        name: "isLeaseEnd",
      },
    },
  ],
  [
    {
      control,
      controlType: "map",
      name: "geolocation",
    },
  ],
];

export const defaultValues: FishingSpotProps = {
  district: "",
  club: "",
  code: "",
  description: "",
  geolocation: { lat: 52.2330909, lng: 20.9301089 },
  name: "",
  addedDate: "",
  author: "",
  isNoKill: false,
  isLeaseEnd: false,
  leaseFrom: null,
  leaseUntil: null,
};
