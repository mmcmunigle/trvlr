'use client';

import { useEffect, useRef, useState } from 'react';
import Map, { LngLatBoundsLike, MapRef } from 'react-map-gl';
import boundingBoxes from '@/app/data/bounding-boxes.json';
import useTripStore from '@/app/state-management/trip-store';
import { CountryName } from '@/app/types/CountryName';

const InteractiveMap = () => {
  const { country } = useTripStore((store) => store.trip);
  const mapRef = useRef<MapRef>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!country) return;

    const coords = boundingBoxes[country as CountryName];
    mapRef.current?.fitBounds(coords as LngLatBoundsLike);
  }, [country, mapLoaded]);

  return (
    <Map
      ref={mapRef}
      id="demo"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        zoom: 2,
        latitude: 33.4,
        longitude: -92,
      }}
      style={{ width: '100%', minHeight: '50%', zIndex: 0 }}
      mapStyle="mapbox://styles/mapbox/light-v9"
      onLoad={() => setMapLoaded(true)}
    ></Map>
  );
};

export default InteractiveMap;
