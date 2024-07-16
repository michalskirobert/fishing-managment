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
};
