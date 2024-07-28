import { FishingSpotProps, FishingSpotRequest } from "./types";

import { apiSlice } from "@api/config";
import { INSTANCES_URLS } from "@api/utils";
import { TableDataProps } from "@src/api/types";
import { displayErrorMessage } from "@utils/functions/display-error-message";

const baseUrl = INSTANCES_URLS.fishingSpots;

export const fishingSpotsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getFishingSpotsList: build.query<TableDataProps<FishingSpotProps>, void>({
      query: () => ({
        url: baseUrl,
      }),
      transformErrorResponse: (error) => {
        displayErrorMessage(error);
      },
    }),
    getFishingSpot: build.query<FishingSpotProps, FishingSpotRequest>({
      query: ({ id, district }) => ({
        url: `${baseUrl}/${district}/${id}`,
      }),
      transformErrorResponse: (error) => {
        displayErrorMessage(error);
      },
    }),
    createFishingSpot: build.mutation<FishingSpotProps, FishingSpotProps>({
      query: (body) => ({
        url: baseUrl,
        body,
        method: "post",
      }),
      transformErrorResponse: (error) => {
        displayErrorMessage(error);
      },
    }),
    updateFishingSpot: build.mutation<FishingSpotProps, FishingSpotRequest>({
      query: ({ district, id, body }) => ({
        url: `${baseUrl}/${district}/${id}`,
        body,
        method: "put",
      }),
      transformErrorResponse: (error) => {
        displayErrorMessage(error);
      },
    }),
    removeFishingSpot: build.mutation<void, FishingSpotRequest>({
      query: ({ id, district }) => ({
        url: `${baseUrl}/${district}/${id}`,
        method: "delete",
      }),
      transformErrorResponse: (error) => {
        displayErrorMessage(error);
      },
    }),
  }),
});

export const {
  useGetFishingSpotQuery,
  useGetFishingSpotsListQuery,
  useCreateFishingSpotMutation,
  useUpdateFishingSpotMutation,
  useRemoveFishingSpotMutation,
} = fishingSpotsApi;
