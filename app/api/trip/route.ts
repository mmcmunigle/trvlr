import { NextRequest, NextResponse } from 'next/server';
// import { City } from '@/app/state-management/city-store';
import { prisma } from '@/prisma/prisma';

export async function POST(request: NextRequest) {
  // const session = await auth();
  // if (!session) {
  //     return NextResponse.json({}, {status: 401});
  // }

  const body = await request.json();
  //   const validation = patchIssueSchema.safeParse(body);

  //   if (!validation.success) {
  //     return NextResponse.json(validation.error.format(), { status: 400 });
  //   }

  const newTrip = await prisma.trip.create({
    data: {
      title: body.title,
      country: body.country,
      startDate: body.startDate,
      endDate: body.endDate,
    },
  });

  // if (body.cities) {
  //   body.cities.forEach(async (city: City) => {
  //     await prisma.destination.create({
  //       data: {
  //         name: city.name,
  //         description: city.description,
  //         days: city.days,
  //         stopNumber: city.stopNumber,
  //         latitude: city.latitude?.toPrecision(9),
  //         longitude: city.longitude,
  //         tripId: newTrip.id,
  //       },
  //     });
  //   });
  // }

  return NextResponse.json(newTrip, { status: 201 });
}
