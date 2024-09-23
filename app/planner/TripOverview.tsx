import React from 'react';
import {
  Accordion,
  Badge,
  Box,
  Burger,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Stack,
  Tabs,
  Text,
} from '@mantine/core';
import InteractiveMap from './Map/InteractiveMap';

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
    <Card shadow="sm" radius="md" h="calc(100vh - 100px)">
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={120}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Adventures in Spain</Text>
        <Badge color="orange">In Progress</Badge>
      </Group>

      <Tabs defaultValue="results">
        <Tabs.List my="md">
          <Tabs.Tab value="results">Itinerary</Tabs.Tab>
          <Tabs.Tab value="table">Map</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="results">
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
        </Tabs.Panel>

        <Tabs.Panel value="table">
          <InteractiveMap />
        </Tabs.Panel>
      </Tabs>

      {/* <Stack gap="xs">
        <Card radius="md" shadow="sm" p="xs" bg="gray.1">
          <Group justify="space-between">
            Barcelona
            <Group>
              <Text size="sm">Oct 11 - 13th</Text>
              <Burger size="sm" />
            </Group>
          </Group>
        </Card>

        <Card radius="md" shadow="sm" p="xs" bg="gray.1">
          <Group justify="space-between">
            Stiges{' '}
            <Group>
              <Text size="sm">Oct 11 - 13th</Text>
              <Burger size="sm" />
            </Group>
          </Group>
        </Card>

        <Card radius="md" shadow="sm" p="xs" bg="gray.1">
          <Group justify="space-between">
            Mallorca{' '}
            <Group>
              <Text size="sm">Oct 11 - 13th</Text>
              <Burger size="sm" />
            </Group>
          </Group>
        </Card>

        <Card radius="md" shadow="sm" p="xs" bg="gray.1">
          <Group justify="space-between">
            Mallorca{' '}
            <Group>
              <Text size="sm">Oct 11 - 13th</Text>
              <Burger size="sm" />
            </Group>
          </Group>
        </Card>
      </Stack> */}
    </Card>
  );
};

export default TripOverview;
