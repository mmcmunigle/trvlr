import { Prisma } from '@prisma/client';

export type PlaceWithPhotos = Prisma.PlaceGetPayload<{
  include: { photos: true };
}>;
