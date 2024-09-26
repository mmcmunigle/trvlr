import { Prisma } from '@prisma/client';

export type TripWithDestinations = Prisma.TripGetPayload<{
  include: { destinations: { include: { activities: true; meals: true; lodgings: true } } };
}>;
