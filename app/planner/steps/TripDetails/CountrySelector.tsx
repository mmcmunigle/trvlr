import { useEffect, useState } from 'react';
import axios from 'axios';
import { Select } from '@mantine/core';
import boundingBoxes from '@/app/data/bounding-boxes.json';
import useCityOptionStore from '@/app/state-management/city-options-store';
import useTripStore from '@/app/state-management/trip-store';
import { CountryName } from '@/app/types/CountryName';

const CountrySelector = () => {
  const [searchValue, setSearchValue] = useState('');
  const setCountry = useTripStore((store) => store.setCountry);
  const country = useTripStore((store) => store.country);
  const setCityOptions = useCityOptionStore((store) => store.setCities);

  const countries = Object.keys(boundingBoxes);

  const onCountrySelect = async (value: string | null) => {
    setCountry(value as CountryName | null);

    // Start gathering all city options now to be used in future steps
    if (value) {
      setCityOptions([]);
      await axios
        .post('https://countriesnow.space/api/v0.1/countries/cities', {
          country: value.toLowerCase(),
        })
        .then((resp) => {
          setCityOptions(resp.data.data);
        });
    }
  };

  return (
    <Select
      onChange={onCountrySelect}
      value={country}
      size="md"
      radius="lg"
      label="Where are you traveling?"
      placeholder={!!country ? '' : 'Select Countries'}
      searchable
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      data={countries}
      nothingFoundMessage="No Matching Country..."
      checkIconPosition="right"
    />
  );
};

export default CountrySelector;
