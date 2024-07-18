"use client";

import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { useRouter, usePathname } from "next/navigation";
import RedirectPage from "./pages/redirect-page";
import { useTokenMutation } from "@src/api/service/auth";
import { VerifyTokenPage } from "./pages/token-page";
import { clearUser } from "@src/redux/reducers/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const userData = useAppSelector(({ user }) => user);
  const router = useRouter();

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
      const time = setTimeout(() => {
        router.push("/sign-in");
      }, 1000);

      return () => clearTimeout(time);
    }
  }, [userData, excludedPaths, currentPath, router]);

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
