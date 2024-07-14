import { SignInProps } from "@api/service/auth/types";

export interface SignInFormProps extends SignInProps {
  rememberMe?: boolean;
}
