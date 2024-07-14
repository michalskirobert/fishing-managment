"use client";

import { Card, CardActions, CardContent, Paper } from "@mui/material";
import { useFormContext } from "react-hook-form";

import { generateForm } from "./utils";

import { DetailButton, TButtonConfig } from "@shared/detail-buttons";
import { PageContent } from "@shared/page-content";
import { FormFields } from "@shared/form";
import { CustomLoadingBlocker } from "@shared/custom-loading-blocker";
import { FishingSpotProps } from "@api/service/fishing-spots/types";
import { useSpotsDictionaryQuery } from "@api/service/dictionaries";

interface SpotFormProps {
  buttons: TButtonConfig[];
  blocking: boolean;
  onSave: (data: FishingSpotProps) => Promise<void>;
  pageTitle: string;
}

export const SpotForm: React.FC<SpotFormProps> = ({
  blocking,
  buttons,
  onSave,
  pageTitle,
}) => {
  const { handleSubmit, control } = useFormContext<FishingSpotProps>();
  const { data: areaOptions, isFetching: isAreaListFetching } =
    useSpotsDictionaryQuery(undefined, { refetchOnMountOrArgChange: true });

  return (
    <PageContent
      title={pageTitle}
      subtitle='Uzupełnił wszystkie wymagane pola, które są oznaczone "*"'
    >
      <CustomLoadingBlocker blocking={blocking}>
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
                      areaOptions?.map(({ name }) => ({
                        label: name,
                        value: name.toLowerCase(),
                      })),
                      isAreaListFetching
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
};
