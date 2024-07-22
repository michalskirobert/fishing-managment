import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Save, ArrowBack, DisplaySettings } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useEffect } from "react";

import { validationSchema } from "./validation-schema";
import { defaultValues } from "./utils";

import { FishingSpotProps } from "@api/service/fishing-spots/types";
import { TButtonConfig } from "@shared/detail-buttons";
import { useAppSelector } from "@redux/store";
import {
  useCreateFishingSpotMutation,
  useGetFishingSpotQuery,
  useUpdateFishingSpotMutation,
} from "@src/api/service/fishing-spots";
import { useSpotsDictionaryQuery } from "@src/api/service/dictionaries";

export const UseSpotService = () => {
  const { email } = useAppSelector(({ user }) => user);
  const { id, district } = useParams<{ district: string; id?: string }>();

  const router = useRouter();

  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FishingSpotProps>({
    mode: "all",
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const { data, isFetching, isSuccess } = useGetFishingSpotQuery(
    { district, id: `${id}` },
    { skip: !id }
  );

  const { data: districtOptions, isFetching: isdistrictListFetching } =
    useSpotsDictionaryQuery(undefined, { refetchOnMountOrArgChange: true });

  const [create, { isLoading: isCreating }] = useCreateFishingSpotMutation();
  const [update, { isLoading: isUpdating }] = useUpdateFishingSpotMutation();

  const onSave = async (data: FishingSpotProps) => {
    if (!isDirty) {
      router.push("/spots");

      return;
    }

    if (id) {
      const body: FishingSpotProps = {
        ...data,
        editDate: new Date().toLocaleDateString(),
        editedBy: email,
      };

      update({ district, id, body })
        .unwrap()
        .then(({ name, code }) => {
          toast.success(
            `Pomyślnie edytowano łowisko o nazwie "${name} (kod: ${code})"`
          );
          router.push("/spots");
        });
    } else {
      const body: FishingSpotProps = {
        ...data,
        addedDate: new Date().toLocaleDateString(),
        author: email,
      };

      create(body)
        .unwrap()
        .then(({ name, code }) => {
          toast.success(
            `Pomyślnie dodano łowisko o nazwie "${name} (kod: ${code})"`
          );
          router.push("/spots");
        });
    }
  };

  const buttons: TButtonConfig[] = [
    {
      content: "Zapisz",
      isLoading: isUpdating || isCreating,
      tooltipContent: "Dane zostaną zapisane na serwerze",
      buttonProps: {
        color: "success",
        startIcon: <Save />,
        type: "submit",
      },
    },
    {
      content: "Wróć do listy",
      tooltipContent:
        "Spowoduje to powrotem do listy łowisk, Twoje dane nie zostaną zapisane",
      buttonProps: {
        color: "secondary",
        startIcon: <ArrowBack />,
        onClick: () => router.push("/spots"),
      },
    },
    {
      content: "Migruj",
      tooltipContent: "Funkcja na razie niedostępna",
      buttonProps: {
        color: "warning",
        startIcon: <DisplaySettings />,
        disabled: true,
      },
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      reset(data);
    } else {
      reset({ ...defaultValues, district });
    }
  }, [reset, district, data]);

  return {
    buttons,
    onSave,
    isLoading: isUpdating || isCreating || isdistrictListFetching || isFetching,
    id,
    data,
    district,
    control,
    handleSubmit,
    districtOptions,
    isdistrictListFetching,
  };
};
