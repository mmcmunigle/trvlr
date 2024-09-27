import React from 'react';
import Map from 'react-map-gl';

const InteractiveMap = () => {
  return (
    <Map
      id="demo"
      mapboxAccessToken="pk.eyJ1IjoiZ29vYmVyMzIxIiwiYSI6ImNseGdkYWRqbjB1b2EybHEza2x0eHBjZzcifQ.ZAHxKBc46TgDstcZ0Lw9GQ"
      initialViewState={{
        zoom: 2,
        latitude: 33.4,
        longitude: -92,
      }}
      style={{ width: '100%', minHeight: '50%', zIndex: 0 }}
      mapStyle="mapbox://styles/mapbox/standard"
    ></Map>
  );
};

export default InteractiveMap;
