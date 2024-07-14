import { FallbackLoader } from "@shared/fallback";
import dynamic from "next/dynamic";

const SpotsComponent = dynamic(() => import("@components/spots"), {
  ssr: false,
  loading: () => <FallbackLoader />,
});

export default function SpotsList() {
  return <SpotsComponent />;
}
