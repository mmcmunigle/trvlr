import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get('title');

  const place = await prisma.place.findFirst({
    where: { name: title! },
    include: { photos: true },
  });

  return NextResponse.json(place);
}

export async function POST(request: NextRequest) {
  //   const session = await auth();
  //   if (!session) {
  //     return NextResponse.json({}, { status: 401 });
  //   }

  const body = await request.json();
  //   const validation = patchIssueSchema.safeParse(body);

  //   if (!validation.success) {
  //     return NextResponse.json(validation.error.format(), { status: 400 });
  //   }

  const { name, description, link, cityName, latitude, longitude, photos } = body;

  const city = await prisma.city.findUnique({ where: { name: cityName } });

  if (!city) return NextResponse.json(null);

  const place = await prisma.place.create({
    data: {
      name,
      description,
      link,
      cityId: city.id,
      latitude,
      longitude,
      type: 'ACTIVITY',
    },
  });

  photos.forEach(async (photo: any) => {
    await prisma.placePhotoLink.create({
      data: {
        ...photo,
        placeId: place.id,
      },
    });
  });

  const placeWithPhotos = await prisma.place.findUnique({
    where: { id: place.id },
    include: { photos: true },
  });

  return NextResponse.json(placeWithPhotos);
}
