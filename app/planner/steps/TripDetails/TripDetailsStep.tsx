import { Stack } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import useTripStore from '@/app/state-management/trip-store';
import CountrySelector from './CountrySelector';

const TripDetailsStep = () => {
  const setDates = useTripStore((store) => store.setDates);
  const dates = useTripStore((store) => store.dates);

  return (
    <Stack w="400px" gap="xl">
      <CountrySelector />
      <DatePickerInput
        radius="lg"
        label="Travel Dates"
        placeholder="Select Travel Dates"
        type="range"
        value={dates ? dates : undefined}
        onChange={setDates}
        w="100%"
        size="md"
      />
    </Stack>
  );
};

export default TripDetailsStep;
