import React, { useState } from 'react';
import axios from 'axios';
import { Box, InputLabel, MultiSelect, Stack } from '@mantine/core';
import { DateInput, DatePicker, DatePickerInput } from '@mantine/dates';
import boundingBoxes from '@/app/data/bounding-boxes.json';
import useCityOptionStore from '@/app/state-management/city-options-store';
import useTripStore from '@/app/state-management/trip-store';
import { CountryName } from '@/app/types/CountryName';

const TripDetailsStep = () => {
  const [dates, setDates] = useState<[Date | null, Date | null]>([null, null]);
  const [selection, setSelection] = useState<CountryName[] | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const setCountry = useTripStore((store) => store.setCountry);
  const setCityOptions = useCityOptionStore((store) => store.setCities);

  const countries = Object.keys(boundingBoxes);

  const onChange = (value: string[]) => {
    const countries = value as CountryName[];
    setSelection(countries);
    if (value?.length) {
      setCountry(countries[0]);

      const getAllCities = async () => {
        setCityOptions([]);
        await axios
          .post('https://countriesnow.space/api/v0.1/countries/cities', {
            country: countries[0].toLowerCase(),
          })
          .then((resp) => {
            setCityOptions(resp.data.data);
          });
      };
      getAllCities();
    }
  };

  return (
    <Stack w="400px" gap="xl">
      <MultiSelect
        onChange={onChange}
        size="md"
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
        size="md"
      />
    </Stack>
  );
};

export default TripDetailsStep;
