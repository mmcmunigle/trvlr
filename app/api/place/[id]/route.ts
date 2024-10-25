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

  const { title, type, description } = body;

  const place = await prisma.place.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!place) {
    return NextResponse.json({ error: 'Invalid Activity' }, { status: 404 });
  }

  const updatedIssue = await prisma.place.update({
    where: { id: place.id },
    data: {
      name: title,
      type: type,
      description: description,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  //   const session = await auth();
  //   if (!session) {
  //     return NextResponse.json({}, { status: 401 });
  //   }

  const place = await prisma.place.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!place) {
    return NextResponse.json({ error: 'Invalid Activity' }, { status: 404 });
  }

  await prisma.place.delete({
    where: { id: place.id },
  });

  return NextResponse.json({});
}
