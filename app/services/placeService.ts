// placesService.ts
let placeService: typeof google.maps.places.Place | null = null;

export const initializePlaces = async () => {
  if (!placeService) {
    const { Place } = (await google.maps.importLibrary('places')) as google.maps.PlacesLibrary;

    placeService = Place;
  }
  return placeService;
};
