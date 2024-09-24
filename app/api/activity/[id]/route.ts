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

  const { title, type, description, start, end, allDay } = body;

  const activity = await prisma.activity.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!activity) {
    return NextResponse.json({ error: 'Invalid Activity' }, { status: 404 });
  }

  const updatedIssue = await prisma.activity.update({
    where: { id: activity.id },
    data: {
      title: title,
      type: type,
      description: description,
      start: start,
      end: end,
      allDay: allDay,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  //   const session = await auth();
  //   if (!session) {
  //     return NextResponse.json({}, { status: 401 });
  //   }

  const activity = await prisma.activity.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!activity) {
    return NextResponse.json({ error: 'Invalid Activity' }, { status: 404 });
  }

  await prisma.activity.delete({
    where: { id: activity.id },
  });

  return NextResponse.json({});
}
