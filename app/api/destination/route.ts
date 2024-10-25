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

  const {
    name,
    description,
    days,
    stopNumber,
    color,
    startDate,
    endDate,
    latitude,
    longitude,
    tripId,
  } = body;

  const destination = await prisma.destination.create({
    data: {
      name,
      description,
      days,
      stopNumber,
      color,
      startDate,
      endDate,
      latitude,
      longitude,
      tripId,
    },
  });

  return NextResponse.json(destination);
}
