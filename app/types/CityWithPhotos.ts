import { Prisma } from '@prisma/client';

export type CityWithPhotos = Prisma.CityGetPayload<{
  include: { photos: true };
}>;
