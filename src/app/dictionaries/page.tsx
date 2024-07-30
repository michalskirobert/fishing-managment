import { FallbackLoader } from "@shared/fallback";
import dynamic from "next/dynamic";

const SpotsComponent = dynamic(() => import("@components/dictionaries"), {
  ssr: false,
  loading: () => <FallbackLoader />,
});

export default function DictionariesPage() {
  return <SpotsComponent />;
}
