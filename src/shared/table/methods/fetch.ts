import axios, { AxiosRequestConfig } from "axios";

type TFetch<T, Y> = {
  url: string;
  config?: AxiosRequestConfig;
  tableParams?: string;
  extraParams?: string;
  onSuccess: (data: T) => Y;
  onFinally?: () => void;
};

export const fetchData = async <T, Y>({
  url,
  config,
  tableParams,
  extraParams,
  onSuccess,
  onFinally,
}: TFetch<T, Y>): Promise<Y> => {
  const paramString = extraParams
    ? `?${tableParams}&${extraParams}`
    : tableParams
    ? `?${tableParams}`
    : "";

  return axios({
    url: `${url}${paramString}`,
    ...config,
  })
    .then((response) => onSuccess(response.data as T))
    .catch(() => {
      throw new Error("Błąd podczas wczytywania danych");
    })
    .finally(() => {
      if (onFinally) onFinally();
    });
};
