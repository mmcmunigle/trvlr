import { useRouter } from 'next/navigation';
import { EventInput, formatDate } from '@fullcalendar/core';
import { Accordion, Box, DefaultMantineColor, Stack, Text, Title } from '@mantine/core';
import { TripWithDestinations } from '@/app/types/TripWithDestinations';
import EventList from './EventList';
import classes from './SideBar.module.css';

interface Props {
  trip: TripWithDestinations;
}

export const Sidebar = ({ trip }: Props) => {
  const router = useRouter();
  function renderSidebarEvent(event: EventInput) {
    return (
      <li key={event.id}>
        {/* <button onClick={() => eventStore.deleteEvent(event.id!)}>x</button> */}
        <b>
          {formatDate(event.start!, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </b>
        <i>{event.title}</i>
      </li>
    );
  }

  return (
    <Box className={classes.sidebar}>
      <Box px="2em" py="1rem">
        <Title order={2}>{trip.country}</Title>
        <Text size="sm">
          {trip.startDate?.toDateString()} - {trip.endDate?.toDateString()}
        </Text>
      </Box>
      <Box px="2em" py="1rem">
        <Title order={5}>Destinations</Title>
        <Stack>
          <Accordion variant="standard">
            {trip.destinations.map((dest) => (
              <Accordion.Item value={dest.name} key={dest.id}>
                <Accordion.Control
                  style={{ borderRadius: '10px' }}
                  bg={dest.color as DefaultMantineColor}
                  c="white"
                  mt="xs"
                >
                  {dest.name}
                </Accordion.Control>
                <Accordion.Panel>
                  <EventList destination={dest} />
                </Accordion.Panel>
              </Accordion.Item>
              // <Card key={dest.name} p="xs" bg={dest.color!} c="white">

              // </Card>
            ))}
          </Accordion>
        </Stack>

        {/* <h2>All Events ({eventStore.events.length})</h2>
        <ul>{eventStore.events.map(renderSidebarEvent)}</ul> */}
      </Box>
    </Box>
  );
};
