import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Save, ArrowBack } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useEffect } from "react";

import { validationSchema } from "../form/validation-schema";
import { defaultValues } from "../form/utils";

import { useAddFishingSpotMutation } from "@api/service/fishing-spots";
import { FishingSpotProps } from "@api/service/fishing-spots/types";
import { TButtonConfig } from "@shared/detail-buttons";
import { useAppSelector } from "@redux/store";

export const UseSpotService = () => {
  const { email } = useAppSelector(({ user }) => user);
  const { area } = useParams<{ area: string }>();

  const router = useRouter();
  const methods = useForm<FishingSpotProps>({
    mode: "all",
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const [addFishingSpot, { isLoading }] = useAddFishingSpotMutation();

  const onSave = async (data: FishingSpotProps) => {
    const body: FishingSpotProps = {
      ...data,
      addedDate: new Date().toLocaleDateString(),
      author: email,
    };

    addFishingSpot(body)
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
      isLoading: isLoading,
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
    methods.reset({ ...defaultValues, area });
  }, [methods, defaultValues, area]);

  return { buttons, methods, onSave, isLoading, area };
};
