export enum ProfileId {
  Anonymous = 0,
  Admin = 1,
  Moderator = 10,
  Fisherman = 20,
}

export type UserDataProps = {
  _id: string;
  email: string;
  permissions: any[];
  permitNo: number | null;
  avatar: string;
  accountCreatedDate: string;
  lastVisitedDate: string;
  accessToken: string | null;
  isLogin: boolean;
  registries: any[];
  profileId: ProfileId;
  showMessage?: boolean;
};
