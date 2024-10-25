import { useEffect, useState } from 'react';
import { Trip } from '@prisma/client';
import axios from 'axios';
import { Select } from '@mantine/core';
import boundingBoxes from '@/app/data/bounding-boxes.json';
import useTripUpdater from '@/app/hooks/useTripUpdater';
import useCityOptionStore from '@/app/state-management/city-options-store';
import useTripStore from '@/app/state-management/trip-store';
import { CountryName } from '@/app/types/CountryName';

const CountrySelector = () => {
  const [searchValue, setSearchValue] = useState('');
  const setCityOptions = useCityOptionStore((store) => store.setCities);
  const { trip, updateTrip, loading, error } = useTripUpdater();
  const countries = Object.keys(boundingBoxes);

  const onCountrySelect = async (country: string | null) => {
    if (!country) return;
    updateTrip({ country: country! });

    // Start gathering all city options now to be used in future steps
    if (country) {
      setCityOptions([]);
      await axios
        .post('https://countriesnow.space/api/v0.1/countries/cities', {
          country: country.toLowerCase(),
        })
        .then((resp) => {
          setCityOptions(resp.data.data);
        });
    }
  };

  return (
    <Select
      onChange={onCountrySelect}
      value={trip.country}
      size="md"
      radius="lg"
      label="Where are you traveling?"
      placeholder={!!trip.country ? '' : 'Select Countries'}
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
