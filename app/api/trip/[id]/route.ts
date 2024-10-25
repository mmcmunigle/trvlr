import { NextRequest, NextResponse } from 'next/server';
import { count } from 'console';
import { prisma } from '@/prisma/prisma';

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  //   const session = await auth();
  //   if (!session) {
  //     return NextResponse.json({}, { status: 401 });
  //   }

  const body = await request.json();
  //   const validation = patchIssueSchema.safeParse(body);

  //   if (!validation.success) {
  //     return NextResponse.json(validation.error.format(), { status: 400 });
  //   }

  const { country, startDate, endDate } = body;

  const trip = await prisma.trip.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!trip) {
    return NextResponse.json({ error: 'Invalid Trip' }, { status: 404 });
  }

  const updatedTrip = await prisma.trip.update({
    where: { id: trip.id },
    data: {
      country: country,
      startDate: startDate,
      endDate: endDate,
    },
  });

  return NextResponse.json(updatedTrip);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  //   const session = await auth();
  //   if (!session) {
  //     return NextResponse.json({}, { status: 401 });
  //   }

  const trip = await prisma.trip.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!trip) {
    return NextResponse.json({ error: 'Invalid Trip' }, { status: 404 });
  }

  await prisma.trip.delete({
    where: { id: trip.id },
  });

  return NextResponse.json({});
}
