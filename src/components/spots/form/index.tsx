"use client";

import { Card, CardActions, CardContent, Paper } from "@mui/material";
import { generateForm } from "./utils";

import { DetailButton } from "@shared/detail-buttons";
import { PageContent } from "@shared/page-content";
import { FormFields } from "@shared/form";
import { CustomLoadingBlocker } from "@shared/custom-loading-blocker";
import { UseSpotService } from "./service";

export default function SpotForm() {
  const {
    onSave,
    isLoading,
    buttons,
    control,
    handleSubmit,
    districtOptions,
    id,
    data,
    district,
  } = UseSpotService();

  return (
    <PageContent
      title={
        id
          ? `Łowisko ${data?.name} (kod: ${data?.code}) w okręgu ${district}`
          : `Dodaj nowe łowisko w okręgu ${district}`
      }
      subtitle='Uzupełnił wszystkie wymagane pola, które są oznaczone "*"'
    >
      <CustomLoadingBlocker {...{ isLoading }}>
        <form onSubmit={handleSubmit(onSave)}>
          <Paper sx={{ p: 2 }}>
            <Card>
              <CardActions>
                {buttons.map((button) => (
                  <DetailButton key={button.content} {...{ button }} />
                ))}
              </CardActions>
              <CardContent>
                <FormFields
                  {...{
                    fieldData: generateForm(
                      control,
                      districtOptions?.map(({ name }) => ({
                        label: name,
                        value: name.toLowerCase(),
                      }))
                    ),
                  }}
                />
              </CardContent>
            </Card>
          </Paper>
        </form>
      </CustomLoadingBlocker>
    </PageContent>
  );
}
