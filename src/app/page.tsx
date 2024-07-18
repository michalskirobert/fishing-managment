import { FallbackLoader } from "@src/shared/fallback";
import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("@components/dashboard"), {
  ssr: false,
  loading: () => <FallbackLoader />,
});

export default function Home() {
  return <Dashboard />;
}
