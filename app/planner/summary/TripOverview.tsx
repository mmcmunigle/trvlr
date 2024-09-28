import { Accordion, Box, Flex, Group, Stack, Text } from '@mantine/core';

const TripOverview = () => {
  const data = [
    {
      destination: 'Barcelona',
      dateString: 'Oct 11th - 13th',
    },
    {
      destination: 'Stiges',
      dateString: 'Oct 14th - 16th',
    },
    {
      destination: 'Mallorca',
      dateString: 'Oct 17th - 19th',
    },
    {
      destination: 'Madrid',
      dateString: 'Oct 20th - 21th',
    },
  ];
  return (
    <Box mih="50%">
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Adventures in Spain</Text>
      </Group>

      {/* <Tabs defaultValue="results">
        <Tabs.List my="md">
          <Tabs.Tab value="results">Itinerary</Tabs.Tab>
          <Tabs.Tab value="details">Details</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="results"> */}
      <Stack gap="xs">
        {data.map((dest) => (
          <Accordion variant="default" key={dest.destination}>
            <Accordion.Item value={dest.destination}>
              <Accordion.Control>
                <Flex align="center" gap="sm">
                  <Text fw={700}>{dest.destination}</Text>
                  <Text size="sm">{dest.dateString}</Text>
                </Flex>
              </Accordion.Control>
              <Accordion.Panel>Trip Details</Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        ))}
      </Stack>
      {/* </Tabs.Panel> */}

      {/* <Tabs.Panel value="details">Details</Tabs.Panel> */}
      {/* </Tabs> */}
    </Box>
  );
};

export default TripOverview;
