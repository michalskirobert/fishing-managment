import { FallbackLoader } from "@shared/fallback";
import dynamic from "next/dynamic";

const SpotsComponent = dynamic(() => import("@components/spots/area-form"), {
  ssr: false,
  loading: () => <FallbackLoader />,
});

export default function SpotsArea() {
  return <SpotsComponent />;
}
