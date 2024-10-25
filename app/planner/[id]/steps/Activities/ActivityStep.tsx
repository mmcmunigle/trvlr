'use client';

import { useState } from 'react';
import { Center, Select, Stack } from '@mantine/core';
import useDestinationStore from '@/app/state-management/destination-store';
import ActivitySelectionArea from './ActivitySelectionArea';

const ActivityStep = () => {
  const destinations = useDestinationStore((store) => store.destinations);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCity, setSelectedCity] = useState(destinations[0]?.name);

  return (
    <Stack justify="space-between" gap="sm" w="100%" h="100%">
      <Center>
        <Select
          size="md"
          radius="md"
          w="200px"
          searchable
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          value={selectedCity}
          onChange={(event) => setSelectedCity(event!)}
          data={destinations.map((dest) => dest.name!)}
        />
      </Center>

      <ActivitySelectionArea destination={destinations.find((d) => d.name === selectedCity)!} />
      {/* <Title order={4}>Have Existing Plans? </Title> */}

      {/* <Autocomplete
            placeholder="Choose City"
            limit={8}
            data={cityOptions}
            onChange={setAutoActivity}
          /> */}
      {/* <Button
            variant="light"
            rightSection={<RiMapPinAddFill size="19px" />}
            onClick={() => addDestination({ name: autoActivity })}
          >
            Add to Itinerary
          </Button> */}
    </Stack>
  );
};

export default ActivityStep;
