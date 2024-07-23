import { useParams, useRouter } from "next/navigation";
import { set, useForm } from "react-hook-form";
import { Save, ArrowBack, DisplaySettings } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

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
import { useGetDistrictsQuery } from "@src/api/service/dictionaries";
import { OptionProps } from "@src/utils/types";

export const UseSpotService = () => {
  const { email } = useAppSelector(({ user }) => user);
  const { id, district } = useParams<{ district: string; id?: string }>();

  const [districtOptions, setDistrictOptions] = useState<OptionProps[]>([]);
  const [clubOptions, setClubOptions] = useState<OptionProps[]>([]);

  const router = useRouter();

  const { reset, control, handleSubmit, formState } = useForm<FishingSpotProps>(
    {
      mode: "all",
      defaultValues,
      resolver: yupResolver(validationSchema),
    }
  );

  const { data, isFetching, isSuccess } = useGetFishingSpotQuery(
    { district, id: `${id}` },
    { skip: !id, refetchOnMountOrArgChange: true }
  );

  const {
    data: districts,
    isFetching: isDistrictListFetching,
    isSuccess: isDistrictsSuccess,
  } = useGetDistrictsQuery();

  const [create, { isLoading: isCreating }] = useCreateFishingSpotMutation();
  const [update, { isLoading: isUpdating }] = useUpdateFishingSpotMutation();

  const onSave = async (data: FishingSpotProps) => {
    if (!formState?.isDirty) {
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

  useEffect(() => {
    if (isDistrictsSuccess) {
      setDistrictOptions(
        districts.map(({ keyName, name }) => ({ label: name, value: keyName }))
      );
      setClubOptions(
        districts
          .find(({ keyName }) => keyName === district)
          ?.clubs?.map(({ name }) => ({ label: name, value: name })) || []
      );
    }
  }, [districts, district]);

  return {
    buttons,
    onSave,
    isLoading: isUpdating || isCreating || isDistrictListFetching || isFetching,
    id,
    data,
    district,
    control,
    handleSubmit,
    districtOptions,
    clubOptions,
    isDistrictListFetching,
  };
};
