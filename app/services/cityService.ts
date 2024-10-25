import { CityPhotoLink } from '@prisma/client';
import axios from 'axios';
import { initializePlacesLibrary } from './placeLibraryService';

export interface CityGtpResponse {
  name: string;
  description: string;
}

interface UnsplashImageResponse {
  urls: { small: string };
  user: { id: string; name: string };
}

export const getCityOptions = async (country: string) => {
  const suggestedCities = await generateCities(country);

  // Wait for all city lookups to complete before returning
  const cityOptions = await Promise.all(
    suggestedCities.map(async (city) => {
      let cityData =
        (await getCityData(city.name))?.data || (await findCityData(city, country))?.data;
      return cityData || null;
    })
  );

  // Filter out any null results
  return cityOptions.filter((city) => city !== null);
};

const generateCities = async (country: string) => {
  return await axios
    .post<CityGtpResponse[]>('/api/generate/city', { country })
    .then((resp) => {
      return resp.data;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
};

const getCityData = async (cityName: string) => {
  const resp = await axios.get(`/api/city/${cityName}`).catch((error) => {
    console.error(error);
    return null;
  });

  return resp;
};

const findCityData = async (city: CityGtpResponse, country: string) => {
  const Place = await initializePlacesLibrary();
  type Response = {
    places: google.maps.places.Place[];
  };

  // Fetch from Google if city not found in DB
  const { places }: Response = await Place.searchByText({
    textQuery: `${city.name}, ${country}`,
    fields: ['photos', 'location'],
  });

  const photoLinks = await getUnsplashPhotos(city.name);

  if (places.length) {
    const resp = await axios.post('/api/city', {
      name: city.name,
      description: city.description,
      country: country,
      latitude: places[0].location?.lat(),
      longitude: places[0].location?.lng(),
      photos: photoLinks,
    });

    return resp;
  }

  return null;
};

const saveCityData = async (city: CityGtpResponse) => {};

export async function getUnsplashPhotos(cityName: string) {
  const clientId = 'LzczRZIzA1e3AN39z1wT6CSdxip3_IqU5ebCHhvnqOo';
  const unsplashAPI = 'https://api.unsplash.com/search/photos';
  let photos: CityPhotoLink[] = [];

  try {
    const resp = await axios.get(`${unsplashAPI}?query=${cityName}&client_id=${clientId}`);

    photos = resp.data.results.map((image: UnsplashImageResponse) => ({
      link: image.urls.small,
      source: image.user.name,
      sourceId: image.user.id,
    }));
  } catch (error) {
    console.error(error);
    // Handle or return an empty array in case of failure
  }

  return photos;
}
