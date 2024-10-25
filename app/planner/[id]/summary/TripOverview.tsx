'use client';

import { MdMenu } from 'react-icons/md';
import { Accordion, ActionIcon, Box, Button, Flex, Group, Stack, Tabs, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import useDestinationStore from '@/app/state-management/destination-store';
import useTripStore from '@/app/state-management/trip-store';
import ActivityList from './ActivityList';

const TripOverview = () => {
  const { country } = useTripStore((store) => store.trip);
  const destinations = useDestinationStore((store) => store.destinations);

  return (
    <Box mih="50%">
      <Tabs defaultValue="itinerary">
        <Tabs.List my="md">
          <Tabs.Tab value="itinerary">Itinerary</Tabs.Tab>
          <Tabs.Tab value="details">Details</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="itinerary">
          <Stack gap="xs">
            {!destinations.length && <Text>Add Destinations to Build out Itinerary</Text>}
            {destinations.map((dest) => (
              <Accordion variant="default" key={dest.name}>
                <Accordion.Item value={dest.name!}>
                  <Accordion.Control>
                    <Flex align="center" gap="xl" justify="space-between">
                      <Text fw={700} w="150px">
                        {dest.name}
                      </Text>
                    </Flex>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Stack>
                      <Group justify="space-between">
                        <DatePickerInput type="range" w="300px" placeholder="Select Dates" />
                        <ActionIcon variant="light" mr="lg">
                          <MdMenu />
                        </ActionIcon>{' '}
                      </Group>
                      <ActivityList destinationId={dest.id} />
                    </Stack>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            ))}
          </Stack>
          <Button mt="xl">SAVE</Button>
        </Tabs.Panel>

        {/* <Tabs.Panel value="details">Details</Tabs.Panel> */}
      </Tabs>
    </Box>
  );
};

export default TripOverview;
