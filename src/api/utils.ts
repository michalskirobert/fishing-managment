export const processApiUrl = () => {
  if (typeof window !== "undefined") {
    const hostname = location.hostname.split(".")[0];
    const domain = location.hostname.split(".").slice(1).join(".");

    return process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : `https://${hostname}-api.${domain}`;
  } else {
    return "";
  }
};

export const INSTANCES_URLS = {
  fishingSpots: "api/fishing-spots",
  auth: "api/authentication",
  dictionaries: "api/dictionaries",
} as const;
