import { NextRequest, NextResponse } from 'next/server';
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

  const { name, description, startTime, endTime } = body;

  const destination = await prisma.destination.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!destination) {
    return NextResponse.json({ error: 'Invalid Destination' }, { status: 404 });
  }

  const updatedIssue = await prisma.destination.update({
    where: { id: destination.id },
    data: {
      name: name,
      description: description,
      startDate: startTime,
      endDate: endTime,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  //   const session = await auth();
  //   if (!session) {
  //     return NextResponse.json({}, { status: 401 });
  //   }

  const destination = await prisma.destination.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!destination) {
    return NextResponse.json({ error: 'Invalid Destination' }, { status: 404 });
  }

  await prisma.destination.delete({
    where: { id: destination.id },
  });

  return NextResponse.json({});
}
