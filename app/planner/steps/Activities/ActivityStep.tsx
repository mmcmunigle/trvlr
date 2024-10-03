import { useState } from 'react';
import { IconExternalLink } from '@tabler/icons-react';
import { RiMapPinAddFill } from 'react-icons/ri';
import {
  Autocomplete,
  Box,
  Button,
  Center,
  Group,
  Menu,
  Select,
  Stack,
  Title,
} from '@mantine/core';
import useCityOptionStore from '@/app/state-management/city-options-store';
import useDestinationStore from '@/app/state-management/destination-store';

const ActivityStep = () => {
  const [autoActivity, setAutoActivity] = useState('');
  const destinations = useDestinationStore((store) => store.destinations);
  const [searchValue, setSearchValue] = useState('');

  return (
    <Stack justify="space-between" gap="xl" w="100%">
      <Center>
        <Select
          w="300px"
          searchable
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          defaultValue={destinations[0].name}
          data={destinations.map((dest) => dest.name!)}
        />
      </Center>

      <Box ta="center">
        <Group align="center" justify="center">
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
        </Group>
      </Box>
      <Box w="100%">{/* <CityOptionCarousel /> */}</Box>
    </Stack>
  );
};

export default ActivityStep;
