export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : `https://fishing-app-api.onrender.com`;

export const INSTANCES_URLS = {
  fishingSpots: "api/fishing-spots",
  auth: "api/authentication",
  dictionaries: "api/dictionaries",
} as const;

export type DataList<T> = {
  items: T[];
  totalItems: number;
};
