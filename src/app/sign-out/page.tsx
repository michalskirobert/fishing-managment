"use client";

import { useEffect } from "react";

import { clearUser } from "@redux/reducers/auth";
import { useAppDispatch } from "@redux/store";
import SignOutPage from "@components/auth/pages/sign-out-page";

export default function SignOut() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearUser());
  }, [dispatch]);

  return <SignOutPage />;
}
