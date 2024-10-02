import { MdMenu } from 'react-icons/md';
import { Accordion, ActionIcon, Box, Flex, Group, Stack, Tabs, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import useDestinationStore from '@/app/state-management/destination-store';
import useTripStore from '@/app/state-management/trip-store';

const TripOverview = () => {
  const country = useTripStore((store) => store.country);
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
                      <DatePickerInput type="range" w="300px" placeholder="Select Dates" />
                      <ActionIcon variant="light" mr="lg">
                        <MdMenu />
                      </ActionIcon>
                    </Flex>
                  </Accordion.Control>
                  <Accordion.Panel>Trip Details</Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            ))}
          </Stack>
        </Tabs.Panel>

        {/* <Tabs.Panel value="details">Details</Tabs.Panel> */}
      </Tabs>
    </Box>
  );
};

export default TripOverview;
