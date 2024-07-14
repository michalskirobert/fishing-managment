import { FishingSpotProps, FishingSpotRequest } from "./types";

import { apiSlice } from "@api/config";
import { DataList, INSTANCES_URLS } from "@api/utils";
import { displayErrorMessage } from "@utils/functions/display-error-message";

const baseUrl = INSTANCES_URLS.fishingSpots;

export const fishingSpotsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    fishingSpotsList: build.query<DataList<FishingSpotProps>, void>({
      query: () => ({
        url: baseUrl,
      }),
      transformErrorResponse: (error) => {
        displayErrorMessage(error);
      },
    }),
    fishingSpot: build.query<FishingSpotProps, FishingSpotRequest>({
      query: ({ id, area }) => ({
        url: `${baseUrl}/${area}/${id}`,
      }),
      transformErrorResponse: (error) => {
        displayErrorMessage(error);
      },
    }),
    addFishingSpot: build.mutation<FishingSpotProps, FishingSpotProps>({
      query: (body) => ({
        url: baseUrl,
        body,
        method: "post",
      }),
      transformErrorResponse: (error) => {
        displayErrorMessage(error);
      },
    }),
    editFishingSpot: build.mutation<FishingSpotProps, FishingSpotRequest>({
      query: ({ area, id, body }) => ({
        url: `${baseUrl}/${area}/${id}`,
        body,
        method: "put",
      }),
      transformErrorResponse: (error) => {
        displayErrorMessage(error);
      },
    }),
    removeFishingSpot: build.mutation<void, FishingSpotRequest>({
      query: ({ id, area }) => ({
        url: `${baseUrl}/${area}/${id}`,
        method: "delete",
      }),
      transformErrorResponse: (error) => {
        displayErrorMessage(error);
      },
    }),
  }),
});

export const {
  useFishingSpotsListQuery,
  useAddFishingSpotMutation,
  useEditFishingSpotMutation,
  useFishingSpotQuery,
  useRemoveFishingSpotMutation,
} = fishingSpotsApi;
