import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { Libraries, useJsApiLoader } from '@react-google-maps/api';

// Define the context type
interface MapsLibraryContextType {
  isLoaded: boolean;
  loadError: Error | undefined;
  placesService: google.maps.places.PlacesService | null;
}

// Create the context with the appropriate type
const MapsLibraryContext = createContext<MapsLibraryContextType | null>(null);

interface Props {
  children: ReactNode;
}

const LIBRARIES: Libraries = ['places'];

// Provider component with types
export const MapsLibraryProvider: React.FC<Props> = ({ children }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY!,
    libraries: LIBRARIES,
  });

  const mapRef = useRef<HTMLDivElement>(null); // Ref for the map container
  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      try {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 0, lng: 0 },
          zoom: 1,
        });
        const service = new google.maps.places.PlacesService(map);
        setPlacesService(service);
      } catch (error) {
        console.error('Error initializing Google Maps PlacesService:', error);
      }
    }
  }, [isLoaded]);

  return (
    <MapsLibraryContext.Provider value={{ isLoaded, loadError, placesService }}>
      <div ref={mapRef} style={{ display: 'none' }} /> {/* Hidden div for map */}
      {children}
    </MapsLibraryContext.Provider>
  );
};

// Custom hook with type checking
export const useMapsLibrary = (): MapsLibraryContextType => {
  const context = useContext(MapsLibraryContext);
  if (!context) {
    throw new Error('useMapsLibrary must be used within a MapsLibraryProvider');
  }
  return context;
};
