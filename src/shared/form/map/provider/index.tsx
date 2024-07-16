import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

interface SearchControlProps {
  provider: OpenStreetMapProvider;
  onChange: (...event: any[]) => void;
  showMarker?: boolean;
  showPopup?: boolean;
  popupFormat?: (props: { query: string; result: any }) => string;
  maxMarkers?: number;
  retainZoomLevel?: boolean;
  animateZoom?: boolean;
  autoClose?: boolean;
  searchLabel?: string;
  keepResult?: boolean;
}

const SearchControl: React.FC<SearchControlProps> = (props) => {
  const map = useMap();

  useEffect(() => {
    const { provider, onChange, ...options } = props;

    const searchControlOptions = {
      ...options,
      provider,
      showMarker: false, // We'll handle markers manually
    };

    const searchControl = new (GeoSearchControl as any)(searchControlOptions);

    map.addControl(searchControl);

    const handleShowLocation = (event: any) => {
      const { location } = event;
      const { lat, lng } = location;
      onChange({ lat, lng });
    };

    map.on("geosearch/showlocation", handleShowLocation);

    return () => {
      map.off("geosearch/showlocation", handleShowLocation);
      map.removeControl(searchControl);
    };
  }, [map, props]);

  return null;
};

export default SearchControl;
