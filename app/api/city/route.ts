import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';

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

  const { name, description, country, latitude, longitude, photos } = body;

  const city = await prisma.city.create({
    data: {
      name,
      description,
      country,
      latitude,
      longitude,
    },
  });

  photos.forEach(async (photo) => {
    await prisma.photoLink.create({
      data: {
        ...photo,
        cityId: city.id,
      },
    });
  });

  const cityWithPhotos = await prisma.city.findUnique({
    where: { id: city.id },
    include: { photos: true },
  });

  return NextResponse.json(cityWithPhotos);
}
