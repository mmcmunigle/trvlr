import { Stack } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import useTripStore from '@/app/state-management/trip-store';
import CountrySelector from './CountrySelector';

const TripDetailsStep = () => {
  const setDates = useTripStore((store) => store.setDates);
  const startDate = useTripStore((store) => store.startDate);
  const endDate = useTripStore((store) => store.endDate);

  return (
    <Stack w="400px" gap="xl">
      <CountrySelector />
      <DatePickerInput
        radius="lg"
        label="Travel Dates"
        placeholder="Select Travel Dates"
        type="range"
        value={startDate && endDate ? [new Date(startDate), new Date(endDate)] : undefined}
        onChange={setDates}
        w="100%"
        size="md"
      />
    </Stack>
  );
};

export default TripDetailsStep;
