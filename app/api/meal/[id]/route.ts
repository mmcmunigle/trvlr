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

  const { title, type, description, start, end, allDay, onCalendar } = body;

  const meal = await prisma.meal.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!meal) {
    return NextResponse.json({ error: 'Invalid Meal' }, { status: 404 });
  }

  const updatedIssue = await prisma.meal.update({
    where: { id: meal.id },
    data: {
      title: title,
      type: type,
      description: description,
      start: start,
      end: end,
      allDay: allDay,
      onCalendar: onCalendar,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  //   const session = await auth();
  //   if (!session) {
  //     return NextResponse.json({}, { status: 401 });
  //   }

  const meal = await prisma.meal.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!meal) {
    return NextResponse.json({ error: 'Invalid meal' }, { status: 404 });
  }

  await prisma.meal.delete({
    where: { id: meal.id },
  });

  return NextResponse.json({});
}
