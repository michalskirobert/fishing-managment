"use client";

import { FallbackLoader } from "@shared/fallback";
import dynamic from "next/dynamic";

const Customers = dynamic(() => import("@components/customers"), {
  ssr: false,
  loading: () => <FallbackLoader />,
});

export default function CustomersPage() {
  return <Customers />;
}
