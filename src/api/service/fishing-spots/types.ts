export type FishingSpotProps = {
  _id?: string;
  name: string;
  area: string;
  code: string;
  isNoKill?: boolean;
  geolocation: {
    lat: number;
    lng: number;
  };
  author?: string;
  addedDate?: string;
  leaseFrom?: string;
  leaseUntil?: string;
  description: string;
  editedBy?: string;
  editDate?: string;
  isLeaseEnd?: boolean;
};

export type FishingSpotRequest = {
  id: string;
  area: string;
  body?: Partial<FishingSpotProps>;
};
