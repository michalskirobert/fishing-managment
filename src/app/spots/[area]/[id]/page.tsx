import { FallbackLoader } from "@shared/fallback";
import dynamic from "next/dynamic";

const SpotComponent = dynamic(
  () => import("@components/spots/area-form/spot"),
  {
    ssr: false,
    loading: () => <FallbackLoader />,
  }
);

export default function Spot() {
  return <SpotComponent />;
}
