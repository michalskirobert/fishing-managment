import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import qs from "qs";

import { RootState } from "@redux/store";
import { processApiUrl } from "./utils";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "",
});

export const getQueryString = <T>(queryParams?: Partial<T>) =>
  `${qs.stringify(queryParams, { allowDots: true })}`;

const handleTokenExpired = (
  status:
    | number
    | "FETCH_ERROR"
    | "PARSING_ERROR"
    | "TIMEOUT_ERROR"
    | "CUSTOM_ERROR"
    | undefined
) => {
  if (window.location.pathname === "/sign-in") return;

  if (status === 401 || status === 403) {
    window.location.href = "/sign-out";
  }
};

export const baseQuery = () =>
  fetchBaseQuery({
    baseUrl: processApiUrl(),
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.user.accessToken;

      headers.set("authorization", `Bearer  ${token}`);
      headers.set("content-type", "application/json");

      return headers;
    },
  });

const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const state = api.getState() as RootState;

  const accessToken = state.user.accessToken;

  if (!accessToken) {
    return {
      error: { status: "CUSTOM_ERROR", error: "token is missing" },
    };
  }

  const headers = {
    accept: "*/*",
    authorization: `Bearer ${accessToken}`,
  };

  const adjustedArgs =
    typeof args === "string"
      ? { url: `${processApiUrl()}/${args}`, headers }
      : {
          ...args,
          url: `${processApiUrl()}/${args.url}`,
          headers,
        };

  const result = await rawBaseQuery(adjustedArgs, api, extraOptions);

  handleTokenExpired(result.error?.status);

  return result;
};

const authBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const adjustedArgs =
    typeof args === "string"
      ? { url: `${processApiUrl()}/${args}` }
      : {
          ...args,
          url: `${processApiUrl()}/${args.url}`,
        };

  const result = await rawBaseQuery(adjustedArgs, api, extraOptions);

  handleTokenExpired(result.error?.status);

  return result;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  tagTypes: [],
  baseQuery: dynamicBaseQuery,
  endpoints: () => ({}),
});

export const authSlice = createApi({
  reducerPath: "authSlice",
  tagTypes: [],
  baseQuery: authBaseQuery,
  endpoints: () => ({}),
});
