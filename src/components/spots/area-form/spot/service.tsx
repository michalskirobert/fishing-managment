import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Save, ArrowBack } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useEffect } from "react";

import { defaultValues } from "../../form/utils";
import { validationSchema } from "../../form/validation-schema";

import {
  useEditFishingSpotMutation,
  useFishingSpotQuery,
} from "@api/service/fishing-spots";
import { FishingSpotProps } from "@api/service/fishing-spots/types";
import { TButtonConfig } from "@shared/detail-buttons";
import { useAppSelector } from "@redux/store";

export const UseSpotService = () => {
  const { email } = useAppSelector(({ user }) => user);
  const router = useRouter();

  const { area, id } = useParams<{ id: string; area: string }>();

  const { data, isLoading, isSuccess } = useFishingSpotQuery(
    { area, id },
    { skip: !id || !area }
  );

  const methods = useForm<FishingSpotProps>({
    mode: "all",
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const [update, { isLoading: isUpdating }] = useEditFishingSpotMutation();

  const onSave = async (data: FishingSpotProps) => {
    const body: FishingSpotProps = {
      ...data,
      editDate: new Date().toLocaleDateString(),
      editedBy: email,
    };
    update({ area, id, body })
      .unwrap()
      .then((resp) => {
        toast.success(
          `Pomyślnie dodano łowisko o nazwie "${resp.name} (kod: ${resp?.code})"`
        );
        router.push("/spots");
      });
  };

  const buttons: TButtonConfig[] = [
    {
      content: "Zapisz",
      isLoading: isUpdating,
      buttonProps: {
        color: "success",
        startIcon: <Save />,
        type: "submit",
      },
    },
    {
      content: "Wróć do listy",
      buttonProps: {
        color: "secondary",
        startIcon: <ArrowBack />,
        onClick: () => router.push("/spots"),
      },
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      methods.reset(data);
    }
  }, [methods, data, isSuccess]);

  return {
    buttons,
    methods,
    onSave,
    isAction: isUpdating || isLoading,
    pageTitle: `Edycja ${data?.name || "łowiska"} (kod: ${
      data?.code || "0.00"
    })`,
  };
};
