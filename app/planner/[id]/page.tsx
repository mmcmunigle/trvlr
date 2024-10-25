import { cache } from 'react';
import { notFound } from 'next/navigation';
import { Stack } from '@mantine/core';
import { TripWithDestinations } from '@/app/types/TripWithDestinations';
import { prisma } from '@/prisma/prisma';
import PlanStepper from './PlanStepper';
import TripLoader from './TripLoader';
import TripPlannerContainer from './TripPlannerContainer';

interface Props {
  params: { id: string };
}

const fetchTrip = cache((tripId: number) => {
  return prisma.trip.findUnique({
    where: { id: tripId },
    include: { destinations: { include: { activities: true, meals: true, lodgings: true } } },
  });
});

const TripPlannerPage = async ({ params }: Props) => {
  let trip: TripWithDestinations | null = null;
  if (params.id !== 'new') {
    trip = await fetchTrip(parseInt(params.id));
    if (!trip) notFound();
  }

  return (
    <TripLoader trip={trip}>
      <Stack h="100vh" gap={0}>
        <PlanStepper />
        <TripPlannerContainer />
      </Stack>
    </TripLoader>
  );
};

export default TripPlannerPage;
