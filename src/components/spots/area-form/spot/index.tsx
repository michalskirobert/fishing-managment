"use client";

import { FormProvider } from "react-hook-form";

import { SpotForm } from "../../form";

import { UseSpotService } from "./service";

export default function Spot() {
  const { buttons, isAction, methods, onSave, pageTitle } = UseSpotService();

  return (
    <FormProvider {...methods}>
      <SpotForm
        {...{
          blocking: isAction,
          buttons,
          onSave,
          pageTitle,
        }}
      />
    </FormProvider>
  );
}
