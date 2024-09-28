import React, { useState } from 'react';
import { Box, InputLabel, MultiSelect, Stack } from '@mantine/core';
import { DateInput, DatePicker, DatePickerInput } from '@mantine/dates';
import boundingBoxes from '@/app/data/bounding-boxes.json';
import useTripStore from '@/app/state-management/trip-store';
import { CountryName } from '@/app/types/CountryName';

const TripDetailsStep = () => {
  const [dates, setDates] = useState<[Date | null, Date | null]>([null, null]);
  const [selection, setSelection] = useState<CountryName[] | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const setCountry = useTripStore((store) => store.setCountry);

  const countries = Object.keys(boundingBoxes);

  const onChange = (value: string[]) => {
    setSelection(value as CountryName[]);
    if (value?.length) {
      setCountry(value[0] as CountryName);
    }
  };

  return (
    <Stack w="400px" gap="xl">
      <MultiSelect
        onChange={onChange}
        size="lg"
        radius="lg"
        label="Where are you traveling?"
        placeholder={selection?.length ? '' : 'Select Countries'}
        searchable
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        data={countries}
        nothingFoundMessage="No Matching Country..."
        checkIconPosition="right"
      />
      <DatePickerInput
        radius="lg"
        label="Travel Dates"
        placeholder="Select Travel Dates"
        type="range"
        value={dates}
        onChange={setDates}
        w="100%"
        size="lg"
      />
    </Stack>
  );
};

export default TripDetailsStep;
