import { DistrictProps } from "./types";

import { apiSlice } from "@api/config";
import { INSTANCES_URLS } from "@api/utils";
import { displayErrorMessage } from "@utils/functions/display-error-message";

const baseUrl = INSTANCES_URLS.dictionaries;

export const dictionariesApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getDistricts: build.query<DistrictProps[], void>({
      query: () => ({
        url: `${baseUrl}/districts`,
      }),
      transformErrorResponse: (error) => {
        displayErrorMessage(error);
      },
    }),
  }),
});

export const { useGetDistrictsQuery } = dictionariesApi;
