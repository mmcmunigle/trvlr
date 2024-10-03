import { useEffect } from 'react';
import { Stack } from '@mantine/core';
import { DatePickerInput, DateValue } from '@mantine/dates';
import useTripStore from '@/app/state-management/trip-store';
import CountrySelector from './CountrySelector';

const TripDetailsStep = () => {
  const setDates = useTripStore((store) => store.setDates);
  const dates = useTripStore((store) => store.dates);

  useEffect(() => {
    const tripDates = localStorage.getItem('trip_dates');
    if (tripDates) {
      const dates = JSON.parse(tripDates);
      setDates([new Date(dates[0]), new Date(dates[1])]);
    }
  }, []);

  const onDatesChanged = (dates: [DateValue, DateValue]) => {
    setDates(dates);
    localStorage.setItem('trip_dates', JSON.stringify(dates));
  };

  return (
    <Stack w="400px" gap="xl">
      <CountrySelector />
      <DatePickerInput
        radius="lg"
        label="Travel Dates"
        placeholder="Select Travel Dates"
        type="range"
        value={dates ? dates : undefined}
        onChange={onDatesChanged}
        w="100%"
        size="md"
      />
    </Stack>
  );
};

export default TripDetailsStep;
