import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';

const TRIPADVISOR_BASE_URL = 'https://api.content.tripadvisor.com/api/v1/location';
const TRIP_ADVISOR_API_KEY = 'AF79A9CBD1BC44D5A295E69DE39A0D57';

interface TripAdvisorSearchResponse {
  data: [
    {
      location_id: string;
      name: string;
      address_obj: {
        city: string;
        country: string;
      };
    },
  ];
}

interface TripAdvisorImageResponse {
  data: [
    {
      id: number;
      is_blessed: boolean;
      caption: string;
      published_date: string;
      images: {
        large: {
          url: string;
        };
      };
    },
  ];
}

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get('city');
  const activityName = request.nextUrl.searchParams.get('activity');
  const searchUrl = `${TRIPADVISOR_BASE_URL}/search?key=${TRIP_ADVISOR_API_KEY}&searchQuery=${city}%20${activityName}&language=en`;
  const options = { method: 'GET', headers: { accept: 'application/json' } };

  const searchData: TripAdvisorSearchResponse = await fetch(searchUrl, options)
    .then((res) => res.json())
    .catch((err) => console.error('error:' + err));

  console.log(searchData);

  const activity = searchData.data[0];

  const photosUrl = `https://api.content.tripadvisor.com/api/v1/location/${activity.location_id}/photos?key=${TRIP_ADVISOR_API_KEY}&language=en`;

  const photoData: TripAdvisorImageResponse = await fetch(photosUrl, options)
    .then((res) => res.json())
    .catch((err) => console.error('error:' + err));

  const photoLinks = photoData.data.map((photo) => ({ link: photo.images.large.url }));

  const respData = {
    title: activityName,
    location: activity.location_id,
    link: `https://https://www.tripadvisor.com/${activity.location_id}`,
    photos: photoLinks,
  };

  return NextResponse.json(respData);
}
