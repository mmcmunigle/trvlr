import { useState } from 'react';
import { RiMapPinAddFill } from 'react-icons/ri';
import { Autocomplete, Box, Button, Group, Space, Stack, Title } from '@mantine/core';
import useCityOptionStore from '@/app/state-management/city-options-store';
import useDestinationStore from '@/app/state-management/destination-store';
import CityOptionCarousel from './CityOptionCarousel';

const DestinationsStep = () => {
  const [autoDestination, setAutoDestination] = useState('');
  const cityOptions = useCityOptionStore((store) => store.cities);
  const addDestination = useDestinationStore((store) => store.addDestination);

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
            onClick={() => addDestination({ name: autoDestination })}
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
