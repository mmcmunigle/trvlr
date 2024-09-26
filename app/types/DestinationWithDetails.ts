import { Prisma } from '@prisma/client';

export type DestinationWithDetails = Prisma.DestinationGetPayload<{
  include: { activities: true; meals: true; lodgings: true };
}>;
