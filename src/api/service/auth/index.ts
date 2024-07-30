import { SignInProps, TokenProps } from "./types";

import { authSlice } from "@api/config";
import { INSTANCES_URLS } from "@api/utils";
import { UserDataProps } from "@redux/reducers/auth/types";
import { displayErrorMessage } from "@utils/functions/display-error-message";

const baseUrl = INSTANCES_URLS.auth;

export const authApi = authSlice.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<UserDataProps, SignInProps>({
      query: (body) => ({
        url: `${baseUrl}/sign-in`,
        method: "post",
        body,
      }),
      transformErrorResponse: (error) => {
        displayErrorMessage(error);
      },
    }),
    token: build.mutation<TokenProps, { token: string }>({
      query: (body) => ({
        url: `${baseUrl}/token`,
        method: "post",
        body,
      }),
      transformErrorResponse: (error) => {
        displayErrorMessage(error);
      },
    }),
  }),
});

export const { useSignInMutation, useTokenMutation } = authApi;
