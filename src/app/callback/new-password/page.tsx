"use client";

import { FallbackLoader } from "@src/shared/fallback";
import dynamic from "next/dynamic";

const NewPasswordComponent = dynamic(
  () => import("@components/callback/new-password"),
  {
    ssr: false,
    loading: () => <FallbackLoader />,
  }
);

export default function PasswordPage() {
  return <NewPasswordComponent />;
}
