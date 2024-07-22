import { FallbackLoader } from "@shared/fallback";
import dynamic from "next/dynamic";

const SpotComponent = dynamic(() => import("@components/spots/form"), {
  ssr: false,
  loading: () => <FallbackLoader />,
});

export default function Spot() {
  return <SpotComponent />;
}
