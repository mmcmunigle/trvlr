import React, { useEffect, useRef, useState } from 'react';
import Map, { LngLatBoundsLike, MapRef, useMap } from 'react-map-gl';
import boundingBoxes from '@/app/data/bounding-boxes.json';
import useTripStore from '@/app/state-management/trip-store';

const InteractiveMap = () => {
  const country = useTripStore((store) => store.country);
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (!country || !mapRef) return;

    const coords = boundingBoxes[country];
    mapRef.current?.fitBounds(coords as LngLatBoundsLike);
  }, [country, mapRef]);

  return (
    <Map
      ref={mapRef} // @ts-ignore
      id="demo"
      mapboxAccessToken="pk.eyJ1IjoiZ29vYmVyMzIxIiwiYSI6ImNseGdkYWRqbjB1b2EybHEza2x0eHBjZzcifQ.ZAHxKBc46TgDstcZ0Lw9GQ"
      initialViewState={{
        zoom: 2,
        latitude: 33.4,
        longitude: -92,
      }}
      style={{ width: '100%', minHeight: '50%', zIndex: 0 }}
      mapStyle="mapbox://styles/mapbox/light-v9"
    ></Map>
  );
};

export default InteractiveMap;
