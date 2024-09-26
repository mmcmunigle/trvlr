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

  const { title, type, description, start, end, onCalendar } = body;

  const lodging = await prisma.lodging.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!lodging) {
    return NextResponse.json({ error: 'Invalid lodging' }, { status: 404 });
  }

  const updatedIssue = await prisma.lodging.update({
    where: { id: lodging.id },
    data: {
      name: title,
      type: type,
      description: description,
      start: start,
      end: end,
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

  const lodging = await prisma.lodging.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!lodging) {
    return NextResponse.json({ error: 'Invalid lodging' }, { status: 404 });
  }

  await prisma.lodging.delete({
    where: { id: lodging.id },
  });

  return NextResponse.json({});
}
