import { Init } from "./types";

import { apiSlice } from "@api/config";

export const initApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getInit: build.query<Init, void>({
      query: () => ({
        url: "api/init",
      }),
    }),
  }),
});

export const { useGetInitQuery, useLazyGetInitQuery } = initApi;
