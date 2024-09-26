import React from 'react';
import { notFound } from 'next/navigation';
import { Activity } from '@prisma/client';
import { prisma } from '@/prisma/prisma';
import Calendar from './Calendar';

interface Props {
  params: { id: string };
}

const CalendarPage = async ({ params }: Props) => {
  const trip = await prisma.trip.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      destinations: {
        orderBy: [{ startDate: 'asc' }],
        include: { activities: true, meals: true, lodgings: true },
      },
    },
  });

  if (!trip) return notFound();

  let activities: Activity[] = [];
  trip.destinations.forEach(
    (destination) => (activities = activities.concat(destination.activities))
  );

  return <Calendar trip={trip} />;
};

export default CalendarPage;
