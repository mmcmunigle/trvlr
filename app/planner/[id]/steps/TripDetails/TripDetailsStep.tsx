'use client';

import { Stack } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import useTripUpdater from '@/app/hooks/useTripUpdater';
import CountrySelector from './CountrySelector';

const TripDetailsStep = () => {
  const { trip, updateTrip, loading, error } = useTripUpdater();

  return (
    <Stack w="400px" gap="xl">
      <CountrySelector />
      <DatePickerInput
        radius="lg"
        label="Travel Dates"
        placeholder="Select Travel Dates"
        type="range"
        value={
          trip.startDate && trip.endDate
            ? [new Date(trip.startDate), new Date(trip.endDate)]
            : undefined
        }
        onChange={(dates) => updateTrip({ startDate: dates[0], endDate: dates[1] })}
        w="100%"
        size="md"
      />
    </Stack>
  );
};

export default TripDetailsStep;
