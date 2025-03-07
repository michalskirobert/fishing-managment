"use client";

import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { useRouter, usePathname } from "next/navigation";
import RedirectPage from "./pages/redirect-page";
import { useTokenMutation } from "@src/api/service/auth";
import { VerifyTokenPage } from "./pages/token-page";
import { clearUser } from "@src/redux/reducers/auth";
import { setPreviousPage } from "@src/redux/reducers/history";

import axios from "axios";
import { processApiUrl } from "@src/api/utils";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const userData = useAppSelector(({ user }) => user);
  const router = useRouter();

  axios.defaults.baseURL = processApiUrl();
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${userData.accessToken}`;

  const dispatch = useAppDispatch();

  const [checkToken, { isLoading, isError }] = useTokenMutation();

  const currentPath = usePathname();

  // Wrap the initialization of excludedPaths in useMemo
  const excludedPaths = useMemo(
    () => ["/sign-in", "/sign-up", "/callback/new-password"],
    []
  );

  useEffect(() => {
    if (!userData.accessToken && !excludedPaths.includes(currentPath)) {
      dispatch(setPreviousPage(currentPath));

      const time = setTimeout(() => {
        router.push("/sign-in");
      }, 1000);

      return () => clearTimeout(time);
    }
  }, [dispatch, userData, excludedPaths, currentPath, router]);

  useEffect(() => {
    if (isError) {
      dispatch(clearUser());

      if (excludedPaths.includes(currentPath)) return;
      router.push("/sign-out");

      return;
    }

    if (userData.accessToken) {
      const interval = setInterval(() => {
        checkToken({ token: `${userData.accessToken}` });
      }, 900000);

      return () => clearInterval(interval);
    }
  }, [
    currentPath,
    isError,
    userData.accessToken,
    excludedPaths,
    checkToken,
    dispatch,
    router,
  ]);

  if (typeof window === undefined) return null;

  if (isLoading && !userData.isLogin) return <VerifyTokenPage />;

  if (!userData.accessToken && !excludedPaths.includes(currentPath)) {
    return <RedirectPage />;
  }

  return children;
};

export default AuthProvider;
