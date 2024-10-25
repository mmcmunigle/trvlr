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

  const { title, destinationId, rank, start, end, onCalendar } = body;

  const destination = await prisma.destination.findUnique({ where: { id: destinationId } });

  if (!destination) return NextResponse.json(null);

  const lodging = await prisma.lodging.create({
    data: {
      title,
      destinationId,
      rank,
      start,
      end,
      onCalendar,
    },
  });

  return NextResponse.json(lodging);
}
