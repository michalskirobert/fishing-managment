import { ProfileId } from "@src/redux/reducers/auth/types";

export type SignInProps = {
  email: string;
  password: string;
};

export interface SignUpProps extends SignInProps {
  profileId: ProfileId;
}

export type TokenProps = {
  message: string;
  token: string;
  showMessage: boolean;
};
