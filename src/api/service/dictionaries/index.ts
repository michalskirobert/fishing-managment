import { SpotsDictionary } from "./types";

import { apiSlice } from "@api/config";
import { INSTANCES_URLS } from "@api/utils";
import { displayErrorMessage } from "@utils/functions/display-error-message";

const baseUrl = INSTANCES_URLS.dictionaries;

export const dictionariesApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    spotsDictionary: build.query<SpotsDictionary[], void>({
      query: () => ({
        url: `${baseUrl}/spots`,
      }),
      transformErrorResponse: (error) => {
        displayErrorMessage(error);
      },
    }),
  }),
});

export const { useSpotsDictionaryQuery, useLazySpotsDictionaryQuery } =
  dictionariesApi;
