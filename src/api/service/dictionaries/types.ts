export type ClubProps = {
  name: string;
  districtName: string;
};

export type DistrictProps = {
  _id: string;
  name: string;
  keyName: string;
  clubs: ClubProps[];
};

export type SpotTypeProps = {
  _id: string;
  name: string;
};
