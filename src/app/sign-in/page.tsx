"use client";

import { FallbackLoader } from "@shared/fallback";
import dynamic from "next/dynamic";

const SignInComponent = dynamic(() => import("@components/sign-in"), {
  ssr: false,
  loading: () => <FallbackLoader />,
});

export default function SignIn() {
  return <SignInComponent />;
}
