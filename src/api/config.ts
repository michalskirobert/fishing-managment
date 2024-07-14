import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import qs from "qs";

import { API_URL } from "./utils";

import { RootState } from "@redux/store";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "",
});

export const getQueryString = <T>(queryParams?: Partial<T>) =>
  `${qs.stringify(queryParams, { allowDots: true })}`;

export const baseQuery = () =>
  fetchBaseQuery({
    baseUrl: API_URL,
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
      ? { url: `${API_URL}/${args}`, headers }
      : {
          ...args,
          url: `${API_URL}/${args.url}`,
          headers,
        };

  return rawBaseQuery(adjustedArgs, api, extraOptions);
};

const authBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const adjustedArgs =
    typeof args === "string"
      ? { url: `${API_URL}/${args}` }
      : {
          ...args,
          url: `${API_URL}/${args.url}`,
        };

  return rawBaseQuery(adjustedArgs, api, extraOptions);
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
