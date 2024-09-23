import React from 'react';
import Map from 'react-map-gl';

// import 'mapbox-gl/dist/mapbox-gl.css';

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
      // projection={{ name: "globe" }}
      style={{ width: '100%', height: '350px', zIndex: 0 }}
      mapStyle="mapbox://styles/mapbox/standard"
    ></Map>
  );
};

export default InteractiveMap;
