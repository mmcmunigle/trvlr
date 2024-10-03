import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';

interface Props {
  params: { id: string };
}

export async function POST(request: NextRequest, { params }: Props) {
  //   const session = await auth();
  //   if (!session) {
  //     return NextResponse.json({}, { status: 401 });
  //   }

  const body = await request.json();
  //   const validation = patchIssueSchema.safeParse(body);

  //   if (!validation.success) {
  //     return NextResponse.json(validation.error.format(), { status: 400 });
  //   }

  const { link, source } = body;

  const city = await prisma.city.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!city) {
    return NextResponse.json({ error: 'Invalid City' }, { status: 404 });
  }

  const photo = await prisma.photoLink.create({
    data: {
      cityId: city.id,
      link: link,
      source: source,
    },
  });

  return NextResponse.json(photo);
}
