import axios from 'axios';
import { initializePlacesLibrary } from './placeLibraryService';

export interface AcivityGtpResponse {
  title: string;
  description: string;
  location: string;
}

export const getActivityRecommendations = async (city: string) => {
  // return process.env.TRIP_ADVISOR_API_KEY;
  const suggestedActivities = await generateActivities(city);

  // Wait for all activity lookups to complete before returning
  // const activtyOptions = await Promise.all(
  //   suggestedActivities.map(async (activity) => {
  //     let activityData =
  //       (await getActivityData(activity.title)) || (await searchGooglePlaces(activity, city));
  //     return activityData || null;
  //   })
  // );

  return suggestedActivities;
};

const generateActivities = async (city: string) => {
  const resp = await axios.post<AcivityGtpResponse[]>('/api/generate/activity', {
    city,
    activityLevel: 2,
  });

  return resp.data;
};

//https://tripadvisor-content-api.readme.io/reference/searchforlocations
const searchTripAdvisor = async (activityTitle: string, cityName: string) => {
  const searchResp = await axios.get(
    `/api/tripadvisor/activity?city=${cityName}&activity=${activityTitle}`
  );

  if (searchResp.status !== 200) {
    return null;
  }

  return await searchResp.data;
};

const getActivityData = async (activityTitle: string) => {
  const resp = await axios.get(`/api/place?title=${activityTitle}`).catch((error) => {
    console.error(error);
    return null;
  });

  return resp?.data;
};

const searchGooglePlaces = async (activity: AcivityGtpResponse, city: string) => {
  const Place = await initializePlacesLibrary();
  type Response = {
    places: google.maps.places.Place[];
  };

  const { places }: Response = await Place.searchByText({
    textQuery: `${activity.title}, ${city}`,
    fields: ['photos', 'location'],
  });

  if (!places.length) {
    return null;
  }

  const photoLink = places[0].photos?.length
    ? places[0].photos[0].getURI() + '&maxWidthPx=250'
    : null;

  const resp = await axios.post('/api/place', {
    name: activity.title,
    description: activity.description,
    cityName: city,
    latitude: places[0].location?.lat(),
    longitude: places[0].location?.lng(),
    photos: [
      {
        link: photoLink,
        source: 'Google',
        sourceId: 'Google',
      },
    ],
  });

  return resp.data;
};

// const saveCityData = async (city: CityGtpResponse) => {};

// export async function getUnsplashPhotos(cityName: string) {
//   const clientId = 'LzczRZIzA1e3AN39z1wT6CSdxip3_IqU5ebCHhvnqOo';
//   const unsplashAPI = 'https://api.unsplash.com/search/photos';
//   let photos: PhotoLink[] = [];

//   try {
//     const resp = await axios.get(`${unsplashAPI}?query=${cityName}&client_id=${clientId}`);

//     photos = resp.data.results.map((image: TripAdvisorResponse) => ({
//       link: image.urls.small,
//       source: image.user.name,
//       sourceId: image.user.id,
//     }));
//   } catch (error) {
//     console.error(error);
//     // Handle or return an empty array in case of failure
//   }

//   return photos;
// }
