"use client";

import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { useRouter, usePathname } from "next/navigation";
import { useTokenMutation } from "@src/api/service/auth";
import { clearUser, setToken } from "@src/redux/reducers/auth";
import { setPreviousPage } from "@src/redux/reducers/history";
import axios from "axios";
import { processApiUrl } from "@src/api/utils";
import RedirectPage from "./pages/redirect-page";
import { VerifyTokenPage } from "./pages/token-page";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const userData = useAppSelector(({ auth }) => auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentPath = usePathname();

  // Configure Axios
  axios.defaults.baseURL = processApiUrl();
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${userData.accessToken}`;

  // Excluded paths that don't require authentication
  const excludedPaths = useMemo(
    () => ["/sign-in", "/sign-up", "/callback/new-password"],
    []
  );

  // Mutation hook for validating token
  const [checkToken, { isLoading, isError }] = useTokenMutation();

  useEffect(() => {
    // Redirect to sign-in if there's no access token and the path isn't excluded
    if (!userData.accessToken && !excludedPaths.includes(currentPath)) {
      dispatch(setPreviousPage(currentPath));

      router.push("/sign-in");
    }
  }, [dispatch, userData.accessToken, excludedPaths, currentPath, router]);

  useEffect(() => {
    if (isError) {
      // Clear user data and redirect on error
      dispatch(clearUser());
      if (!excludedPaths.includes(currentPath)) {
        router.push("/sign-in");
      }
    } else if (userData.accessToken) {
      // Validate token periodically
      const interval = setInterval(() => {
        checkToken({ token: `${userData.accessToken}` })
          .unwrap()
          .then((validTokenData) => {
            dispatch(setToken(validTokenData));
          })
          .catch(() => {
            dispatch(clearUser());
            router.push("/sign-in");
          });
      }, 900000);

      return () => clearInterval(interval);
    }
  }, [
    checkToken,
    dispatch,
    currentPath,
    isError,
    router,
    userData.accessToken,
  ]);

  if (isLoading && !userData.isLogin) return <VerifyTokenPage />;

  if (!userData.accessToken && !excludedPaths.includes(currentPath))
    return <RedirectPage />;

  return <>{children}</>;
};

export default AuthProvider;
