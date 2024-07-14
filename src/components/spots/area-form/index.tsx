"use client";

import { FormProvider } from "react-hook-form";

import { SpotForm } from "../form";

import { UseSpotService } from "./service";

export default function Spot() {
  const { buttons, isLoading, methods, onSave, area } = UseSpotService();

  return (
    <FormProvider {...methods}>
      <SpotForm
        {...{
          blocking: isLoading,
          buttons,
          onSave,
          pageTitle: `Dodaj nowe łowisko w okręgu ${area}`,
        }}
      />
    </FormProvider>
  );
}
