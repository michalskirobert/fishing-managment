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

export type DictionaryProps = {
  _id: string;
  name: string;
  createdDate: Date | null;
  language: "pl" | "en" | "uk" | "rus";
  isActive: boolean;
};
