'use client';

import { useState } from 'react';
import { RiMapPinAddFill } from 'react-icons/ri';
import { Autocomplete, Box, Button, Group, Stack, Title } from '@mantine/core';
import useDestinationManager from '@/app/hooks/useDestinationManager';
import useCityOptionStore from '@/app/state-management/city-options-store';
import useTripStore from '@/app/state-management/trip-store';
import CityOptionCarousel from './CityOptionCarousel';

const DestinationsStep = () => {
  const { id: tripId } = useTripStore((store) => store.trip);
  const [autoDestination, setAutoDestination] = useState('');
  const cityOptions = useCityOptionStore((store) => store.cities);
  const { handleAddDestination } = useDestinationManager();

  return (
    <Stack justify="space-between" gap="xl" w="100%">
      <Box ta="center">
        <Group align="center" justify="center">
          <Title order={4}>Have Existing Plans? </Title>

          <Autocomplete
            placeholder="Choose City"
            limit={8}
            data={cityOptions}
            onChange={setAutoDestination}
          />
          <Button
            variant="light"
            rightSection={<RiMapPinAddFill size="19px" />}
            onClick={() => handleAddDestination({ tripId, name: autoDestination })}
          >
            Add to Itinerary
          </Button>
        </Group>
      </Box>
      <Box w="100%">
        <CityOptionCarousel />
      </Box>
    </Stack>
  );
};

export default DestinationsStep;
