import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';

interface Props {
  params: { id: string };
}
export async function GET(request: NextRequest, { params }: Props) {
  //   const session = await auth();
  //   if (!session) {
  //     return NextResponse.json({}, { status: 401 });
  //   }

  // const body = await request.json();
  //   const validation = patchIssueSchema.safeParse(body);

  //   if (!validation.success) {
  //     return NextResponse.json(validation.error.format(), { status: 400 });
  //   }

  const city = await prisma.city.findUnique({
    where: { name: params.id },
    include: { photos: true },
  });

  console.log(city);

  if (!city) {
    return NextResponse.json({ error: 'Invalid City' }, { status: 404 });
  }

  return NextResponse.json(city);
}
