import { useState } from 'react';
import { Select } from '@mantine/core';
import boundingBoxes from '@/app/data/bounding-boxes.json';
import useCitiesLookup from '@/app/hooks/useCitiesLookup';
import useTripManager from '@/app/hooks/useTripManager';

const CountrySelector = () => {
  const [searchValue, setSearchValue] = useState('');
  const { trip, updateTrip, loading, error } = useTripManager();
  const { lookupCities } = useCitiesLookup();
  const countries = Object.keys(boundingBoxes);

  const onCountrySelect = async (country: string | null) => {
    if (!country) return;
    updateTrip(trip.id, { country: country! });

    // Start gathering all city options now to be used in future steps
    lookupCities(country);
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
