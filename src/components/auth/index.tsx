"use client";

import React, { useEffect, useMemo } from "react";
import { useAppSelector } from "@redux/store";
import { useRouter, usePathname } from "next/navigation";
import RedirectPage from "./pages/redirect-page";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const userData = useAppSelector(({ user }) => user);
  const router = useRouter();

  const currentPath = usePathname();

  // Wrap the initialization of excludedPaths in useMemo
  const excludedPaths = useMemo(() => ["/sign-in", "/sign-up"], []);

  useEffect(() => {
    if (!userData.accessToken && !excludedPaths.includes(currentPath)) {
      const time = setTimeout(() => {
        router.push("/sign-in");
      }, 1000);

      return () => clearTimeout(time);
    }
  }, [userData, excludedPaths, currentPath, router]);

  if (typeof window === undefined) return null;

  if (!userData.accessToken && !excludedPaths.includes(currentPath)) {
    return <RedirectPage />;
  }

  return <>{children}</>;
};

export default AuthProvider;
